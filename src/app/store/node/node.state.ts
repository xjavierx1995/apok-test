export interface NodeState {
  nodesList: Node[];
  // selectedNode: Node
}

export interface Node {
  id: number;
  parent: number;
  title: string;
}

