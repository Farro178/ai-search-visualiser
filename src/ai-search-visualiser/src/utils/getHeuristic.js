import { isNode } from "react-flow-renderer";
/*
Returns the h(n) value input into the node
If the node is the goal node, 0 is returned instead of the value set.
*/
export default function getHeuristic(node, elements, goal) {
  let len = elements.length;
  let i = 0;
  while (i < len) {
    let element = elements[i];
    if (isNode(element) & (element["id"] === node)) {
      if (element["id"] === goal) {
        return 0;
      } else {
        return parseInt(element.data["value"]);
      }
    }
    i++;
  }
}
