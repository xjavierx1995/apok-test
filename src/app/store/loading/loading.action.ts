import { createAction } from '@ngrx/store';

export const initLoading = createAction('[Loading] Init loading');
export const stopLoading = createAction('[Loading] Stop loading');