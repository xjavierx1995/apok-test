import { createAction, props } from '@ngrx/store';
import { Node } from './node.state';

// export const loadSelectedTickets = createAction('[Tickets] Load ticket', props<{ id?: string, group?: string, showLoading?: boolean, navigateSubscription?: boolean }>());
export const setNodesList = createAction('[Nodes] Set nodes list', props<{ nodes: Node[] }>());