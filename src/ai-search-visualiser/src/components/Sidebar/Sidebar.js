import React, { useState } from "react";
import { defaultNodeStyle } from "../../utils/nodeStyles";
import styled from "styled-components";
import {
  Button,
  Box,
  ButtonGroup,
  Switch,
  Grid,
  Paper,
} from "@material-ui/core";
import { setGoal, setStart, setFilename, isComparing } from "../Canvas/Canvas";
import { isNode } from "react-flow-renderer";
import { Delete } from "@material-ui/icons";
import SyncIcon from "@material-ui/icons/Sync";

const StyledSidebar = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(1, 1, 1, 0.1);
  height: 100%;
  width: 300px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.3s;
`;

const SidebarNode = styled.div`
  border: 2px solid #000;
  border-radius: 50%;
  margin-left: 38%;
  margin-bottom: 10px;
  align-items: center;
  text-align: center;
  position: relative;
  width: 50px;
  height: 50px;
  cursor: grab;
`;

const SidebarNodeBox = styled(Paper)`
  box-shadow: 0px 0px 10px 0px rgba(1, 1, 1, 0.2);
  margin: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  justify-content: center;
  border-radius: 5px;
  font-size: 1rem;
  position: relative;
`;

let i = 0;
function addNodeOptions(elements) {
  // add all nodes to options for selection as goal or start
  let selectStart = document.getElementById("selectStart");
  let selectGoal = document.getElementById("selectGoal");

  while (i < elements.length) {
    let element = elements[i];
    if (isNode(element)) {
      let text = element.data.label; // user picks from names as seen on graph
      let value = element.id; // goal is set as acutal node id as this matches getGraph

      let optionStart = document.createElement("option");
      optionStart.textContent = text;
      optionStart.value = value;

      // have to clone same item to place in two locations
      let optionGoal = document.createElement("option");
      optionGoal.textContent = text;
      optionGoal.value = value;

      if (!(optionStart in selectStart)) {
        // no duplicates
        selectStart.appendChild(optionStart);
        selectGoal.appendChild(optionGoal);
      }
    }
    i++;
  }
}

function addNodeOption(element) {
  // add all nodes to options for selection as goal or start
  let selectStart = document.getElementById("selectStart");
  let selectGoal = document.getElementById("selectGoal");

  let text = element.data.label; // user picks from names as seen on graph
  let value = element.id; // goal is set as acutal node id as this matches getGraph

  let optionStart = document.createElement("option");
  optionStart.textContent = text;
  optionStart.value = value;

  // have to clone same item to place in two locations
  let optionGoal = document.createElement("option");
  optionGoal.textContent = text;
  optionGoal.value = value;

  selectStart.appendChild(optionStart);
  selectGoal.appendChild(optionGoal);
};

// removes all nodes from options
function clearNodeOptions() {
  var startList = document.getElementById("selectStart");
  var goalList = document.getElementById("selectGoal");

  let length = startList.length;
  for (i = length - 1; i >= 1; i--) {
    startList.removeChild(startList.childNodes[i]);
    goalList.removeChild(goalList.childNodes[i]);
  }
}

// remove node that has been deleted from graph
function removeNodeOption(elements) {
  var startList = document.getElementById("selectStart");
  var goalList = document.getElementById("selectGoal");

  let label = "";
  let id = "";
  elements.forEach((element) => {
    // find node that has been removed - elements includes any edges connected
    if (isNode(element)) {
      label = element.data.label;
      id = element.id;
    }
  });

  let length = startList.length;
  let optionToRemove;
  let found = false;
  let i = 0;
  while (i < length && !found) {
    // find the option element we are trying to remove
    if (startList[i].textContent === label && startList[i].value === id) {
      // corresponds to node we have removed
      optionToRemove = i;
      found = true;
    }
    i++;
  }

  if (found) {
    startList.removeChild(startList.childNodes[optionToRemove]); // remove option for start
    goalList.removeChild(goalList.childNodes[optionToRemove]); // remove option for goal
  }
}

function resetAlgo() {
  document.getElementById("selectAlgo1").selectedIndex = 0;
  document.getElementById("selectAlgo2").selectedIndex = 0;
}

function Sidebar({
  onSort = () => {},
  onCompare = () => {},
  onBFS = () => {},
  onDFS = () => {},
  onIDDFS = () => {},
  onASTAR = () => {},
  onNone = () => {},
  onSecondNone = () => {},
  onSecondBFS = () => {},
  onSecondDFS = () => {},
  onSecondIDDFS = () => {},
  onCloseSidebar = () => {},
  onSave = () => {},
  onLoad = () => {},
  onClear = () => {},
}) {
  const [compare, setCompare] = useState(false);

  const toggleCompare = () => {
    setCompare((prev) => !prev);
    onCompare();
  };

  const onDragStart = (event) => {
    event.dataTransfer.effectAllowed = "move";
  };

  function getStart() {
    var startSelect = document.getElementById("selectStart");
    let value = startSelect.value.toString();
    // if value == 0 --> no node has been selected
    return value;
  };

  function onStart() {
    let start = getStart();
    setStart(start);
    tryRefresh();
  };

  function getGoal() {
    var goalSelect = document.getElementById("selectGoal");
    let value = goalSelect.value.toString();
    // if value == 0 --> no node has been selected
    return value;
  };

  function onGoal() {
    let goal = getGoal();
    setGoal(goal);
    tryRefresh();
  };

  function getAlgo(number) {
    let id;
    if (number === 1) {
      id = "selectAlgo1";
    } else if (number === 2) {
      id = "selectAlgo2";
    }

    var algoSelect = document.getElementById(id);
    let value = algoSelect.value.toString();
    return value;
  };

  function onAlgoFirst() {
    let value = getAlgo(1);
    // if value == 0 --> no algo has been selected
    switch (value) {
      case "1":
        onBFS();
        break;
      case "2":
        onDFS();
        break;
      case "3":
        onIDDFS();
        break;
      case "4":
        onASTAR();
        break;
      default:
        onNone();
        break;
    }

    if (isComparing()) {
      onAlgoSecond();
    }
  };

  function onAlgoSecond() {
    let value = getAlgo(2);
    // if value == 0 --> no algo has been selected
    switch (value) {
      case "1":
        onSecondBFS();
        break;
      case "2":
        onSecondDFS();
        break;
      case "3":
        onSecondIDDFS();
        break;
      default:
        onSecondNone();
        break;
    }
  };

  function getFilename() {
    let value = document.getElementById("filenameInput").value;

    if (value === "") {
      value = "elements"; // return to default value
    }

    setFilename(value);
  };

  function tryRefresh() {
    if (getAlgo(1) !== "0") {
      onAlgoFirst(); // generate algorithm object

      if (isComparing() && getAlgo(2) !== "0") { // if in comparison mode and second algorithm is selected
        onAlgoSecond(); // generate second algorithm object
      }
    }
  };

  function onRefresh() {
    onAlgoFirst();

    if (isComparing()) {
      onAlgoSecond();
    }
  };

  return (
    <StyledSidebar id="sidebar">
      <Button
        aria-label="Close sidebar"
        onClick={onCloseSidebar}
        style={{
          fontSize: "2rem",
          float: "right",
          cursor: "pointer",
          height: "5%"
        }}
      >
        &times;
      </Button>
      {isComparing() ? (
        <SidebarNodeBox style={{ clear: "both" }}>
          <p>Nodes cannot be added during comparison</p>
        </SidebarNodeBox>
      ) : (
        <SidebarNodeBox style={{ clear: "both" }}>
          <p>Drag onto canvas to create node</p>
          <SidebarNode
            onDragStart={(event) =>
              onDragStart(event, "default", defaultNodeStyle)
            }
            draggable
          ></SidebarNode>
        </SidebarNodeBox>
      )}
      <Box mb={0}>
        <Button
        
          aria-label="Tree layout nodes"
          variant="outlined"
          onClick={onSort}
          size="small"
          style={{ textTransform: "none", fontSize: "1rem" }}
        >
          Tree layout
        </Button>
      </Box>
      <div>
        <Grid container alignItems="center" justify="center" spacing={1}>
          <Grid item>
          <label
          htmlFor="compareSwitch"
          style={{ fontSize: "1rem" }}
        >
          Comparison:
        </label>
          </Grid>
          <Grid item>Off</Grid>
          <Grid item>
            <Switch
              id="compareSwitch"
              aria-label={"Comparison mode switch " + isComparing() ? "off" : "on"}
              checked={compare}
              onChange={toggleCompare}
              color={"default"}
              style={{ color: "#6DC660" }}
            />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </div>
      <div id="startSelect">
        <label
          htmlFor="selectStart"
          style={{ paddingRight: "6px", fontSize: "1rem" }}
        >
          Select start node:
        </label>
        <select id="selectStart" onChange={onStart}>
          <option value="0">Start node</option>
        </select>
      </div>
      <div
        id="goalSelect"
        style={{ paddingTop: "15px", paddingBottom: "15px" }}
      >
        <label
          htmlFor="selectGoal"
          style={{ paddingRight: "6px", fontSize: "1rem" }}
        >
          Select goal node:
        </label>
        <select id="selectGoal" onChange={onGoal}>
          <option value="0">Goal node</option>
        </select>
      </div>
      <label
        htmlFor="selectAlgo1"
        style={{ paddingRight: "6px", fontSize: "1rem" }}
      >
        Choose {isComparing() ? "first" : "an"} algorithm:
      </label>
      <select
        id="selectAlgo1"
        onChange={onAlgoFirst}
        style={{ width: "70%", marginTop: "10px" }}
        defaultValue="0"
      >
        <option value="0">Choose an algorithm</option>
        <option value="1">Breadth-First Search</option>
        <option value="2">Depth-First Search</option>
        <option value="3">Iterative Deepening Depth-First Search</option>
        <option value="4" style={isComparing() ? { display: "none" } : {}}>
          A*
        </option>
      </select>
      <br />
      <div
        style={{ display: isComparing() ? "block" : "none", marginTop: "15px" }}
      >
        <label
          htmlFor="selectAlgo2"
          style={{ paddingRight: "6px", fontSize: "1rem" }}
        >
          Choose second algorithm:
        </label>
        <select
          id="selectAlgo2"
          onChange={onAlgoSecond}
          style={{ width: "70%", marginTop: "10px" }}
          defaultValue="0"
        >
          <option value="0">Choose an algorithm</option>
          <option value="1">Breadth-First Search</option>
          <option value="2">Depth-First Search</option>
          <option value="3">Iterative Deepening Depth-First Search</option>
        </select>
      </div>
      <br />
      <div>
        <Grid container alignItems="center" justify="center" spacing={1}>
          <Grid item>
            <p style={{ fontSize: "1rem" }}>Re-generate visualisation:</p>
          </Grid>
          <Grid item>
            <Button
              id="refresh"
              variant="outlined"
              onClick={onRefresh}
              size="small"
              style={{ textTransform: "none", fontSize: "1rem" }}
              aria-label="Re-generate visualisation"
            >
              <SyncIcon />
            </Button>
          </Grid>
        </Grid>
      </div>
      <div style={{ paddingTop: "10px", paddingBottom: "5px" }}>
        <label
          htmlFor="filenameInput"
          style={{ paddingRight: "6px", paddingTop: "6px", fontSize: "1rem" }}
        >
          Enter filename:
        </label>
        <input
          id="filenameInput"
          type="text"
          placeholder="filename"
          onChange={getFilename}
        />
      </div>
      <div id="saveAndLoad" style={{ paddingTop: "10px", zindex: "2" }}>
        <Grid container alignItems="center" justify="center" spacing={1}>
          <Grid item>
            <p style={{ fontSize: "1rem" }}>Save or load a tree:</p>
          </Grid>
          <Grid item>
            <ButtonGroup id="loadSave">
              <Button
                onClick={onSave}
                size="small"
                style={{ textTransform: "none", fontSize: "1rem"  }}
                variant="outlined"
                aria-label="Save"
              >
                Save
              </Button>
              <Button
                component="label"
                size="small"
                style={{ textTransform: "none", fontSize: "1rem"  }}
                variant="outlined"
                aria-label="Load"
                onClick={resetAlgo}
              >
                Load
                <input
                  	onChange={onLoad}
                  	hidden
                  	type="file"
                  	id="file"
                  	accept=".json"
                ></input>
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </div>
      <div style={{ zindex: "2", paddingBottom: "80px" }}>
        <Grid container alignItems="center" justify="center" spacing={1}>
          <Grid item>
            <p style={{ fontSize: "1rem" }}>Clear canvas:</p>
          </Grid>
          <Grid item>
            <Button
              id="clearCanvas"
              onClick={onClear}
              size="small"
              variant="outlined"
              aria-label="Clear Canvas"
            >
              <Delete />
            </Button>
          </Grid>
        </Grid>
      </div>
    </StyledSidebar>
  );
}

export {
  Sidebar,
  addNodeOptions,
  addNodeOption,
  removeNodeOption,
  clearNodeOptions,
  resetAlgo,
};
