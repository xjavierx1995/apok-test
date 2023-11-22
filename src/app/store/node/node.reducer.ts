import { createReducer, on } from '@ngrx/store';
import * as NodeActions from './node.action';
import { NodeState } from './node.state';

export const initialState: NodeState = {
   nodesList: undefined,
   selectedParentId: undefined
  //  selectedNode: undefined
};

export const nodeReducer = createReducer(initialState,

  on(NodeActions.setNodesList, (state, action) => ({ ...state, nodesList: action.nodes })),
  on(NodeActions.setSelectedParentId, (state, action) => ({ ...state, selectedParentId: action.id })),
  // on(NodeActions.loadNodesList, (state) => ({ ...state, nodesList: initialState.nodesList })),
  // on(NodeActions.setSelectedNode, (state, action) => ({ ...state, selectedNode: action.node })),

);
