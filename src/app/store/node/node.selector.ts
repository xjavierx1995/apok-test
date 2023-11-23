import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NodeState } from './node.state';

const getNodeState = createFeatureSelector<NodeState>('node');

export const getSelectedParentId = createSelector(getNodeState, state => state.selectedParentId);