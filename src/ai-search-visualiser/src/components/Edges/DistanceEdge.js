import styled from "styled-components";

const EdgeDiv = styled.div`
  input {
    border: none;
    font-size: 11px;
    display: ${(props) => (props.isHidden ? "none" : "")};
    width: 100%;
    max-width: 15px;
    text-align: center;
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

let num = 0;
const getNum = () => `${++num}`;

const DistanceEdge = (props) => {
  // midpoint between two lines with offset for input width
  const centerX = (props.sourceX + props.targetX - 25) / 2;
  const centerY = (props.sourceY + props.targetY - 22.5) / 2;

  return (
    <>
      <path
        id={props.id}
        style={{ stroke: "black" }}
        className="react-flow__edge-path"
        d={`M ${props.sourceX},${props.sourceY}L ${props.targetX},${props.targetY}`}
      />
      <foreignObject x={centerX} y={centerY} width="25" height="100">
        <EdgeDiv isHidden={props.data.hidden}>
          <input
            id={"distanceInput" + getNum()}
            type="number"
            min="0"
            value={props.data.value}
            onChange={(event) => props.data.onChange(event, props.id)}
            aria-label="Enter edge distance"
          />
        </EdgeDiv>
      </foreignObject>
    </>
  );
};

export default DistanceEdge;
