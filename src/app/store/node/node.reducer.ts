import { createReducer, on } from '@ngrx/store';
import * as NodeActions from './node.action';
import { NodeState } from './node.state';

export const initialState: NodeState = {
   nodesList: undefined,
   selectedParentId: undefined,
   selectedNode: undefined,
};

export const nodeReducer = createReducer(initialState,

  on(NodeActions.setNodesList, (state, action) => ({ ...state, nodesList: action.nodes })),
  on(NodeActions.setSelectedParentId, (state, action) => ({ ...state, selectedParentId: action.id })),
  on(NodeActions.setSelectedNode, (state, action) => ({ ...state, selectedNode: action.node })),
  on(NodeActions.deleteNodeResult, (state, action) => {
    if (action.success) {
      return {
        ...state,
        nodesList: state.nodesList.filter(n => n.id !== action.nodeId)
      };
    }
    return { 
      ...state, 
    };
  }),
);
