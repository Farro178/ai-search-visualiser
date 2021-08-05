import getGraphLengths from "../utils/getGraphLengths";
import { elements1, elements2, elements3 } from "../testResources/testElements";
import {
  graphLength1,
  graphLength2,
  graphLength3,
} from "../testResources/testGraphs";

const emptyElements = [];

const emptyGraph = {};

it("Get graph with lengths", () => {
  expect(getGraphLengths(elements1)).toEqual(graphLength1);
  expect(getGraphLengths(elements2)).toEqual(graphLength2);
  expect(getGraphLengths(emptyElements)).toEqual(emptyGraph);
  expect(getGraphLengths(elements3)).toEqual(graphLength3);
});
