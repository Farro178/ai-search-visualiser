import React, { useState } from "react";
import { IconButton, Button, Paper, Popper } from "@material-ui/core";
import { isComparing } from "../Canvas/Canvas";
import { Close } from "@material-ui/icons";
import styled from "styled-components";

let tree1;
let tree2;
let current1;
let current2;
let todo1;
let todo2;
let visited1;
let visited2;
let goalLabel;
let additionalInfo1;
let additionalInfo2;
let additionalInfo3;
let additionalInfo4;
let goalInfo1;
let goalInfo2;
let currentLabel1;
let currentLabel2;

const InfoDiv = styled.div``;

const PaperDiv = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(1, 1, 1, 0.1);
  width: 260px;
  max-width: 260px;
`;

const TextWrapper = styled.div`
  font-size: 0.85em;
  padding-left: 5px;
  padding-right: 5px
  padding-bottom: 5px;
  overflow-x: auto;
  white-space: nowrap;
  height: 180px
`;

const TextDiv = styled.div`
  padding-bottom: 5px;
`;

const HeadingDiv = styled.div`
  font-size: 1em;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  background: #6dc660;
  color: #000000;
`;

export const Infobox = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "Information Tab" : undefined;

  function getGoal(currentLabel, tree) {
    /* 
    if the current label matches the goal label. The graph values tells what tree it is.
    */
    let goalElement = props.elements.find((el) => el.id === props.goals[tree]);
    if (typeof goalElement !== "undefined") {
      goalLabel = goalElement.data.label;
      if (currentLabel === goalLabel) {
        return "Goal of " + goalLabel + " has been reached";
      } else if (props.currStep + 1 in props.algorithmObject) {
        return "";
      } else {
        return "Goal is not in tree";
      }
    }
  }

  function getLabel(step, type) {
    let match;
    let currentLabel;
    let element;
    if (type === "current") {
      // current
      let currentID = step.currentNode.split(",");
      match = props.elements.find((el) => el.id === currentID[0]);
      currentLabel = match.data.label;
      return currentLabel;
      // visited
    } else if (type === "visited") {
      let visitedID = step.visitedNodes.split(",");
      let visitedLabels = [];
      for (let nodes in visitedID) {
        element = visitedID[nodes];
        match = props.elements.find((el) => el.id === element);
        if (typeof match !== "undefined") {
          visitedLabels.push(match.data.label);
        }
      }
      return visitedLabels.join(", ");
      // todo
    } else if (type === "todo") {
      let todoID = step.todoNodes.split(",");
      let todoLabels = [];
      for (let elements in todoID) {
        element = todoID[elements];
        match = props.elements.find((el) => el.id === element);
        if (typeof match !== "undefined") {
          todoLabels.push(match.data.label);
        }
      }
      return todoLabels.join(", ");
    }
  }

  function resetInfobox() {
    tree1 = "";
    tree2 = "";
    goalInfo1 = "";
    goalInfo2 = "";
    current1 = "";
    current2 = "";
    visited1 = [];
    visited2 = "";
    todo1 = [];
    todo2 = [];
    additionalInfo1 = "";
    additionalInfo2 = "";
    additionalInfo3 = "";
    additionalInfo4 = "";
  }

  function resetComparison() {
    tree2 = "";
    goalInfo2 = "";
    current2 = "";
    visited2 = "";
    todo2 = [];
    additionalInfo3 = "";
    additionalInfo4 = "";
  }
  try {
    if (
      typeof props.algorithmObject1 !== "undefined" &&
      Object.keys(props.algorithmObject1).length !== 0 &&
      Object.keys(props.elements).length !== 0 &&
      props.currStep > 0
    ) {
      if (props.currStep < Object.keys(props.algorithmObject1).length) {
        tree1 = "Tree 1:";
        let stepsArray1 = props.algorithmObject1[props.currStep];
        if (props.currAlgorithm === "astar") {
          additionalInfo1 = "F-Score: " + stepsArray1.currentFScore;
          additionalInfo2 = "G-Score: " + stepsArray1.currentGScore;
        } else if (props.currAlgorithm === "iddfs") {
          additionalInfo1 = "Current Depth: " + stepsArray1.depth;
          additionalInfo2 = "Max Depth: " + stepsArray1.maxDepth;
        } else {
          additionalInfo1 = "";
          additionalInfo2 = "";
        }
        if (typeof stepsArray1 !== "undefined") {
          goalInfo1 = "";
          // current
          currentLabel1 = getLabel(stepsArray1, "current");
          current1 = "Current Node: " + currentLabel1;
          // visited
          visited1 = "Visited Nodes: " + getLabel(stepsArray1, "visited");
          // todo
          todo1 = "To-do Nodes: " + getLabel(stepsArray1, "todo");
        }
        goalInfo1 = getGoal(currentLabel1, 0);
      }
      // if comparing is actived
      if (
        isComparing() &&
        typeof props.algorithmObject2 !== "undefined" &&
        Object.keys(props.algorithmObject2).length !== 0
      ) {
        if (props.currStep < Object.keys(props.algorithmObject2).length) {
          tree2 = "Tree 2:";
          let stepsArray2 = props.algorithmObject2[props.currStep];
          if (props.currAlgorithm2 === "iddfs") {
            additionalInfo3 = "Current Depth: " + stepsArray2.depth;
            additionalInfo4 = "Max Depth: " + stepsArray2.maxDepth;
          } else {
            additionalInfo3 = "";
            additionalInfo4 = "";
          }
          if (typeof stepsArray2 !== "undefined") {
            goalInfo2 = "";
            // current
            currentLabel2 = getLabel(stepsArray2, "current");
            current2 = "Current Node: " + currentLabel2;
            // visited
            visited2 = "Visited Nodes: " + getLabel(stepsArray2, "visited");
            // todo
            todo2 = "To-do Nodes: " + getLabel(stepsArray2, "todo");
          }
          goalInfo2 = getGoal(currentLabel2, 1);
        }
      } else {
        resetComparison();
      }
    } else if (props.currStep === 0) {
      resetInfobox();
    }
  } catch (e) {
    resetInfobox();
  }

  return (
    <InfoDiv>
      <Button
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        variant="outlined"
        size="large"
        style={{ textTransform: "none", fontSize: "1.15rem" }}
        data-testid="infobox-open-button"
      >
        Info
      </Button>
      <Popper
        style={{ zIndex: "4" }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="top-end"
        modifiers={{
          offset: { enabled: true, offset: "-5, 15" }, //currently causing infobox to move when adding edge or playing
        }}
      >
        <Paper>
          <PaperDiv>
            <HeadingDiv>
              Information
              <IconButton
                onClick={handleClick}
                size="small"
                style={{ marginLeft: 120 }}
              >
                <Close />
              </IconButton>
            </HeadingDiv>
            <TextWrapper>
              <TextDiv style={{ textDecoration: "underline" }}>{tree1}</TextDiv>
              <TextDiv
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                {goalInfo1}
              </TextDiv>
              <TextDiv data-testid="current1-node-infobox">{current1}</TextDiv>
              <TextDiv>{visited1} </TextDiv>
              <TextDiv>{todo1} </TextDiv>
              <TextDiv>{additionalInfo1}</TextDiv>
              <TextDiv>{additionalInfo2}</TextDiv>
              <TextDiv style={{ textDecoration: "underline" }}>{tree2}</TextDiv>
              <TextDiv
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                {goalInfo2}
              </TextDiv>
              <TextDiv>{current2}</TextDiv>
              <TextDiv>{visited2}</TextDiv>
              <TextDiv>{todo2}</TextDiv>
              <TextDiv>{additionalInfo3}</TextDiv>
              <TextDiv>{additionalInfo4}</TextDiv>
            </TextWrapper>
          </PaperDiv>
        </Paper>
      </Popper>
    </InfoDiv>
  );
};
