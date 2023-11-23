import { createReducer, on } from '@ngrx/store';
import * as LoadingAction from './loading.action';
import { LoadingState } from './loading.state';
import * as NodeActions from '../node/node.action';
import * as LocaleActions from '../locale/locale.action';

export const initialState: LoadingState = {
   isLoading: false
};

export const loadingReducer = createReducer(initialState,

    on(LoadingAction.initLoading,
      NodeActions.loadNodesList,
      LocaleActions.setSelectedLocale,
      NodeActions.deleteNode,
      state => ({ ...state, isLoading: true })),
    on(LoadingAction.stopLoading,
      NodeActions.setNodesList,
      NodeActions.loadNodesListError,
      NodeActions.deleteNodeResult,
      state => ({ ...state, isLoading: false })),

);
