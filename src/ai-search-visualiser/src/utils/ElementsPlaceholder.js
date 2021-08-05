import { defaultNodeStyle } from "./nodeStyles";
import { defaultEdgeStyle } from "../utils/edgeStyles";

let valueHidden = true;

const elementsPlaceholder = [
  {
    id: "1",
    type: "heuristic",
    position: { x: 275, y: 35 },
    data: {
      label: "1",
      value: "5",
      hidden: valueHidden,
    },
    style: defaultNodeStyle,
  },
  {
    id: "2",
    type: "heuristic",
    position: { x: 155, y: 155 },
    data: {
      label: "2",
      value: "2",
      hidden: valueHidden,
    },
    style: defaultNodeStyle,
  },
  {
    id: "3",
    type: "heuristic",
    position: { x: 395, y: 155 },
    data: {
      label: "3",
      value: "3",
      hidden: valueHidden,
    },
    style: defaultNodeStyle,
  },
  {
    id: "4",
    type: "heuristic",
    position: { x: 95, y: 275 },
    data: {
      label: "4",
      value: "4",
      hidden: valueHidden,
    },
    style: defaultNodeStyle,
  },
  {
    id: "5",
    type: "heuristic",
    position: { x: 215, y: 275 },
    data: {
      label: "5",
      value: "0",
      hidden: valueHidden,
    },
    style: defaultNodeStyle,
  },
  {
    id: "6",
    type: "heuristic",
    position: { x: 335, y: 275 },
    data: {
      label: "6",
      value: "4",
      hidden: valueHidden,
    },
    style: defaultNodeStyle,
  },
  {
    id: "7",
    type: "heuristic",
    position: { x: 455, y: 275 },
    data: {
      label: "7",
      value: "2",
      hidden: valueHidden,
    },
    style: defaultNodeStyle,
  },
  {
    id: "8",
    type: "heuristic",
    position: { x: 35, y: 395 },
    data: {
      label: "8",
      value: "6",
      hidden: valueHidden,
    },
    style: defaultNodeStyle,
  },
  {
    id: "9",
    type: "heuristic",
    position: { x: 155, y: 395 },
    data: {
      label: "9",
      value: "3",
      hidden: valueHidden,
    },
    style: defaultNodeStyle,
  },
  {
    id: "10",
    type: "heuristic",
    position: { x: 275, y: 395 },
    data: {
      label: "10",
      value: "0",
      hidden: valueHidden,
    },
    style: defaultNodeStyle,
  },
  {
    id: "11",
    type: "heuristic",
    position: { x: 395, y: 395 },
    data: {
      label: "11",
      value: "4",
      hidden: valueHidden,
    },
    style: defaultNodeStyle,
  },
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "distanceEdge",
    data: {
      value: "2",
      hidden: valueHidden,
    },
    animated: false,
    style: defaultEdgeStyle,
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    type: "distanceEdge",
    data: {
      value: "3",
      hidden: valueHidden,
    },
    animated: false,
    style: defaultEdgeStyle,
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    type: "distanceEdge",
    data: {
      value: "4",
      hidden: valueHidden,
    },
    animated: false,
    style: defaultEdgeStyle,
  },
  {
    id: "e2-5",
    source: "2",
    target: "5",
    type: "distanceEdge",
    data: {
      value: "5",
      hidden: valueHidden,
    },
    animated: false,
    style: defaultEdgeStyle,
  },
  {
    id: "e4-8",
    source: "4",
    target: "8",
    type: "distanceEdge",
    data: {
      value: "6",
      hidden: valueHidden,
    },
    animated: false,
    style: defaultEdgeStyle,
  },
  {
    id: "e4-9",
    source: "4",
    target: "9",
    type: "distanceEdge",
    data: {
      value: "1",
      hidden: valueHidden,
    },
    animated: false,
    style: defaultEdgeStyle,
  },
  {
    id: "e3-6",
    source: "3",
    target: "6",
    type: "distanceEdge",
    data: {
      value: "8",
      hidden: valueHidden,
    },
    animated: false,
    style: defaultEdgeStyle,
  },
  {
    id: "e3-7",
    source: "3",
    target: "7",
    type: "distanceEdge",
    data: {
      value: "1",
      hidden: valueHidden,
    },
    animated: false,
    style: defaultEdgeStyle,
  },
  {
    id: "e6-10",
    source: "6",
    target: "10",
    type: "distanceEdge",
    data: {
      value: "5",
      hidden: valueHidden,
    },
    animated: false,
    style: defaultEdgeStyle,
  },
  {
    id: "e6-11",
    source: "6",
    target: "11",
    type: "distanceEdge",
    data: {
      value: "0",
      hidden: valueHidden,
    },
    animated: false,
    style: defaultEdgeStyle,
  },
];

export { elementsPlaceholder };
