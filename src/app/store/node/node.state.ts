export interface NodeState {
  nodesList: Node[];
  // selectedParentId: Node
}

export interface Node {
  id: string;
  parent: string;
  title: string;
}

