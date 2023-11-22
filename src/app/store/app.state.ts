import { ActionReducerMap } from '@ngrx/store';
import { NodeState } from './node/node.state';
import { nodeReducer } from './node/node.reducer';
import { NodeEffects } from './node/node.effects';

export interface AppState {
  node: NodeState;
}

export const appReducers: ActionReducerMap<any> = {
  node: nodeReducer
};

export const AppEffects = [
  NodeEffects
];
