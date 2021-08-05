import astar from "../utils/algorithms/astar";
import bfs from "../utils/algorithms/bfs";
import dfs from "../utils/algorithms/dfs";
import iddfs from "../utils/algorithms/iddfs";
import {
  elements1,
  elements2,
  elements3,
  elements4,
  elements5,
  elements6,
} from "../testResources/testElements";

import {
  graph1,
  graph2,
  graph3,
  graph4,
  graph5,
  graph6,
  graphLength1,
  graphLength2,
  graphLength3,
  graphLength4,
  graphLength5,
  graphLength6,
} from "../testResources/testGraphs";

function objLength(object) {
  return Object.keys(object).length;
}

function finalObj(object) {
  return object[objLength(object) - 1];
}

it("Breadth-First Search: current, visited and todo final values", () => {
  // graph1
  expect(finalObj(bfs(graph1, "1", "1"))).toEqual({
    currentNode: "1",
    visitedNodes: "",
    todoNodes: "",
  });
  expect(finalObj(bfs(graph1, "1", "2"))).toEqual({
    currentNode: "2",
    visitedNodes: "1",
    todoNodes: "3",
  });
  expect(finalObj(bfs(graph1, "1", "4"))).toEqual({
    currentNode: "4",
    visitedNodes: "1,2,3",
    todoNodes: "5",
  });
  expect(finalObj(bfs(graph1, "1", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "1,2,3,4",
    todoNodes: "",
  });
  expect(finalObj(bfs(graph1, "2", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "2,4",
    todoNodes: "",
  });

  expect(finalObj(bfs(graph1, "1", "6"))).toEqual({
    currentNode: "5",
    visitedNodes: "1,2,3,4,5",
    todoNodes: "",
  });
  expect(finalObj(bfs(graph1, "1", "100"))).toEqual({
    currentNode: "5",
    visitedNodes: "1,2,3,4,5",
    todoNodes: "",
  });

  expect(finalObj(bfs(graph1, "3", "5"))).toEqual({
    currentNode: "3",
    visitedNodes: "3",
    todoNodes: "",
  });
  expect(finalObj(bfs(graph1, "4", "5"))).toEqual({
    currentNode: "4",
    visitedNodes: "4",
    todoNodes: "",
  });

  // graph2
  expect(finalObj(bfs(graph2, "1", "1"))).toEqual({
    currentNode: "1",
    visitedNodes: "",
    todoNodes: "",
  });
  expect(finalObj(bfs(graph2, "1", "2"))).toEqual({
    currentNode: "2",
    visitedNodes: "1",
    todoNodes: "3",
  });
  expect(finalObj(bfs(graph2, "1", "4"))).toEqual({
    currentNode: "4",
    visitedNodes: "1,2,3",
    todoNodes: "5,6,7",
  });
  expect(finalObj(bfs(graph2, "1", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "1,2,3,4",
    todoNodes: "6,7",
  });
  expect(finalObj(bfs(graph2, "2", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "2,4",
    todoNodes: "6",
  });

  expect(finalObj(bfs(graph2, "1", "11"))).toEqual({
    currentNode: "10",
    visitedNodes: "1,2,3,4,5,6,7,8,9,10",
    todoNodes: "",
  });
  expect(finalObj(bfs(graph2, "1", "100"))).toEqual({
    currentNode: "10",
    visitedNodes: "1,2,3,4,5,6,7,8,9,10",
    todoNodes: "",
  });

  expect(finalObj(bfs(graph2, "3", "5"))).toEqual({
    currentNode: "10",
    visitedNodes: "3,7,8,9,10",
    todoNodes: "",
  });
  expect(finalObj(bfs(graph2, "4", "5"))).toEqual({
    currentNode: "4",
    visitedNodes: "4",
    todoNodes: "",
  });

  expect(finalObj(bfs(graph2, "7", "10"))).toEqual({
    currentNode: "10",
    visitedNodes: "7,8,9",
    todoNodes: "",
  });
  expect(finalObj(bfs(graph2, "7", "6"))).toEqual({
    currentNode: "10",
    visitedNodes: "7,8,9,10",
    todoNodes: "",
  });
});

it("Breadth-First Search in inadvisable tree: current, visited and todo final values", () => {
  // graph3
  expect(finalObj(bfs(graph3, "1", "1"))).toEqual({
    currentNode: "1",
    visitedNodes: "",
    todoNodes: "",
  });

  // graph4
  expect(finalObj(bfs(graph4, "1", "1"))).toEqual({
    currentNode: "1",
    visitedNodes: "",
    todoNodes: "",
  });
  expect(finalObj(bfs(graph4, "1", "2"))).toEqual({
    currentNode: "2",
    visitedNodes: "1",
    todoNodes: "",
  });
  expect(finalObj(bfs(graph4, "1", "3"))).toEqual({
    currentNode: "3",
    visitedNodes: "1,2",
    todoNodes: "4",
  });
  expect(finalObj(bfs(graph4, "1", "4"))).toEqual({
    currentNode: "4",
    visitedNodes: "1,2,3",
    todoNodes: "5",
  });
  expect(finalObj(bfs(graph4, "1", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "1,2,3,4",
    todoNodes: "6",
  });

  expect(finalObj(bfs(graph4, "1", "6"))).toEqual({
    currentNode: "6",
    visitedNodes: "1,2,3,4,5",
    todoNodes: "7",
  });
  expect(finalObj(bfs(graph4, "1", "7"))).toEqual({
    currentNode: "7",
    visitedNodes: "1,2,3,4,5,6",
    todoNodes: "8",
  });
  expect(finalObj(bfs(graph4, "1", "8"))).toEqual({
    currentNode: "8",
    visitedNodes: "1,2,3,4,5,6,7",
    todoNodes: "",
  });
  expect(finalObj(bfs(graph4, "3", "8"))).toEqual({
    currentNode: "7",
    visitedNodes: "3,5,7",
    todoNodes: "",
  });
  expect(finalObj(bfs(graph4, "4", "8"))).toEqual({
    currentNode: "8",
    visitedNodes: "4,5,6,7",
    todoNodes: "",
  });

  //graph5
  expect(finalObj(bfs(graph5, "1", "2"))).toEqual({
    currentNode: "2",
    visitedNodes: "1",
    todoNodes: "7",
  });
  expect(finalObj(bfs(graph5, "1", "7"))).toEqual({
    currentNode: "7",
    visitedNodes: "1,2",
    todoNodes: "3,4",
  });
  expect(finalObj(bfs(graph5, "1", "3"))).toEqual({
    currentNode: "3",
    visitedNodes: "1,2,7",
    todoNodes: "4",
  });
  expect(finalObj(bfs(graph5, "1", "6"))).toEqual({
    currentNode: "6",
    visitedNodes: "1,2,7,3,4",
    todoNodes: "5",
  });
  expect(finalObj(bfs(graph5, "3", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "3,1,6,2,7,4",
    todoNodes: "",
  });

  // graph6
  expect(finalObj(bfs(graph6, "1", "20"))).toEqual({
    currentNode: "20",
    visitedNodes: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,21",
    todoNodes: "19",
  });

  expect(finalObj(bfs(graph6, "7", "20"))).toEqual({
    currentNode: "20",
    visitedNodes: "7,11,12,14,15,16,17,18,21",
    todoNodes: "19",
  });
});

it("Breadth-First Search: final node", () => {
  // graph1
  expect(finalObj(bfs(graph1, "1", "5")).currentNode).toEqual("5");
  expect(finalObj(bfs(graph1, "1", "3")).currentNode).toEqual("3");
  expect(finalObj(bfs(graph1, "4", "5")).currentNode).toEqual("4");

  // graph2
  expect(finalObj(bfs(graph2, "1", "5")).currentNode).toEqual("5");
  expect(finalObj(bfs(graph2, "1", "3")).currentNode).toEqual("3");
  expect(finalObj(bfs(graph2, "4", "5")).currentNode).toEqual("4");
  expect(finalObj(bfs(graph2, "3", "5")).currentNode).toEqual("10");
  expect(finalObj(bfs(graph2, "1", "6")).currentNode).toEqual("6");
  expect(finalObj(bfs(graph2, "7", "9")).currentNode).toEqual("9");
});

it("Breadth-First Search in inadvisable tree: final node", () => {
  // graph3
  expect(finalObj(bfs(graph3, "1", "1")).currentNode).toEqual("1");

  //graph4

  expect(finalObj(bfs(graph4, "1", "8")).currentNode).toEqual("8");
  expect(finalObj(bfs(graph4, "3", "8")).currentNode).toEqual("7");
  expect(finalObj(bfs(graph4, "2", "7")).currentNode).toEqual("7");
  expect(finalObj(bfs(graph4, "4", "6")).currentNode).toEqual("6");

  //graph5
  expect(finalObj(bfs(graph5, "1", "7")).currentNode).toEqual("7");
  expect(finalObj(bfs(graph5, "2", "7")).currentNode).toEqual("7");
  expect(finalObj(bfs(graph5, "4", "7")).currentNode).toEqual("5");
  expect(finalObj(bfs(graph5, "3", "6")).currentNode).toEqual("6");
  expect(finalObj(bfs(graph5, "3", "5")).currentNode).toEqual("5");
});

// graph6
expect(finalObj(bfs(graph6, "13", "19")).currentNode).toEqual("19");
expect(finalObj(bfs(graph6, "6", "19")).currentNode).toEqual("19");
expect(finalObj(bfs(graph6, "1", "21")).currentNode).toEqual("21");

it("Depth-First Search: current, visited and todo final values", () => {
  // graph1
  expect(finalObj(dfs(graph1, "1", "1"))).toEqual({
    currentNode: "1",
    visitedNodes: "",
    todoNodes: "",
  });
  expect(finalObj(dfs(graph1, "1", "2"))).toEqual({
    currentNode: "2",
    visitedNodes: "1",
    todoNodes: "3",
  });
  expect(finalObj(dfs(graph1, "1", "4"))).toEqual({
    currentNode: "4",
    visitedNodes: "1,2",
    todoNodes: "5,3",
  });
  expect(finalObj(dfs(graph1, "1", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "1,2,4",
    todoNodes: "3",
  });
  expect(finalObj(dfs(graph1, "2", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "2,4",
    todoNodes: "",
  });

  expect(finalObj(dfs(graph1, "1", "6"))).toEqual({
    currentNode: "3",
    visitedNodes: "1,2,4,5,3",
    todoNodes: "",
  });
  expect(finalObj(dfs(graph1, "1", "100"))).toEqual({
    currentNode: "3",
    visitedNodes: "1,2,4,5,3",
    todoNodes: "",
  });

  expect(finalObj(dfs(graph1, "3", "5"))).toEqual({
    currentNode: "3",
    visitedNodes: "3",
    todoNodes: "",
  });
  expect(finalObj(dfs(graph1, "4", "5"))).toEqual({
    currentNode: "4",
    visitedNodes: "4",
    todoNodes: "",
  });

  // graph2
  expect(finalObj(dfs(graph2, "1", "1"))).toEqual({
    currentNode: "1",
    visitedNodes: "",
    todoNodes: "",
  });
  expect(finalObj(dfs(graph2, "1", "2"))).toEqual({
    currentNode: "2",
    visitedNodes: "1",
    todoNodes: "3",
  });
  expect(finalObj(dfs(graph2, "1", "4"))).toEqual({
    currentNode: "4",
    visitedNodes: "1,2",
    todoNodes: "5,6,3",
  });
  expect(finalObj(dfs(graph2, "1", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "1,2,4",
    todoNodes: "6,3",
  });
  expect(finalObj(dfs(graph2, "2", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "2,4",
    todoNodes: "6",
  });

  expect(finalObj(dfs(graph2, "1", "11"))).toEqual({
    currentNode: "10",
    visitedNodes: "1,2,4,5,6,3,7,8,9,10",
    todoNodes: "",
  });
  expect(finalObj(dfs(graph2, "1", "100"))).toEqual({
    currentNode: "10",
    visitedNodes: "1,2,4,5,6,3,7,8,9,10",
    todoNodes: "",
  });

  expect(finalObj(dfs(graph2, "3", "5"))).toEqual({
    currentNode: "10",
    visitedNodes: "3,7,8,9,10",
    todoNodes: "",
  });
  expect(finalObj(dfs(graph2, "4", "5"))).toEqual({
    currentNode: "4",
    visitedNodes: "4",
    todoNodes: "",
  });

  expect(finalObj(dfs(graph2, "7", "10"))).toEqual({
    currentNode: "10",
    visitedNodes: "7,8,9",
    todoNodes: "",
  });
  expect(finalObj(dfs(graph2, "7", "6"))).toEqual({
    currentNode: "10",
    visitedNodes: "7,8,9,10",
    todoNodes: "",
  });
});

it("Depth-First Search in inadvisable tree: current, visited and todo final values", () => {
  // graph3
  expect(finalObj(dfs(graph3, "1", "1"))).toEqual({
    currentNode: "1",
    visitedNodes: "",
    todoNodes: "",
  });

  // graph4
  expect(finalObj(dfs(graph4, "1", "8"))).toEqual({
    currentNode: "8",
    visitedNodes: "1,2,3,5,7,4,6",
    todoNodes: "",
  });
  expect(finalObj(dfs(graph4, "1", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "1,2,3",
    todoNodes: "4",
  });
  expect(finalObj(dfs(graph4, "2", "7"))).toEqual({
    currentNode: "7",
    visitedNodes: "2,3,5",
    todoNodes: "4",
  });
  expect(finalObj(dfs(graph4, "4", "8"))).toEqual({
    currentNode: "8",
    visitedNodes: "4,5,7,6",
    todoNodes: "",
  });

  // graph5
  expect(finalObj(dfs(graph5, "1", "7"))).toEqual({
    currentNode: "7",
    visitedNodes: "1,2,3,6,4,5",
    todoNodes: "",
  });
  expect(finalObj(dfs(graph5, "2", "7"))).toEqual({
    currentNode: "7",
    visitedNodes: "2,3,1",
    todoNodes: "6,4",
  });
  expect(finalObj(dfs(graph5, "2", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "2,3,1,7,6,4",
    todoNodes: "",
  });
  expect(finalObj(dfs(graph5, "3", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "3,1,2,4",
    todoNodes: "7,6",
  });
  expect(finalObj(dfs(graph5, "7", "5"))).toEqual({
    currentNode: "7",
    visitedNodes: "7",
    todoNodes: "",
  });

  // graph6
  expect(finalObj(dfs(graph6, "1", "20"))).toEqual({
    currentNode: "20",
    visitedNodes: "1,2,4,7,11,14,16,21",
    todoNodes: "17,12,5,3",
  });

  expect(finalObj(dfs(graph6, "1", "21"))).toEqual({
    currentNode: "21",
    visitedNodes: "1,2,4,7,11,14,16",
    todoNodes: "20,17,12,5,3",
  });

  expect(finalObj(dfs(graph6, "1", "13"))).toEqual({
    currentNode: "13",
    visitedNodes: "1,2,4,7,11,14,16,21,20,17,19,12,15,18,5,3,6,8",
    todoNodes: "9,10",
  });

  expect(finalObj(dfs(graph6, "14", "19"))).toEqual({
    currentNode: "19",
    visitedNodes: "14,16,21,20,17",
    todoNodes: "",
  });
});

it("Depth-First Search: final node", () => {
  // graph1
  expect(finalObj(dfs(graph1, "1", "5")).currentNode).toEqual("5");
  expect(finalObj(dfs(graph1, "1", "3")).currentNode).toEqual("3");
  expect(finalObj(dfs(graph1, "4", "5")).currentNode).toEqual("4");

  // graph2
  expect(finalObj(dfs(graph2, "1", "5")).currentNode).toEqual("5");
  expect(finalObj(dfs(graph2, "1", "3")).currentNode).toEqual("3");
  expect(finalObj(dfs(graph2, "4", "5")).currentNode).toEqual("4");
  expect(finalObj(dfs(graph2, "3", "5")).currentNode).toEqual("10");
  expect(finalObj(dfs(graph2, "1", "6")).currentNode).toEqual("6");
  expect(finalObj(dfs(graph2, "7", "9")).currentNode).toEqual("9");
});

it("Depth-First Search in inadvisable tree: final node", () => {
  // graph 3 not possible
  // graph4
  expect(finalObj(dfs(graph4, "1", "7")).currentNode).toEqual("7");
  expect(finalObj(dfs(graph4, "1", "8")).currentNode).toEqual("8");
  expect(finalObj(dfs(graph4, "3", "8")).currentNode).toEqual("7");
  expect(finalObj(dfs(graph4, "2", "6")).currentNode).toEqual("6");

  //graph5
  expect(finalObj(dfs(graph5, "1", "6")).currentNode).toEqual("6");
  expect(finalObj(dfs(graph5, "2", "7")).currentNode).toEqual("7");
  expect(finalObj(dfs(graph5, "2", "5")).currentNode).toEqual("5");
  expect(finalObj(dfs(graph5, "4", "6")).currentNode).toEqual("5");

  // graph6
  expect(finalObj(dfs(graph6, "1", "20")).currentNode).toEqual("20");
  expect(finalObj(dfs(graph6, "7", "21")).currentNode).toEqual("21");
  expect(finalObj(dfs(graph6, "9", "19")).currentNode).toEqual("19");
  expect(finalObj(dfs(graph6, "9", "12")).currentNode).toEqual("20");
});

it("Iterative Deepening Depth-First Search: depth and final node", () => {
  let ans;

  // graph1
  ans = finalObj(iddfs(graph1, "1", "2"));
  expect(ans.currentNode).toEqual("2");
  expect(ans.depth).toEqual(1);

  ans = finalObj(iddfs(graph1, "1", "3"));
  expect(ans.currentNode).toEqual("3");
  expect(ans.depth).toEqual(1);

  ans = finalObj(iddfs(graph1, "1", "4"));
  expect(ans.currentNode).toEqual("4");
  expect(ans.depth).toEqual(2);

  ans = finalObj(iddfs(graph1, "1", "5"));
  expect(ans.currentNode).toEqual("5");
  expect(ans.depth).toEqual(2);

  ans = finalObj(iddfs(graph1, "1", "1"));
  expect(ans.currentNode).toEqual("1");
  expect(ans.depth).toEqual(0);

  ans = finalObj(iddfs(graph1, "4", "4"));
  expect(ans.currentNode).toEqual("4");
  expect(ans.depth).toEqual(0);

  // graph2
  ans = finalObj(iddfs(graph2, "1", "2"));
  expect(ans.currentNode).toEqual("2");
  expect(ans.depth).toEqual(1);

  ans = finalObj(iddfs(graph2, "1", "3"));
  expect(ans.currentNode).toEqual("3");
  expect(ans.depth).toEqual(1);

  ans = finalObj(iddfs(graph2, "1", "4"));
  expect(ans.currentNode).toEqual("4");
  expect(ans.depth).toEqual(2);

  ans = finalObj(iddfs(graph2, "1", "5"));
  expect(ans.currentNode).toEqual("5");
  expect(ans.depth).toEqual(2);

  ans = finalObj(iddfs(graph2, "1", "6"));
  expect(ans.currentNode).toEqual("6");
  expect(ans.depth).toEqual(2);

  ans = finalObj(iddfs(graph2, "1", "7"));
  expect(ans.currentNode).toEqual("7");
  expect(ans.depth).toEqual(2);

  ans = finalObj(iddfs(graph2, "1", "8"));
  expect(ans.currentNode).toEqual("8");
  expect(ans.depth).toEqual(3);

  ans = finalObj(iddfs(graph2, "1", "9"));
  expect(ans.currentNode).toEqual("9");
  expect(ans.depth).toEqual(3);

  ans = finalObj(iddfs(graph2, "1", "10"));
  expect(ans.currentNode).toEqual("10");
  expect(ans.depth).toEqual(4);

  ans = finalObj(iddfs(graph2, "1", "1"));
  expect(ans.currentNode).toEqual("1");
  expect(ans.depth).toEqual(0);

  ans = finalObj(iddfs(graph2, "4", "4"));
  expect(ans.currentNode).toEqual("4");
  expect(ans.depth).toEqual(0);
});

it("Iterative Deepening Depth-First Search in inadvisable tree: depth and final node", () => {
  let ans;
  // graph3

  ans = finalObj(iddfs(graph3, "1", "1"));
  expect(ans.currentNode).toEqual("1");
  expect(ans.depth).toEqual(0);

  // graph4
  ans = finalObj(iddfs(graph4, "1", "8"));
  expect(ans.currentNode).toEqual("8");
  expect(ans.depth).toEqual(4);

  ans = finalObj(iddfs(graph4, "1", "5"));
  expect(ans.currentNode).toEqual("5");
  expect(ans.depth).toEqual(3);

  ans = finalObj(iddfs(graph4, "3", "7"));
  expect(ans.currentNode).toEqual("7");
  expect(ans.depth).toEqual(2);

  ans = finalObj(iddfs(graph4, "2", "4"));
  expect(ans.currentNode).toEqual("4");
  expect(ans.depth).toEqual(1);

  ans = finalObj(iddfs(graph4, "4", "8"));
  expect(ans.currentNode).toEqual("8");
  expect(ans.depth).toEqual(2);

  // graph5
  ans = finalObj(iddfs(graph5, "1", "7"));
  expect(ans.currentNode).toEqual("7");
  expect(ans.depth).toEqual(1);

  ans = finalObj(iddfs(graph5, "2", "7"));
  expect(ans.currentNode).toEqual("7");
  expect(ans.depth).toEqual(3);

  ans = finalObj(iddfs(graph5, "3", "5"));
  expect(ans.currentNode).toEqual("5");
  expect(ans.depth).toEqual(4);

  ans = finalObj(iddfs(graph5, "2", "5"));
  expect(ans.currentNode).toEqual("5");
  expect(ans.depth).toEqual(2);

  // graph6
  ans = finalObj(iddfs(graph6, "1", "20"));
  expect(ans.currentNode).toEqual("20");
  expect(ans.depth).toEqual(7);

  ans = finalObj(iddfs(graph6, "1", "21"));
  expect(ans.currentNode).toEqual("21");
  expect(ans.depth).toEqual(7);

  ans = finalObj(iddfs(graph6, "7", "19"));
  expect(ans.currentNode).toEqual("19");
  expect(ans.depth).toEqual(4);

  ans = finalObj(iddfs(graph6, "9", "20"));
  expect(ans.currentNode).toEqual("20");
  expect(ans.depth).toEqual(5);
});

it("A* Search: f, g scores and final node ", () => {
  //graphLength1, elements1
  expect(finalObj(astar(elements1, graphLength1, "1", "1"))).toEqual({
    currentNode: "1",
    visitedNodes: "1",
    todoNodes: "",
    currentFScore: 0,
    currentGScore: 0,
  });

  expect(finalObj(astar(elements1, graphLength1, "1", "2"))).toEqual({
    currentNode: "2",
    visitedNodes: "1,2",
    todoNodes: "3,4,5",
    currentFScore: 2,
    currentGScore: 2,
  });

  expect(finalObj(astar(elements1, graphLength1, "1", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "1,2,3,5",
    todoNodes: "4",
    currentFScore: 7,
    currentGScore: 7,
  });

  expect(finalObj(astar(elements1, graphLength1, "1", "6"))).toEqual({
    currentNode: "4",
    visitedNodes: "1,2,3,5,4",
    todoNodes: "",
    currentFScore: 14,
    currentGScore: 8,
  });

  //graphLength2 elements2
  expect(finalObj(astar(elements2, graphLength2, "1", "10"))).toEqual({
    currentNode: "10",
    visitedNodes: "1,2,3,5,6,4,7,8,9,10",
    todoNodes: "",
    currentFScore: 19,
    currentGScore: 19,
  });

  expect(finalObj(astar(elements2, graphLength2, "1", "1"))).toEqual({
    currentNode: "1",
    visitedNodes: "1",
    todoNodes: "",
    currentFScore: 0,
    currentGScore: 0,
  });

  expect(finalObj(astar(elements2, graphLength2, "1", "6"))).toEqual({
    currentNode: "6",
    visitedNodes: "1,2,3,6",
    todoNodes: "4,5,7,8,9,10",
    currentFScore: 6,
    currentGScore: 6,
  });

  expect(finalObj(astar(elements2, graphLength2, "1", "100"))).toEqual({
    currentNode: "10",
    visitedNodes: "1,2,3,5,6,4,7,8,9,10",
    todoNodes: "",
    currentFScore: 21,
    currentGScore: 19,
  });
});

it("A* Search in inadvisable tree: f, g scores and final node ", () => {
  //graphLength3, elements3

  expect(finalObj(astar(elements3, graphLength3, "1", "1"))).toEqual({
    currentNode: "1",
    visitedNodes: "1",
    todoNodes: "",
    currentFScore: 0,
    currentGScore: 0,
  });

  //graphLength4, elements4
  expect(finalObj(astar(elements4, graphLength4, "1", "1"))).toEqual({
    currentNode: "1",
    visitedNodes: "1",
    todoNodes: "",
    currentFScore: 0,
    currentGScore: 0,
  });

  expect(finalObj(astar(elements4, graphLength4, "1", "8"))).toEqual({
    currentNode: "8",
    visitedNodes: "1,2,4,6,3,5,7,8",
    todoNodes: "",
    currentFScore: 21,
    currentGScore: 21,
  });

  expect(finalObj(astar(elements4, graphLength4, "3", "7"))).toEqual({
    currentNode: "7",
    visitedNodes: "3,5,7",
    todoNodes: "",
    currentFScore: 5,
    currentGScore: 5,
  });

  expect(finalObj(astar(elements4, graphLength4, "3", "8"))).toEqual({
    currentNode: "7",
    visitedNodes: "3,5,7",
    todoNodes: "",
    currentFScore: 7,
    currentGScore: 5,
  });

  expect(finalObj(astar(elements4, graphLength4, "2", "7"))).toEqual({
    currentNode: "7",
    visitedNodes: "2,4,6,3,5,7",
    todoNodes: "8",
    currentFScore: 10,
    currentGScore: 10,
  });

  //graphLength5, elements5
  expect(finalObj(astar(elements5, graphLength5, "1", "1"))).toEqual({
    currentNode: "1",
    visitedNodes: "1",
    todoNodes: "",
    currentFScore: 0,
    currentGScore: 0,
  });

  expect(finalObj(astar(elements5, graphLength5, "1", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "1,2,3,4,7,5",
    todoNodes: "6",
    currentFScore: 15,
    currentGScore: 15,
  });

  expect(finalObj(astar(elements5, graphLength5, "1", "4"))).toEqual({
    currentNode: "4",
    visitedNodes: "1,2,4",
    todoNodes: "3,5,6,7",
    currentFScore: 5,
    currentGScore: 5,
  });

  expect(finalObj(astar(elements5, graphLength5, "2", "7"))).toEqual({
    currentNode: "7",
    visitedNodes: "2,3,1,4,5,7",
    todoNodes: "6",
    currentFScore: 14,
    currentGScore: 14,
  });

  expect(finalObj(astar(elements5, graphLength5, "3", "5"))).toEqual({
    currentNode: "5",
    visitedNodes: "3,1,2,4,7,5",
    todoNodes: "6",
    currentFScore: 16,
    currentGScore: 16,
  });

  expect(finalObj(astar(elements5, graphLength5, "3", "6"))).toEqual({
    currentNode: "6",
    visitedNodes: "3,1,2,6",
    todoNodes: "4,5,7",
    currentFScore: 9,
    currentGScore: 9,
  });

  //graphLength6, elements6
  expect(finalObj(astar(elements6, graphLength6, "1", "12"))).toEqual({
    currentNode: "12",
    visitedNodes: "1,2,3,5,4,6,7,10,9,8,12",
    todoNodes: "11,13,14,15,16,17,18,19,20,21",
    currentFScore: 39,
    currentGScore: 39,
  });

  expect(finalObj(astar(elements6, graphLength6, "1", "15"))).toEqual({
    currentNode: "15",
    visitedNodes: "1,2,3,5,4,6,7,10,9,8,11,12,13,14,15",
    todoNodes: "16,17,18,19,20,21",
    currentFScore: 66,
    currentGScore: 66,
  });

  expect(finalObj(astar(elements6, graphLength6, "1", "19"))).toEqual({
    currentNode: "19",
    visitedNodes: "1,2,3,5,4,6,7,10,9,8,11,12,13,14,15,18,16,17,19",
    todoNodes: "20,21",
    currentFScore: 126,
    currentGScore: 126,
  });
});
