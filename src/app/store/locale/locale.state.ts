export interface LocaleState{
  localeList: Ilocale[];
  selectedLocale: Ilocale;
}

export interface Ilocale {
  locale: string;
  label: string;
}