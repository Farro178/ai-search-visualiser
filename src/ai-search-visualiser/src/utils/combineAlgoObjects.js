export default function combineAlgoObjects(algorithmObject1, algorithmObject2) {
  const algorithmObject1Length = Object.keys(algorithmObject1).length;
  const algorithmObject2Length = Object.keys(algorithmObject2).length;

  let algorithmObject = {};

  if (algorithmObject1Length && algorithmObject2Length) {
    algorithmObject[0] = { // step 0
      currentNode: "",
      visitedNodes: [].toString(),
      todoNodes: [].toString(),
    };
  
    let i = 1;
    let last1;
    let last2;
    while (i < algorithmObject1Length || i < algorithmObject2Length){ // as long as one object still has more steps before completion
      // store the last step as long as there are new ones in order to maintain the final step of the shorter object
      if (i < algorithmObject1Length) {
        last1 = algorithmObject1[i];
      }
      if (i < algorithmObject2Length) {
        last2 = algorithmObject2[i];
      }
        algorithmObject[i] = { // combine the nodes in both objects
          currentNode: last1.currentNode + "," + last2.currentNode,
          visitedNodes: last1.visitedNodes + "," + last2.visitedNodes,
          todoNodes: last1.todoNodes + "," + last2.todoNodes
        };
      i++;
    }
  }
  return algorithmObject;
}