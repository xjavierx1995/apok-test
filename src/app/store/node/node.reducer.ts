import { createReducer, on } from '@ngrx/store';
import { setParentNodes } from './node.action';
import { NodeState } from './node.state';

export const initialState: NodeState = {
   parentNodes: undefined,
   selectedNode: undefined
};

export const nodeReducer = createReducer(initialState,

  on(setParentNodes, (state, action) => ({ ...state, parentNodes: action.nodes })),

);
