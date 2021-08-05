import { getIncomers } from "react-flow-renderer";
// Returns true if the target node already has a parent

export default function alreadyHasParent(target, elements) {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (element["id"] === target) {
      if (getIncomers(element, elements).length) {
        // node already has parents
        return true;
      } else {
        return false;
      }
    }
  }

  return false;
}
