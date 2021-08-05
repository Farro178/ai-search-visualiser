import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactFlow, {
  addEdge,
  removeElements,
  isNode,
  MiniMap,
  Background,
  isEdge,
} from "react-flow-renderer";
import styled from "styled-components";
import dagre from "dagre"; // https://www.npmjs.com/package/dagre
import {
  Sidebar,
  addNodeOptions,
  addNodeOption,
  removeNodeOption,
  clearNodeOptions,
  resetAlgo,
} from "../Sidebar";
import { elementsPlaceholder } from "../../utils/ElementsPlaceholder";
import {
  defaultNodeStyle,
  visitedNodeStyle,
  todoNodeStyle,
  currentNodeStyle,
  goalNodeStyle,
} from "../../utils/nodeStyles";
import { defaultEdgeStyle } from "../../utils/edgeStyles";
import { Toolbar } from "../Toolbar";
import { Warning } from "../Warning";
import bfs from "../../utils/algorithms/bfs";
import iddfs from "../../utils/algorithms/iddfs";
import dfs from "../../utils/algorithms/dfs";
import astar from "../../utils/algorithms/astar";
import getGraph from "../../utils/getGraph";
import getGraphLengths from "../../utils/getGraphLengths";
import DistanceEdge from "../Edges/DistanceEdge";
import HeuristicNode from "../Nodes/HeuristicNode";
import combineAlgoObjects from "../../utils/combineAlgoObjects";
import alreadyHasParent from "../../utils/alreadyHasParent";
import treeWidth from "../../utils/treeWidth";

let starts = ["0"];
let goals = ["0"];
var currStep = 0;
let currAlgorithm = "none"; // can also be bfs, dfs, iddfs, astar
let currAlgorithm2 = "none"; // second algorithm - for comparison
let speedMultiplier = 1; // default playback speed
let algorithmObject = {}; // stores information at each step of visualisation
let algorithmObjectLength = Object.keys(algorithmObject).length;
let algorithmObject1 = {};
let algorithmObject2 = {};
var warningMsg = "";
var depthMsg = ""; // current max depth during iddfs
let interrupted = false; // stop playback
let playing = false; // automatic playback in process
let filename = "elements"; // default name for JSON file
let importedElements;
let addToImported;
let comparing = false; // comparison mode off
let sidebarOpen = true; // sidebar open by default
let originalElementsLength = 0; // used to remove duplicated nodes and edges

const _ = require("lodash"); // for comparing objects

// Using styled components to write CSS within javascript - https://styled-components.com/
const CanvasComponentDiv = styled.div`
  height: 100%;
  display: flex;
  > div {
    flex-direction: column;
  }
`;

const CanvasDiv = styled.div`
  height: 100%;
  width: 100%;
  flex: 1 1 auto;
  position: relative;
`;

const nodeTypes = {
  heuristic: HeuristicNode,
};

const edgeTypes = {
  distanceEdge: DistanceEdge,
};

const setStart = (startNode) => {
  starts = [startNode];
  if (comparing) {
    // get goal on duplicate tree
    const secondStart = startNode + "c"; // 1 --> 1c for comparison
    if (!(secondStart in starts)) {
      // no duplicates
      starts.push(secondStart);
    }
  }
  interrupted = true;
  playing = false;
};

const setGoal = (goalNode) => {
  goals = [goalNode];
  if (comparing) {
    const secondGoal = goalNode + "c";
    if (!(secondGoal in goals)) {
      goals.push(secondGoal);
    }
  }
  interrupted = true;
  playing = false;
};

const setFilename = (filenameInput) => {
  filename = filenameInput;
};

function isPlaying() {
  return playing;
}

function isComparing() {
  return comparing;
}

function isSidebarOpen() {
  return sidebarOpen;
}

// Automatic layout of nodes example using dagre - https://reactflow.dev/examples/layouting/
const graph = new dagre.graphlib.Graph();
graph.setDefaultEdgeLabel(() => ({}));

