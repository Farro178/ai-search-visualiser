const algorithmObject1 = {
  0: {
    currentNode: "",
    todoNodes: "",
    visitedNodes: "",
  },
  1: {
    currentNode: "1",
    todoNodes: "2,3",
    visitedNodes: "1",
  },
  2: {
    currentNode: "2",
    todoNodes: "3,4,5",
    visitedNodes: "1,2",
  },
  3: {
    currentNode: "3",
    todoNodes: "4,5,6,7",
    visitedNodes: "1,2,3",
  },
  4: {
    currentNode: "4",
    todoNodes: "5,6,7",
    visitedNodes: "1,2,3,4",
  },
  5: {
    currentNode: "5",
    todoNodes: "6,7",
    visitedNodes: "1,2,3,4,5",
  },
  6: {
    currentNode: "6",
    todoNodes: "7",
    visitedNodes: "1,2,3,4,5,6",
  },
  7: {
    currentNode: "7",
    todoNodes: "",
    visitedNodes: "1,2,3,4,5,6",
  },
};

const algorithmObject2 = {
  0: {
    currentNode: "",
    todoNodes: "",
    visitedNodes: "",
  },
  1: {
    currentNode: "1",
    todoNodes: "2,3",
    visitedNodes: "1",
  },
  2: {
    currentNode: "2",
    todoNodes: "4,5,3",
    visitedNodes: "1,2",
  },
  3: {
    currentNode: "4",
    todoNodes: "5,3",
    visitedNodes: "1,2,4",
  },
  4: {
    currentNode: "5",
    todoNodes: "3",
    visitedNodes: "1,2,4,5",
  },
  5: {
    currentNode: "3",
    todoNodes: "6,7",
    visitedNodes: "1,2,4,5,3",
  },
  6: {
    currentNode: "6",
    todoNodes: "7",
    visitedNodes: "1,2,4,5,3,6",
  },
  7: {
    currentNode: "7",
    todoNodes: "",
    visitedNodes: "1,2,4,5,3,6",
  },
};

const algorithmObject1c = {
  0: {
    currentNode: "",
    todoNodes: "",
    visitedNodes: "",
  },
  1: {
    currentNode: "1c",
    todoNodes: "2c,3c",
    visitedNodes: "1c",
  },
  2: {
    currentNode: "2c",
    todoNodes: "3c,4c,5c",
    visitedNodes: "1c,2c",
  },
  3: {
    currentNode: "3c",
    todoNodes: "4c,5c,6c,7c",
    visitedNodes: "1c,2c,3c",
  },
  4: {
    currentNode: "4c",
    todoNodes: "5c,6c,7c",
    visitedNodes: "1c,2c,3c,4c",
  },
  5: {
    currentNode: "5c",
    todoNodes: "6c,7c",
    visitedNodes: "1c,2c,3c,4c,5c",
  },
  6: {
    currentNode: "6c",
    todoNodes: "7c",
    visitedNodes: "1c,2c,3c,4c,5c,6c",
  },
  7: {
    currentNode: "7c",
    todoNodes: "",
    visitedNodes: "1c,2c,3c,4c,5c,6c",
  },
};

const algorithmObject2c = {
  0: {
    currentNode: "",
    todoNodes: "",
    visitedNodes: "",
  },
  1: {
    currentNode: "1c",
    todoNodes: "2c,3c",
    visitedNodes: "1c",
  },
  2: {
    currentNode: "2c",
    todoNodes: "4c,5c,3c",
    visitedNodes: "1c,2c",
  },
  3: {
    currentNode: "4c",
    todoNodes: "5c,3c",
    visitedNodes: "1c,2c,4c",
  },
  4: {
    currentNode: "5c",
    todoNodes: "3c",
    visitedNodes: "1c,2c,4c,5c",
  },
  5: {
    currentNode: "3c",
    todoNodes: "6c,7c",
    visitedNodes: "1c,2c,4c,5c,3c",
  },
  6: {
    currentNode: "6c",
    todoNodes: "7c",
    visitedNodes: "1c,2c,4c,5c,3c,6c",
  },
  7: {
    currentNode: "7c",
    todoNodes: "",
    visitedNodes: "1c,2c,4c,5c,3c,6c",
  },
};

const algorithmObjectShort = {
  0: {
    currentNode: "",
    todoNodes: "",
    visitedNodes: "",
  },
  1: {
    currentNode: "1",
    todoNodes: "2,3",
    visitedNodes: "1",
  },
  2: {
    currentNode: "2",
    todoNodes: "4,5,3",
    visitedNodes: "1,2",
  },
};

const algorithmObjectLong = {
  0: {
    currentNode: "",
    todoNodes: "",
    visitedNodes: "",
  },
  1: {
    currentNode: "1c",
    todoNodes: "2c,3c",
    visitedNodes: "1c",
  },
  2: {
    currentNode: "2c",
    todoNodes: "4c,5c,3c",
    visitedNodes: "1c,2c",
  },
  3: {
    currentNode: "4c",
    todoNodes: "5c,3c",
    visitedNodes: "1c,2c,4c",
  },
  4: {
    currentNode: "5c",
    todoNodes: "3c",
    visitedNodes: "1c,2c,4c,5c",
  },
  5: {
    currentNode: "3c",
    todoNodes: "6c,7c",
    visitedNodes: "1c,2c,4c,5c,3c",
  },
};

const algorithmObjectWords1 = {
  0: {
    currentNode: "",
    todoNodes: "",
    visitedNodes: "",
  },
  1: {
    currentNode: "Dublin",
    todoNodes: "Donegal,Belfast",
    visitedNodes: "Dublin",
  },
  2: {
    currentNode: "Donegal",
    todoNodes: "Cork,Kerry,Belfast",
    visitedNodes: "Dublin,Donegal",
  },
};

const algorithmObjectWords2 = {
  0: {
    currentNode: "",
    todoNodes: "",
    visitedNodes: "",
  },
  1: {
    currentNode: "India",
    todoNodes: "England,Spain",
    visitedNodes: "India",
  },
  2: {
    currentNode: "England",
    todoNodes: "USA,Kenya,Spain",
    visitedNodes: "India,England",
  },
};

export {
  algorithmObject1,
  algorithmObject2,
  algorithmObject1c,
  algorithmObject2c,
  algorithmObjectShort,
  algorithmObjectLong,
  algorithmObjectWords1,
  algorithmObjectWords2,
};