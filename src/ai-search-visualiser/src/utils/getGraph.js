import { isNode, isEdge } from "react-flow-renderer";

/* Pass through list of elements, generate array containing the ID
of each node with a corresponding array of their children nodes */
export default function getGraph(elements) {
  let graph = [];

  let len = elements.length;
  let i = 0;
  while (i < len) {
    let element = elements[i];
    if (isNode(element)) {
      graph[element["id"]] = [];
    } else if (isEdge(element)) {
      graph[element["source"]].push(element["target"]);
    }
    i++;
  }
  return graph;
}
