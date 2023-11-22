export interface NodeState {
  nodesList: Node[];
  selectedParentId: string;
  selectedNode: Node;
}

export interface Node {
  id: string;
  parent: string;
  title: string;
  translation?: Translation[];
}

export interface Translation {
  id: number;
  node_id: number;
  locale: string;
  title: string;
}

