import React, { forwardRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  IconButton,
} from "@material-ui/core";
import {
  Help,
  Close,
  ZoomIn,
  ZoomOut,
  Fullscreen,
  Pause,
  PlayArrow,
  ArrowBack,
  ArrowForward,
  FastForward,
  FastRewind,
} from "@material-ui/icons";
import TutorialNodes from "./TutorialNodes";
import SyncIcon from "@material-ui/icons/Sync";

const SlideDown = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export function Tutorial() {
  const [open, isOpen] = useState(true);

  const setClosed = () => {
    isOpen(false);
  };

  const setOpened = () => {
    isOpen(true);
  };

  return (
    <div style={{ marginLeft: "auto", marginRight: 0 }}>
      <Button
        onClick={setOpened}
        aria-hidden="false"
        aria-label="Open tutorial"
      >
        <p
          style={{
            textTransform: "none",
            paddingRight: "10px",
            fontSize: "1rem",
          }}
        >
          Tutorial
        </p>{" "}
        <Help style={{ fontSize: "2rem" }} />
      </Button>
      <Dialog open={open} onClose={setClosed} TransitionComponent={SlideDown}>
        <DialogTitle style={{ backgroundColor: "#6dc660" }}>
          Tutorial
          <IconButton
            onClick={setClosed}
            size="small"
            style={{ float: "right" }}
            aria-hidden="false"
            aria-label="Close tutorial"
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ fontSize: "1rem" }}>
          <p>
            <b>A.I Search Visualiser</b> is a tool that was developed to help
            visualise popular search algorithms used within Artificial
            Intelligence. The following is a key that should be used to help
            understand the current state of each node in the algorithm
            visualisation process.
          </p>
          <TutorialNodes style={{ alignContent: "center" }} />
          <p style={{ paddingTop: "10px" }}>
            <b>Notes on each algorithm:</b>
          </p>
          <ul>
            <li>
              Breadth-first search (BFS) - Beginning at the selected starting
              point, BFS traverses the tree visiting child nodes that are
              connected to the current node by first adding them all to a queue.
              BFS moves horizontally and so will not move to the next level
              until all nodes on their current level have been checked or the
              goal has been reached. It does this using the first in first out
              method in its to-do queue. BFS continues in this fashion until the
              goal is found or there are no longer any nodes in the queue.
            </li>
            <li>
              Depth-first search (DFS) - DFS begins at the selected starting
              point. It traverses the tree visiting its children adding them to
              a stack. Unlike BFS however, it takes the last child added to the
              to-do stack as the next node to visit. This means DFS traverses
              down the tree and when it reaches a node without children, it will
              backtrack. It does this until the goal has been reached or there
              are no nodes left in the to-do stack.
            </li>
            <li>
              Iterative deepening depth-first search (IDDFS) - IDDFS is a
              combination of DFS and BFS. It begins at the starting node,
              keeping track of its depth in the tree which at the beginning is
              set to 0. The algorithm uses that depth to set a limit on how deep
              it can then travel using DFS. Once every node in its current
              max-depth has been visited, the max-depth is incremented by one
              and the current node returns to the beginning of the tree. It
              continues until the set goal node is found.
            </li>
            <li>
              A-star (A*) search - A* takes a more informed approach to search.
              It uses set values to find the shortest path from the start to the
              goal node. The values needed for A* are the heuristic value
              (h(n)), g-score (g(n)) value and the f-score (f(n)) value. The
              heuristic value is supposed to be the estimation of the cost from
              the current to the end node. For customizability, this value is
              set by the user however the end goal node will always have a
              heuristic value of 0. The g-score is the cost which is calculated
              by adding all edge distance values from the start to the current
              node. Finally, the f-score is calculated by adding together the
              g-score and the heuristic value of the current node. The algorithm
              adds all child nodes to the current and visited nodes to a to-do
              stack, the node with the lowest f-score value is taken as the
              current node in the following step. This continues until the goal
              is reached or the to-do stack is empty.
            </li>
          </ul>
          <p style={{ paddingTop: "10px" }}>
            <b>Canvas controls:</b>
          </p>
          <ul>
            <li>
              To add an additional node to the canvas, drag and drop one from
              the &#9776; sidebar.
            </li>
            <li>
              To create a connection between two nodes, click and hold from the
              bottom point of the first (parent) node to the top point of the
              second (child) node, or vice versa.
            </li>
            <li>
              Nodes can be moved around the canvas using by clicking and
              dragging them.
            </li>
            <li>
              Click on a node or edge and press the backspace key to delete it.
              Any edges connected to the node will also be removed.
            </li>
            <li>
              Use the "Tree layout" button in the sidebar to automatically
              position the nodes on the canvas.
            </li>
            <li>
              <ZoomIn
                style={{ fontSize: "1.25rem" }}
                aria-hidden="false"
                aria-label="zoom in button image"
              />{" "}
              Zoom into the canvas
            </li>
            <li>
              <ZoomOut
                style={{ fontSize: "1.25rem" }}
                aria-hidden="false"
                aria-label="zoom out button image"
              />{" "}
              Zoom out of the canvas
            </li>
            <li>
              <Fullscreen
                style={{ fontSize: "1rem" }}
                aria-hidden="false"
                aria-label="fit to view button image"
              />{" "}
              Fit canvas contents in view
            </li>
          </ul>

          <p style={{ paddingTop: "10px" }}>
            <b>Visualisation:</b>
          </p>
          <ol>
            <li>
              Open the sidebar using the &#9776; button in the toolbar along the
              bottom of the canvas.
            </li>
            <li>Select the start and goal nodes from the dropdown menus.</li>
            <li>
              Select the algorithm you wish to visualise from the next dropdown
              menu.
            </li>
            <li>(Optional) Close the sidebar by clicking the X at the top.</li>
            <li>
              Begin using the playback options:
              <ul>
                <li>
                  <FastRewind
                    style={{ fontSize: "1rem" }}
                    aria-hidden="false"
                    aria-label="skip back button image"
                  />{" "}
                  Skip back (to start)
                </li>
                <li>
                  <ArrowBack
                    style={{ fontSize: "1rem" }}
                    aria-hidden="false"
                    aria-label="step back button image"
                  />{" "}
                  Step back
                </li>
                <li>
                  <PlayArrow
                    style={{ fontSize: "1rem" }}
                    aria-hidden="false"
                    aria-label="play button image"
                  />{" "}
                  Play (use dropdown menu to select speed)
                </li>
                <li>
                  <Pause
                    style={{ fontSize: "1rem" }}
                    aria-hidden="false"
                    aria-label="pause button image"
                  />{" "}
                  Pause
                </li>
                <li>
                  <ArrowForward
                    style={{ fontSize: "1rem" }}
                    aria-hidden="false"
                    aria-label="step forward button image"
                  />{" "}
                  Step forward
                </li>
                <li>
                  <FastForward
                    style={{ fontSize: "1rem" }}
                    aria-hidden="false"
                    aria-label="skip forward button image"
                  />{" "}
                  Skip forward (to end)
                </li>
              </ul>
            </li>
            <li>
              Use the "Info" button in the toolbar to view the contents of the
              current, visited and to-do lists and other information in text
              form in a popup window.
            </li>
          </ol>

          <p style={{ paddingTop: "10px" }}>
            <b>Comparison:</b>
          </p>
          <ol>
            <li>
              In the sidebar, click the switch beside "Comparison:" so the
              circle is at the "On" side.
            </li>
            <li>
              Set up visualisation as you would normally, this time selecting
              two algorithms from two dropdown menus.
            </li>
            <li>
              The graph on the left corresponds to the first algorithm and the
              graph on the right corresponds to the second.
            </li>
          </ol>

          <p style={{ paddingTop: "10px" }}>
            <b>Please note:</b>
          </p>
          <ul>
            <li>
              This website currently supports searching through trees, not
              graphs. Please ensure all nodes have at most 1 parent.
            </li>
            <li>
              Use the refresh{" "}
              <SyncIcon
                style={{ fontSize: "1rem" }}
                aria-hidden="false"
                aria-label="refresh button image"
              />{" "}
              button to update your visualisation if you edit values on nodes or
              edges during A* search.
            </li>
            <li>
              To re-open the tutorial simply click the{" "}
              <Help
                style={{ fontSize: "1rem" }}
                aria-hidden="false"
                aria-label="help button image"
              />{" "}
              button at any time.
            </li>
            <li>
              You can save and load JSON files containing node information.
              Enter a filename to save the information in [filename].json or
              save to the default elements.json.
            </li>
            <li>
              You can edit the label value inside node objects in a JSON file to
              change the label shown in the graph. Any string (although we
              recommend keeping it short) is accepted.
            </li>
            <li>
              In comparison mode, nodes and edges cannot be edited. You must
              disable comparison mode to make changes.
            </li>
            <li>
              In comparison mode, saving the nodes will save only the original
              tree, not the duplicate.
            </li>
            <li>
              To visualise Iterative Deepening Depth-First Search, you{" "}
              <i>must</i> select a goal node that is reachable from the start
              node. This is due to an infinite loop in the algorithm until the
              goal is found.
            </li>
            <li>
              With A* search selected, nodes will contain two values and edges
              will contain one. You can edit the bottom node value and the edge
              value directly on the canvas. The input value in a node represents
              the heuristic of that particular node. The input value in an edge
              represents the distance value of that particular edge.
            </li>
            <li>
              Nodes that are loaded in from a JSON file cannot be edited, you
              must specify the value inside the file before uploading. This is
              done by changing the value inside the data of the node object.
            </li>
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}
