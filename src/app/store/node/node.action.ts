import { createAction, props } from '@ngrx/store';
import { Node } from './node.state';

// export const loadSelectedTickets = createAction('[Tickets] Load ticket', props<{ id?: string, group?: string, showLoading?: boolean, navigateSubscription?: boolean }>());
export const setParentNodes = createAction('[Nodes] Load parent nodes', props<{ nodes: Node[] }>());