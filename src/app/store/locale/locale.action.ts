import { createAction, props } from '@ngrx/store';
import { Ilocale } from './locale.state';

export const loadLocales = createAction('[Locale] Load locale list');
export const setLocalesList = createAction('[Locale] Set locales list', props<{ locales: Ilocale[] }>());
export const setSelectedLocale = createAction('[Locale] Set selected locale', props<{ locale: Ilocale }>());