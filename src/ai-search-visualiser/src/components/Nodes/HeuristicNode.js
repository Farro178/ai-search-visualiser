import styled from "styled-components";
import { Handle } from "react-flow-renderer";
import React from "react";
const IdDiv = styled.div``;

const NodeDiv = styled.div`
  font-size: 12px;
  input {
    font-size: 12px;
    display: ${(props) => (props.isHidden ? "none" : "")};
    color: red;
    width: 50%;
    max-width: 100px;
    text-align: center;
    border: 1px solid black;
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
`;

const HeuristicNode = (props) => {
  return (
    <NodeDiv isHidden={props.data.hidden}>
      <Handle type="target" position="top" />
      <IdDiv>{props.data.label}</IdDiv>
      <input
        type="number"
        min="0"
        value={props.data.value}
        onChange={(event) => props.data.onChange(event, props.id)}
        aria-label="Enter heuristic value"
      />
      <Handle type="source" position="bottom" />
    </NodeDiv>
  );
};

export default HeuristicNode;
