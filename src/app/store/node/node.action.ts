import { createAction, props } from '@ngrx/store';
import { Node } from './node.state';

export const loadParentNodesList = createAction('[Nodes] Load parent nodes list');
export const loadNodesList = createAction('[Nodes] Load nodes list');
export const loadNodesListError = createAction('[Nodes] Load nodes list Error', props<{ error: any }>());

export const setSelectedParentId = createAction('[Nodes] Set Selected Parent Id', props<{ id: string }>());
export const setSelectedNode = createAction('[Nodes] Set Selected Node', props<{ node: Node }>());
export const setNodesList = createAction('[Nodes] Set nodes list', props<{ nodes: Node[] }>());

export const createNode = createAction('[Nodes] Create node', props<{ locales: string[] }>());
export const createNodeResult = createAction('[Nodes] Create node Result', props<{ success: boolean }>());

export const deleteNode = createAction('[Nodes] delete node', props<{ nodeId: string }>());
export const deleteNodeResult = createAction('[Nodes] delete node result', props<{ success: boolean, nodeId?: string, error?: any }>());