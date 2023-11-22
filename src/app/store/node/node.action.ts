import { createAction, props } from '@ngrx/store';
import { Node } from './node.state';

// export const loadSelectedTickets = createAction('[Tickets] Load ticket', props<{ id?: string, group?: string, showLoading?: boolean, navigateSubscription?: boolean }>());
export const loadParentNodesList = createAction('[Nodes] Load parent nodes list');
export const loadNodesList = createAction('[Nodes] Load nodes list', props<{ parentId: string }>());
export const loadNodesListError = createAction('[Nodes] Load nodes list Error', props<{ error: any }>());
// export const loadNodesListResult = createAction('[Nodes] Load nodes list Result', props<{  }>());
export const setNodesList = createAction('[Nodes] Set nodes list', props<{ nodes: Node[] }>());