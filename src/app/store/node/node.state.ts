export interface NodeState {
  parentNodes: Node[];
  selectedNode: Node
}

export interface Node {
  id: number;
  parent: number;
  title: string;
}

