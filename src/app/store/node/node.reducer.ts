import { createReducer, on } from '@ngrx/store';
import * as NodeActions from './node.action';
import { NodeState } from './node.state';

export const initialState: NodeState = {
   nodesList: undefined,
  //  selectedNode: undefined
};

export const nodeReducer = createReducer(initialState,

  on(NodeActions.setNodesList, (state, action) => ({ ...state, nodesList: action.nodes })),
  // on(NodeActions.loadNodesList, (state) => ({ ...state, nodesList: initialState.nodesList })),
  // on(NodeActions.setSelectedNode, (state, action) => ({ ...state, selectedNode: action.node })),

);
