import { isNode, isEdge } from "react-flow-renderer";

/* Pass through list of elements, generate object containing the ID
of each node with a corresponding object of their children nodes and distance */

export default function getGraphLengths(elements) {
  let graph = {};
  let target;
  let source;
  let distance;
  let len = elements.length;
  let i = 0;
  while (i < len) {
    let element = elements[i];
    let innergraph = {};
    if (isNode(element)) {
      graph[element["id"]] = {};
    } else if (isEdge(element)) {
      source = element["source"];
      target = element["target"];
      distance = parseInt(element.data["value"]);
      innergraph[target] = distance;
      Object.assign(graph[source], innergraph);
    }
    i++;
  }
  return graph;
}
