import { ActionReducerMap } from '@ngrx/store';
import { NodeState } from './node/node.state';
import { nodeReducer } from './node/node.reducer';
import { NodeEffects } from './node/node.effects';
import { LocaleState } from './locale/locale.state';
import { localeReducer } from './locale/locale.reducer';
import { LoadingState } from './loading/loading.state';
import { loadingReducer } from './loading/loading.reducer';

export interface AppState {
  node: NodeState;
  locale: LocaleState;
  loading: LoadingState;
}

export const appReducers: ActionReducerMap<AppState> = {
  node: nodeReducer,
  locale: localeReducer,
  loading: loadingReducer
};

export const AppEffects = [
  NodeEffects
];
