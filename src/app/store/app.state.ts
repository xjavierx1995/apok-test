import { ActionReducerMap } from '@ngrx/store';
import { NodeState } from './node/node.state';
import { nodeReducer } from './node/node.reducer';
import { NodeEffects } from './node/node.effects';
import { LocaleState } from './locale/locale.state';
import { localeReducer } from './locale/locale.reducer';

export interface AppState {
  node: NodeState;
  locale: LocaleState;
}

export const appReducers: ActionReducerMap<AppState> = {
  node: nodeReducer,
  locale: localeReducer
};

export const AppEffects = [
  NodeEffects
];
