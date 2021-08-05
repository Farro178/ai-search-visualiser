export default function bfs(graph, start, goal) {
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
      }; //the final node
      return algorithmArray; // success
    } else {
      visited.push(current);

      let children = graph[current];
      let lenChildren = children.length;
      let i = 0;

      while (i < lenChildren) {
        if (
          visited.includes(children[i]) === false &&
          todo.includes(children[i]) === false
        ) {
          todo.push(children[i]);
        }
        i += 1;
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
