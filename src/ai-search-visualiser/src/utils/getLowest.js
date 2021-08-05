// todo[start] = [0, h_score, null];
let heuristic = 1;

export default function getLowest(todo) {
  let lowest;
  Object.keys(todo).forEach(function (node) {
    if (lowest == null) {
      lowest = node;
    } else if (todo[node][heuristic] < todo[lowest][heuristic]) {
      lowest = node;
    }
  });
  return lowest;
}
