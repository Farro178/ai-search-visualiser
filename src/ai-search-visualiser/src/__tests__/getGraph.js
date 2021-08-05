import getGraph from "../utils/getGraph";
import { elements1, elements2 } from "../testResources/testElements";

function getGraphRemoveUndefined(elements) {
  let graph = getGraph(elements);
  return graph.splice(1, graph.length);
}

it("getGraph: search graph from elements", () => {
  expect(getGraphRemoveUndefined(elements1)).toEqual([
    ["2", "3"],
    ["4", "5"],
    [],
    [],
    [],
  ]);

  expect(getGraphRemoveUndefined(elements2)).toEqual([
    ["2", "3"],
    ["4", "5", "6"],
    ["7"],
    [],
    [],
    [],
    ["8", "9"],
    [],
    ["10"],
    [],
  ]);
});
