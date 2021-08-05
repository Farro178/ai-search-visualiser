export default function dfs(graph, start, goal) {
  let todo = [start];
  let visited = [];
  let count = 0;
  let algorithmArray = {};
  algorithmArray[count] = {
    currentNode: "",
    visitedNodes: [].toString(),
    todoNodes: [].toString(),
  };

  while (todo.length > 0) {
    let current = todo.shift();

    if (current === goal) {
      algorithmArray[count + 1] = {
        currentNode: current,
        visitedNodes: visited.toString(),
        todoNodes: todo.toString(),
      }; // the final node
      return algorithmArray; // success
    } else {
      visited.push(current);

      let children = graph[current];
      let lenChildren = children.length;
      let i = lenChildren - 1;

      while (i >= 0) {
        if (
          visited.includes(children[i]) === false &&
          todo.includes(children[i]) === false
        ) {
          todo.unshift(children[i]);
        }
        i = i - 1;
      }
      count += 1;
    }
    algorithmArray[count] = {
      currentNode: current,
      visitedNodes: visited.toString(),
      todoNodes: todo.toString(),
    };
  }
  return algorithmArray; // fail
}