const layoutElements = (elements) => {
  graph.setGraph({ rankdir: "TB" }); // top-bottom

  elements.forEach((element) => {
    if (isNode(element)) {
      graph.setNode(element.id, { width: 70, height: 70 });
    } else {
      graph.setEdge(element.source, element.target);
    }
  });

  dagre.layout(graph);

  return elements.map((element) => {
    if (isNode(element)) {
      const node = graph.node(element.id);

      element.targetPosition = "top";
      element.sourcePosition = "bottom";

      // trigger small change
      element.position = {
        x: node.x + Math.random() / 1000,
        y: node.y,
      };
    }
    return element;
  });
};

const Canvas = () => {
  const canvasComponent = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [valueHidden, setValueHidden] = useState(true);

  let fileReader;

  function totalNodes() {
    let total = 0;
    elements.forEach((element) => {
      if (isNode(element)) {
        total++;
      }
    });
    return total;
  }

  function reset() {
    resetGraph(elements);
    resetAlgo();
    currStep = 0;
    currAlgorithm = "none";
    interrupted = true;
    playing = false; // stop playback
    algorithmObject = {};
    algorithmObjectLength = Object.keys(algorithmObject).length;
    setValueHidden(true);
  }

  // Updates node types when algorithm is changed
  useEffect(() => {
    setElements((els) =>
      els.map((e) => {
        e.data = {
          ...e.data,
          hidden: valueHidden,
        };

        return e;
      })
    );
  }, [valueHidden, setValueHidden]);

  useEffect(() => {
    // automatically fit to view on load
    if (reactFlowInstance && elements.length) {
      reactFlowInstance.fitView({ padding: 0.45 });
    }
  }, [reactFlowInstance]);

  const onChange = (event, id) => {
    currStep = 0;
    interrupted = true;
    playing = false;
    algorithmObject = {};
    setElements((els) => {
      const nextElements = els.map((e) => {
        if (e.id !== id) {
          return e;
        }

        let value = event.target.value;

        if (value < 0) {
          value = 0;
        }

        return {
          ...e,
          data: {
            ...e.data,
            value,
          },
        };
      });
      return nextElements;
    });
  };

  useEffect(() => {
    reset();

    importedElements = initializeElements(elementsPlaceholder);

    setElements(importedElements);
  }, []);

  const onConnect = (params) => {
    if (!comparing) {
      if (alreadyHasParent(params["target"], elements)) {
        giveWarning(
          "This node already has a parent. Please delete the other edge before creating a new one."
        );
        return;
      }

      reset();

      setElements((elements) =>
        addEdge(
          {
            ...params,
            type: "distanceEdge",
            data: {
              value: "0",
              hidden: valueHidden,
              onChange,
            },
            animated: false,
            style: defaultEdgeStyle,
          },
          elements
        )
      );
    } else {
      giveWarning("You cannot create edges in comparison mode.");
    }
  };

  function triggerRender() {
    setElements((elements) =>
      elements.map((element) => {
        if (element.id === "1") {
          element.data = {
            ...element.data,
          };
          element.position = {
            x: element.position.x + 0.000000000001,
            y: element.position.y,
          };
        }
        return element;
      })
    );
  }

  const onElementsRemove = (elementsToRemove) => {
    if (!comparing) {
      setElements((elements) => removeElements(elementsToRemove, elements));
      removeNodeOption(elementsToRemove);
      reset();
    } else {
      giveWarning("You cannot remove nodes or edges in comparison mode.");
    }
  };

  function clearCanvas() {
    setElements([]);
    clearNodeOptions();
    reset();
  }

  const onLoad = (reactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);
    addNodeOptions(elements); // add any existing nodes to goal/start options
    triggerRender();
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    if (!comparing) {
      const newID = uniqueID();

      if (newID === "") {
        // too many nodes on the canvas for unique id
        return;
      }

      event.preventDefault();

      const reactFlowBounds = canvasComponent.current.getBoundingClientRect();

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: newID,
        type: "heuristic",
        position,
        data: {
          label: `${newID}`,
          value: "0",
          hidden: valueHidden,
          onChange,
        },
        style: defaultNodeStyle,
      };

      setElements((elements) => elements.concat(newNode));

      addNodeOption(newNode);

      reset();
    }
  };

  const onLayout = useCallback(
    (direction) => {
      const layoutedElements = layoutElements(elements, direction);
      setElements(layoutedElements);
    },
    [elements]
  );

  function startGoalChosen() {
    let warning = "";

    if (starts[0] === "0") {
      warning = "You must select a start node!";
    } else if (goals[0] === "0") {
      warning = "You must select a goal node!";
    }

    if (warning !== "") {
      giveWarning(warning);
      return false;
    } else {
      return true;
    }
  }

  function setAlgorithm(settingAlgorithm) {
    resetGraph(elements);
    currStep = 0;

    if (algorithmObjectLength) {
      // choosing new algorithm will cause an interruption
      interrupted = true;
      playing = false;
    }

    currAlgorithm = settingAlgorithm;

    if (!startGoalChosen()) {
      algorithmObject = {};
      algorithmObjectLength = Object.keys(algorithmObject).length;
      return;
    }

    algorithmObject = getAlgorithm(currAlgorithm, 0);
    algorithmObjectLength = Object.keys(algorithmObject).length;
    algorithmObject1 = algorithmObject;

    if (isComparing()) {
      if (currAlgorithm2 !== "none") {
        setSecondAlgorithm(currAlgorithm2);
      } else {
        giveWarning("Please select the second algorithm.");
      }
    }

    interrupted = false;

    depthMsg = "";
  }

  function getAlgorithm(algorithm, choice) {
    // choice can be 0 or 1 for first or second algo choice (for comparison)
    let newAlgorithmObject = {};

    if (elements.length === 0) {
      giveWarning("Please place nodes on the canvas.");
      return newAlgorithmObject;
    }

    let goal = goals[choice];
    let start = starts[choice];

    if (!startGoalChosen()) {
      return {};
    }

    setValueHidden(true);
    switch (algorithm) {
      case "dfs":
        newAlgorithmObject = dfs(getGraph(elements), start, goal);
        break;
      case "bfs":
        newAlgorithmObject = bfs(getGraph(elements), start, goal);
        break;
      case "iddfs":
        let bfsObject = bfs(getGraph(elements), start, goal);
        if (
          bfsObject[Object.keys(bfsObject).length - 1]["currentNode"] === goal
        ) {
          // is this goal reachable? if not, the algorithm gets stuck in an infinite loop
          newAlgorithmObject = iddfs(getGraph(elements), start, goal);
        } else {
          newAlgorithmObject = {};
          giveWarning(
            "Due to the nature of Iterative Deepening Depth-First Search, you must select a reachable goal."
          );
        }
        break;
      case "astar":
        setValueHidden(false);
        newAlgorithmObject = astar(
          elements,
          getGraphLengths(elements),
          start,
          goal
        );
        break;
      default:
        newAlgorithmObject = {};
        break;
    }
    return newAlgorithmObject;
  }

  function setSecondAlgorithm(settingAlgorithm) {
    resetGraph(elements);
    currStep = 0;
    interrupted = true;
    playing = false;

    if (currAlgorithm === "none") {
      giveWarning("Please select the first algorithm.");
      return;
    }

    currAlgorithm2 = settingAlgorithm;

    if (currAlgorithm2 === "none") {
      giveWarning("Please select the second algorithm.");
      algorithmObject = {};
      algorithmObjectLength = Object.keys(algorithmObject).length;
    }

    const secondStart = starts[0] + "c";
    starts.push(secondStart);
    const secondGoal = goals[0] + "c";
    goals.push(secondGoal);

    algorithmObject2 = getAlgorithm(currAlgorithm2, 1);

    if (Object.keys(algorithmObject2).length) {
      // need to use algo obj 1 instead of regular algo obj as algo obj may already be two combined objects
      algorithmObject = combineAlgoObjects(algorithmObject1, algorithmObject2);
      algorithmObjectLength = Object.keys(algorithmObject).length;
      interrupted = false;
    }
  }

  function validStep() {
    if (
      goals[0] === "0" || // goal not selected
      starts[0] === "0" || // start not selected
      currAlgorithm === "none" || // no algorithm selected
      interrupted // playback interrupted
    ) {
      interrupted = true;
      playing = false; // stop playback
    }

    return !interrupted; // interrupted --> invalid step
  }

  function uniqueID() {
    if (totalNodes() >= 100) {
      giveWarning("Sorry, you can only create 100 new nodes");
      return "";
    }

    const takenIDs = [];
    for (let i = 0; i < elements.length; i++) {
      // list of all used IDs
      const element = elements[i];
      takenIDs.push(element["id"]);
    }

    let id;
    let found = false;
    while (!found) {
      // create random ID until a unique one is found
      id = (Math.floor(Math.random() * 100) + 1).toString();
      if (!takenIDs.includes(id)) {
        found = true; // unique id found
      } else {
        id = "";
      }
    }

    return id;
  }

  function step(value) {
    // value = 1 to step forward, value = -1 to step backward
    if (!validStep()) {
      giveWarning("The graph has been altered, click refresh button");
      return;
    }

    if (currStep + value in algorithmObject) {
      currStep = currStep + value;
    }

    if (currStep in algorithmObject) {
      updateGraph(algorithmObject, currStep);
    }
  }

  function updateGraph(algorithmObject, currStep) {
    if (currStep in algorithmObject) {
      const stepsArray = algorithmObject[currStep];
      const visited = stepsArray.visitedNodes.split(",");
      const current = stepsArray.currentNode.split(",");
      const todo = stepsArray.todoNodes.split(",");

      if (currAlgorithm === "iddfs") {
        depthMsg = `Max depth: ${stepsArray.maxDepth}`;
      }

      let x = 0;
      let lenElements = elements.length;
      while (x < lenElements) {
        let element = elements[x];

        if (
          !todo.includes(element["id"]) &&
          !visited.includes(element["id"]) &&
          !current.includes(element["id"])
        ) {
          // reset style
          element["style"] = defaultNodeStyle;
        }

        if (current.includes(element["id"]) && goals.includes(element["id"])) {
          element["style"] = goalNodeStyle;
        } else if (
          visited.includes(element["id"]) &&
          !current.includes(element["id"])
        ) {
          element["style"] = visitedNodeStyle;
        }
        x += 1;
      }

      triggerRender();

      x = 0;
      while (x < lenElements) {
        let element = elements[x];
        if (
          visited.includes(element["id"]) &&
          !current.includes(element["id"])
        ) {
          element["style"] = visitedNodeStyle;
        } else if (
          current.includes(element["id"]) &&
          !goals.includes(element["id"])
        ) {
          element["style"] = currentNodeStyle;
        } else if (todo.includes(element["id"])) {
          element["style"] = todoNodeStyle;
        }
        x += 1;
      }

      triggerRender();
    }
  }

  async function play() {
    if (_.isEmpty(algorithmObject)) {
      giveWarning(
        "Please select the start node, goal node and the algorithm(s)."
      );
      return;
    }

    if (!playing) {
      // ignore play press when already playing
      playing = true;

      if (currStep === algorithmObjectLength - 1) {
        currStep = 0;
      }

      let originalEls = elements; // used to check that the object has not changed, otherwise playback must stop
      while (
        currStep < algorithmObjectLength &&
        _.isEqual(originalEls, elements) &&
        playing
      ) {
        let speed = speedMultiplier;
        updateGraph(algorithmObject, currStep);

        if (currStep + 1 === algorithmObjectLength) {
          playing = false;
        } else {
          if (currStep !== 0) {
            // no delay at start or end of playback
            await new Promise((r) => setTimeout(r, 1000 / speed));
          }
          if (playing) {
            currStep++; // next step
          }
        }
      }
    }
    playing = false;
    triggerRender();
  }

  function pause() {
    playing = false;
    triggerRender();
  }

  async function giveWarning(value) {
    warningMsg = value;
    triggerRender();
    await new Promise((r) => setTimeout(r, 1500));
    warningMsg = "";
    triggerRender();
  }

  function skip(value) {
    if (!Object.keys(algorithmObject).length) {
      giveWarning("Please select the start node, goal node and the algorithm.");
      return;
    }

    // value = 1 to skip forward, value = -1 to skip backward
    if (value === 1) {
      currStep = Object.keys(algorithmObject).length - 1;
    } else {
      currStep = 0;
    }

    updateGraph(algorithmObject, currStep);
  }

  function resetGraph(elements) {
    // return all nodes to the default style
    let resetElements = [];

    let lenElements = elements.length;
    for (let i = 0; i < lenElements; i++) {
      const resetElement = elements[i];
      resetElements.push(resetElement);
      if (isNode(resetElement)) {
        resetElement["style"] = defaultNodeStyle;
      }
    }
    currStep = 0; // return to step 0 of visualisation

    triggerRender();
  }

  function setUpComparison() {
    reset();

    if (comparing) {
      // if already started
      let originalElements = [];

      for (let i = 0; i < originalElementsLength; i++) {
        const element = elements[i];
        originalElements[i] = element;
      }
      setElements(originalElements);

      comparing = false;
      reset();
      triggerRender();
      return;
    }
    comparing = true;
    triggerRender();

    originalElementsLength = elements.length;
    const gap = treeWidth(elements) * 1.5; // distance between original and duplicate graph

    const elementsLength = elements.length;
    for (let i = 0; i < elementsLength; i++) {
      const element = elements[i];

      if (isNode(element)) {
        // example: original node 1 becomes new node 1c
        const newID = element["id"] + "c";
        const newNode = {
          id: newID,
          type: "heuristic",
          position: {
            x: element["position"]["x"] + gap,
            y: element["position"]["y"],
          }, // y position remains the same, x is incremented by gap to shift to the right
          data: {
            label: element["data"]["label"], // display the same label as original node
            value: "0",
            hidden: valueHidden,
          },
          style: defaultNodeStyle,
        };
        setElements((elements) => elements.concat(newNode)); // add to elements
      } else if (isEdge(element)) {
        // example: original edge e1-2 becomes new edge e1c-2c
        const newSource = element["source"] + "c";
        const newTarget = element["target"] + "c";
        const newID = "e" + newSource + "-" + newTarget; // e.g e1c-2c - naming convention used by react flow
        const newEdge = {
          id: newID,
          source: newSource,
          target: newTarget,
          type: "straight",
          animated: false,
          style: defaultEdgeStyle,
        };
        setElements((elements) => addEdge(newEdge, elements)); // add to elements
      }
    }
  }

  function onSaveElements(savedElements, fileName) {
    let elementsToSave = [];
    if (!comparing) {
      elementsToSave = savedElements;
    } else {
      for (let i = 0; i < originalElementsLength; i++) {
        elementsToSave.push(savedElements[i]);
      }
    }

    let data =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(elementsToSave, null, 2));

    let savedData = document.createElement("a");
    savedData.setAttribute("href", data);
    savedData.setAttribute("download", fileName + ".json");
    document.body.appendChild(savedData); // required for firefox
    savedData.click();
    savedData.remove();
  }

  const handleDataSaved = (event) => {
    const data = fileReader.result;
    let warning = "";
    try {
      importedElements = JSON.parse(data);
      importedElements = initializeElements(JSON.parse(data));
      if (importedElements[0] !== "failed") {
        setElements(importedElements);
        clearNodeOptions();
        addNodeOptions(importedElements); // update start/goal options
        reactFlowInstance.fitView({ padding: 0.45 });
        reset();
      } else {
        warning = "JSON not formatted correctly, please try again.";
        giveWarning(warning);
      }
    } catch (e) {
      warning = "JSON not formatted correctly, please try again.";
      giveWarning(warning);
    }
  };

  function initializeElements(importedElements) {
    Object.keys(importedElements).forEach(function (element) {
      if (
        importedElements[element].hasOwnProperty("id") &&
        importedElements[element].hasOwnProperty("type") &&
        importedElements[element].hasOwnProperty("data")
      ) {
        addToImported = {
          ...importedElements[element].data,
          hidden: valueHidden,
          onChange,
        };

        importedElements[element] = {
          ...importedElements[element],
          data: addToImported,
        };
      } else {
        importedElements = ["failed"];
      }
    });
    return importedElements;
  }

  function handleDataChosen(data) {
    try {
      fileReader = new FileReader();
      fileReader.onloadend = handleDataSaved;
      fileReader.readAsText(data);
    } catch (e) {
      giveWarning("Upload cancelled.");
    }
  }

  function openSidebar() {
    sidebarOpen = true;
    document.getElementById("sidebar").style.width = "300px";
    document.getElementById("maincontent").style.marginLeft = "300px";
    triggerRender();
  }

  function closeSidebar() {
    sidebarOpen = false;
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("maincontent").style.marginLeft = "0";
    triggerRender();
  }

  return (
    <CanvasComponentDiv
      id="maincontent"
      ref={canvasComponent}
      style={{ marginLeft: "300px" }}
    >
      <Sidebar
        id="sidebar"
        onSort={() => onLayout("TB")}
        onCompare={() => setUpComparison()}
        onBFS={() => setAlgorithm("bfs")}
        onDFS={() => setAlgorithm("dfs")}
        onIDDFS={() => setAlgorithm("iddfs")}
        onASTAR={() => setAlgorithm("astar")}
        onNone={() => setAlgorithm("none")}
        onSecondNone={() => setSecondAlgorithm("none")}
        onSecondBFS={() => setSecondAlgorithm("bfs")}
        onSecondDFS={() => setSecondAlgorithm("dfs")}
        onSecondIDDFS={() => setSecondAlgorithm("iddfs")}
        onSecondASTAR={() => setSecondAlgorithm("astar")}
        onCloseSidebar={() => closeSidebar()}
        onSave={() => onSaveElements(elements, filename)}
        onLoad={(event) => handleDataChosen(event.target.files[0])}
        onClear={() => clearCanvas()}
      />
      <CanvasDiv>
        <Warning
          style={{ zIndex: "4", position: "absolute" }}
          warningMsg={warningMsg}
          position="absolute"
        />
        <ReactFlow
          elements={elements}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onConnect={onConnect}
          onElementsRemove={onElementsRemove}
          onLoad={onLoad}
          onDrop={onDrop}
          onDragOver={onDragOver}
          connectionLineType="straight"
        >
          <Background variant="lines" gap={60} />
          <Toolbar
            onZoomIn={() => reactFlowInstance && reactFlowInstance.zoomIn()}
            onZoomOut={() => reactFlowInstance && reactFlowInstance.zoomOut()}
            onFitView={() =>
              reactFlowInstance && reactFlowInstance.fitView({ padding: 0.45 })
            }
            onStepForward={() => step(1)}
            onStepBackward={() => step(-1)}
            onPlay={() => play()}
            onPause={() => pause()}
            onSkipForward={() => skip(1)}
            onSkipBackward={() => skip(-1)}
            onGetCount={currStep}
            onSpeedSlow={() => (speedMultiplier = 0.5)}
            onSpeedNormal={() => (speedMultiplier = 1)}
            onSpeedFast={() => (speedMultiplier = 2)}
            algorithmObject2={algorithmObject2}
            algorithmObject1={algorithmObject1}
            onIDDFS={depthMsg}
            onOpenSidebar={() => openSidebar()}
            elements={elements}
            currAlgorithm={currAlgorithm}
            currAlgorithm2={currAlgorithm2}
            algorithmObject={algorithmObject}
            goals={goals}
          />
          <MiniMap
            style={{
              bottom: 90,
              left: 17,
              display: "flex",
              backgroundColor: "#E8E8E8",
              zIndex: "2",
            }}
            nodeBorderRadius={50}
            nodeColor={(node) => {
              if (node.style?.background) {
                return node.style.background;
              }
              return "#FFFFFF";
            }}
          />
        </ReactFlow>
      </CanvasDiv>
    </CanvasComponentDiv>
  );
};

export {
  Canvas,
  setGoal,
  setStart,
  isPlaying,
  isComparing,
  isSidebarOpen,
  setFilename,
};
