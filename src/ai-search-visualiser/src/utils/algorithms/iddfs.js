export default function iddfs(graph, start, goal) {
  let max_depth = 1;
  let values;
  let node;
  let algorithmArray = {};
  let count = 0;
  algorithmArray[count] = {currentNode: "", visitedNodes: [].toString(), todoNodes: [].toString(), depth: 0, maxDepth: 0};

  while (true){
    values = depth_bound_dfs(
      graph,
      start,
      goal,
      max_depth,
      algorithmArray,
      count
    );
    node = values[1];
    algorithmArray = values[2];
    count = values[3];

    if (node != null) {
      return algorithmArray;
    }
    max_depth += 1;
  }
}

function depth_bound_dfs(graph, start, goal, max_depth, algorithmArray, count) {
  let todo = [[start, 0]];
  let todoNoDepth = [];
  let visited = [];
  let depth;
  let current;
  let child;
  let children;
  let lenChildren;
  let i;

  while (todo.length > 0) {
    let currentAndDepth = todo.shift();
    todoNoDepth.shift(); // for visualising - depth not needed

    current = currentAndDepth[0];
    depth = currentAndDepth[1];
    let originalDepth = depth;

    if (current === goal) {
      algorithmArray[count + 1] = {
        currentNode: current,
        visitedNodes: visited.toString(),
        todoNodes: todoNoDepth.toString(),
        depth: originalDepth,
        maxDepth: max_depth
      };
      return [depth, current, algorithmArray, count]; //success
    } else if (depth <= max_depth) {
      visited.push(current);
      if (depth < max_depth) {
        depth += 1;
        children = graph[current];
        lenChildren = children.length;
        i = lenChildren - 1;
        while (i >= 0) {
          child = children[i];
          if (visited.includes(child) === false) {
            todo.unshift([child, depth]);
            todoNoDepth.unshift(child);
          }
          i -= 1;
        }
      }
    }
    count += 1;
    algorithmArray[count] = {
      currentNode: current,
      visitedNodes: visited.toString(),
      todoNodes: todoNoDepth.toString(),
      depth: originalDepth,
      maxDepth: max_depth
    };
  }
  return [depth, null, algorithmArray, count]; // fail
};