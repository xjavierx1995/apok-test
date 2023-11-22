import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocaleState } from './locale.state';

const getLocaleState = createFeatureSelector<LocaleState>('locale');

export const getSelectedLocale = createSelector(getLocaleState, state => state.selectedLocale);