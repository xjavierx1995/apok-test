import { createAction, props } from '@ngrx/store';
import { Node } from './node.state';

export const loadParentNodesList = createAction('[Nodes] Load parent nodes list');
export const loadNodesList = createAction('[Nodes] Load nodes list');
export const loadNodesListError = createAction('[Nodes] Load nodes list Error', props<{ error: any }>());
export const setSelectedParentId = createAction('[Nodes] Set Selected Parent Id', props<{ id: string }>());
export const setNodesList = createAction('[Nodes] Set nodes list', props<{ nodes: Node[] }>());