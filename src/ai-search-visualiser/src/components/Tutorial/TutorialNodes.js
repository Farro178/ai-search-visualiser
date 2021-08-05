import React from "react";
import styled from "styled-components";

const DefaultTutorialNode = styled.div`
  border: 2px solid #000;
  border-radius: 50%;
  margin-top: 5px;
  margin-left: 15px;
  margin-right: 15px;
  width: 50px;
  height: 50px;
`;

const VisitedTutorialNode = styled.div`
  border: 2px solid #000;
  border-radius: 50%;
  background: #6dc660;
  margin-top: 5px;
  margin-left: 15px;
  margin-right: 15px;
  width: 50px;
  height: 50px;
`;

const TodoTutorialNode = styled.div`
  border: 2px solid #000;
  border-radius: 50%;
  background: #ef5069;
  margin-top: 5px;
  margin-left: 15px;
  margin-right: 15px;
  width: 50px;
  height: 50px;
`;

const CurrentTutorialNode = styled.div`
  border: 2px solid #000;
  border-radius: 50%;
  background: #65a7f7;
  margin-top: 5px;
  margin-left: 15px;
  margin-right: 15px;
  width: 50px;
  height: 50px;
`;

const GoalTutorialNode = styled.div`
  border: 2px solid #000;
  border-radius: 50%;
  background: #efe322;
  margin-top: 5px;
  margin-left: 15px;
  margin-right: 15px;
  width: 50px;
  height: 50px;
`;

export default function TutorialNodes() {
  return (
    <div
      style={{
        display: "inline-block",
        fontSize: "1.2rem",
        textAlign: "center",
        marginLeft: "20px",
      }}
    >
      <b>
        <u>Canvas key</u>
      </b>
      <div
        style={{
          display: "inline-block",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          Default
          <DefaultTutorialNode
            id="default"
            style={{ alignContent: "center" }}
          />
        </div>
        <div
          style={{
            display: "inline-block",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          Current
          <CurrentTutorialNode style={{ alignContent: "center" }} />
        </div>
        <div
          style={{
            display: "inline-block",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          Visited
          <VisitedTutorialNode style={{ alignContent: "center" }} />
        </div>
        <div
          style={{
            display: "inline-block",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          To-do
          <TodoTutorialNode style={{ alignContent: "center" }} />
        </div>
        <div
          style={{
            display: "inline-block",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          Goal
          <GoalTutorialNode style={{ alignContent: "center" }} />
        </div>
      </div>
    </div>
  );
}
