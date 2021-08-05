import { isNode } from "react-flow-renderer";
// find x-axis distance from lowest to highest x-values

export default function treeWidth(elements) {
  let lowest = elements[0]["position"]["x"]; // initialise with first node values
  let highest = lowest;

  const elementsLength = elements.length;
  for (let i = 1; i < elementsLength; i++) {
    const element = elements[i];
    if (isNode(element)) {
      let x = element["position"]["x"];

      if (x < lowest) {
        lowest = x;
      }

      if (x > highest) {
        highest = x;
      }
    }
  }
  return highest - lowest;
}
