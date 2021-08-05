import getHeuristic from "../getHeuristic";
import getLowest from "../getLowest";

let gScore = 0;
let fScore = 1;
let previous = 2;
const _ = require("lodash");

export default function astar(elements, graph, start, goal) {
  let visited = {};
  let visitedList = [];
  let todo = {};
  let current;
  let newgScore;
  let algorithmObject = {};
  let count = 0;
  let i = 0;
  let childList = [start];
  let currentFScore = 0;
  let currentGScore = 0;
  algorithmObject[count] = {
    currentNode: "",
    visitedNodes: [].toString(),
    todoNodes: [].toString(),
    currentFScore: "",
    currentGScore: "",
  };

  todo[start] = [Infinity, Infinity, null];
  if (childList[0] === goal) {
    i = childList.length;
  }

  // Adds all nodes connected to start node to todo list
  while (i < childList.length) {
    Object.keys(graph[childList[i]]).forEach(function (node) {
      if (childList.indexOf(node) === -1) {
        childList.push(node).toString();
        todo[node] = [Infinity, Infinity, null];
      }
    });
    i++;
  }

  let heuristic = getHeuristic(start, elements, goal);
  todo[start] = [0, heuristic, null];
  let completed = false;
  while (completed === false) {
    if (todo.length === 0) {
      completed = true;
    } else {
      current = getLowest(todo);
      currentFScore = todo[current][fScore];
      currentGScore = todo[current][gScore];
      // if goal has been reached
      if (current === goal) {
        visited[current] = todo[current];
        visitedList.push(current);
        delete todo[current];
        algorithmObject[count + 1] = {
          currentNode: current,
          visitedNodes: visitedList.toString(),
          todoNodes: Object.keys(todo).toString(),
          currentFScore: currentFScore,
          currentGScore: currentGScore,
        };
        completed = true;
      } else {
        for (let child in graph[current]) {
          if (!(child in visited)) {
            newgScore = todo[current][gScore] + graph[current][child];
            if (newgScore < todo[child][gScore]) {
              todo[child][gScore] = newgScore;
              todo[child][fScore] =
                newgScore + getHeuristic(child, elements, goal);
              todo[child][previous] = current;
            }
          }
        }
        visited[current] = todo[current];
        visitedList.push(current);
        delete todo[current];
        algorithmObject[count + 1] = {
          currentNode: current,
          visitedNodes: visitedList.toString(),
          todoNodes: Object.keys(todo).toString(),
          currentFScore: currentFScore,
          currentGScore: currentGScore,
        };
        // if the node is not in the tree.
        if (_.isEmpty(todo)) {
          completed = true;
        }
        count = count + 1;
      }
    }
  }
  return algorithmObject;
}
