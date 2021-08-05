import combineAlgoObjects from "../utils/combineAlgoObjects";
import { algorithmObject1, algorithmObject2, algorithmObject1c, algorithmObject2c, algorithmObjectShort, algorithmObjectLong, algorithmObjectWords1, algorithmObjectWords2 } from "../testResources/testAlgoObjects";


it("combineAlgoObjects: correctly combine two algorithm objects of the same length", () => {
  expect(combineAlgoObjects(algorithmObject1, algorithmObject2c)).toEqual({
    0: {
      currentNode: "",
      todoNodes: "",
      visitedNodes: "",
    },
    1: {
      currentNode: "1,1c",
      todoNodes: "2,3,2c,3c",
      visitedNodes: "1,1c",
    },
    2: {
      currentNode: "2,2c",
      todoNodes: "3,4,5,4c,5c,3c",
      visitedNodes: "1,2,1c,2c",
    },
    3: {
      currentNode: "3,4c",
      todoNodes: "4,5,6,7,5c,3c",
      visitedNodes: "1,2,3,1c,2c,4c",
    },
    4: {
      currentNode: "4,5c",
      todoNodes: "5,6,7,3c",
      visitedNodes: "1,2,3,4,1c,2c,4c,5c",
    },
    5: {
      currentNode: "5,3c",
      todoNodes: "6,7,6c,7c",
      visitedNodes: "1,2,3,4,5,1c,2c,4c,5c,3c",
    },
    6: {
      currentNode: "6,6c",
      visitedNodes: "1,2,3,4,5,6,1c,2c,4c,5c,3c,6c",
      todoNodes: "7,7c"
    },
    7: {
      currentNode: "7,7c",
      visitedNodes: "1,2,3,4,5,6,1c,2c,4c,5c,3c,6c",
      todoNodes: ","
    },
  });

  expect(combineAlgoObjects(algorithmObject2, algorithmObject1c)).toEqual({
    0: {
      currentNode: "",
      todoNodes: "",
      visitedNodes: "",
    },
    1: {
      currentNode: "1,1c",
      todoNodes: "2,3,2c,3c",
      visitedNodes: "1,1c",
    },
    2: {
      currentNode: "2,2c",
      todoNodes: "4,5,3,3c,4c,5c",
      visitedNodes: "1,2,1c,2c",
    },
    3: {
      currentNode: "4,3c",
      todoNodes: "5,3,4c,5c,6c,7c",
      visitedNodes: "1,2,4,1c,2c,3c",
    },
    4: {
      currentNode: "5,4c",
      todoNodes: "3,5c,6c,7c",
      visitedNodes: "1,2,4,5,1c,2c,3c,4c",
    },
    5: {
      currentNode: "3,5c",
      todoNodes: "6,7,6c,7c",
      visitedNodes: "1,2,4,5,3,1c,2c,3c,4c,5c",
    },
    6: {
      currentNode: "6,6c",
      todoNodes: "7,7c",
      visitedNodes: "1,2,4,5,3,6,1c,2c,3c,4c,5c,6c",
    },
    7: {
      currentNode: "7,7c",
      todoNodes: ",",
      visitedNodes: "1,2,4,5,3,6,1c,2c,3c,4c,5c,6c",
    },
  });
});

it("combineAlgoObjects: correctly combine two algorithm objects of different lengths", () => {
  expect(combineAlgoObjects(algorithmObjectShort, algorithmObjectLong)).toEqual({
    0: {
      currentNode: "",
      todoNodes: "",
      visitedNodes: "",
    },
    1: {
      currentNode: "1,1c",
      todoNodes: "2,3,2c,3c",
      visitedNodes: "1,1c",
    },
    2: {
      currentNode: "2,2c",
      todoNodes: "4,5,3,4c,5c,3c",
      visitedNodes: "1,2,1c,2c",
    },
    3: {
      currentNode: "2,4c",
      todoNodes: "4,5,3,5c,3c",
      visitedNodes: "1,2,1c,2c,4c",
    },
    4: {
      currentNode: "2,5c",
      todoNodes: "4,5,3,3c",
      visitedNodes: "1,2,1c,2c,4c,5c",
    },
    5: {
      currentNode: "2,3c",
      todoNodes: "4,5,3,6c,7c",
      visitedNodes: "1,2,1c,2c,4c,5c,3c",
    },
  });
});

it("combineAlgoObjects: correctly combine two algorithm objects containing word IDs", () => {
  expect(combineAlgoObjects(algorithmObjectWords1, algorithmObjectWords2)).toEqual({
    0: {
      currentNode: "",
      todoNodes: "",
      visitedNodes: "",
    },
    1: {
      currentNode: "Dublin,India",
      todoNodes: "Donegal,Belfast,England,Spain",
      visitedNodes: "Dublin,India",
    },
    2: {
      currentNode: "Donegal,England",
      todoNodes: "Cork,Kerry,Belfast,USA,Kenya,Spain",
      visitedNodes: "Dublin,Donegal,India,England",
    },
  });
});