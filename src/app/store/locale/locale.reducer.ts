import { createReducer, on } from '@ngrx/store';
import * as LocaleAction from './locale.action';
import { LocaleState } from './locale.state';

export const initialState: LocaleState = {
  localeList: undefined,
  selectedLocale: {
    locale: 'en_US',
    label: 'English'
  }
};

export const localeReducer = createReducer(initialState,

  on(LocaleAction.setLocalesList, (state, action) => ({ ...state, localeList: action.locales })),
  on(LocaleAction.setSelectedLocale, (state, action) => ({ ...state, selectedLocale: action.locale })),

);
