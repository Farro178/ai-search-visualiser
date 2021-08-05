import getLowest from "../utils/getLowest";

const todo1 = {
  1: [0, 10, null],
  2: [Infinity, Infinity, null],
  3: [Infinity, Infinity, null],
  4: [Infinity, Infinity, null],
  5: [Infinity, Infinity, null],
};

const todo2 = {
  1: [0, 10, null],
  2: [1, 15, null],
  3: [1, 20, null],
  4: [2, 6, null],
  5: [3, 3, null],
};

const todo3 = {
  1: [0, 10, null],
  2: [1, 15, null],
  3: [1, 20, null],
  4: [2, 6, null],
  5: [3, 3, null],
  6: [2, 6, null],
  7: [3, 3, null],
};

const todo4 = {
  1: [0, Infinity, null],
  2: [1, 15, null],
  3: [1, 20, null],
  4: [2, 6, null],
  5: [3, 3, null],
  6: [2, 6, null],
  7: [3, 2, null],
};

const todo5 = {
  1: [0, Infinity, null],
  2: [1, 15, null],
  5: [3, 3, null],
  6: [2, 6, null],
  7: [3, 2, null],
};

it("get lowest", () => {
  expect(getLowest(todo1)).toEqual("1");
  expect(getLowest(todo2)).toEqual("5");
  expect(getLowest(todo3)).toEqual("5");
  expect(getLowest(todo4)).toEqual("7");
  expect(getLowest(todo5)).toEqual("7");
});
