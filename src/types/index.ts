export type TFnPromise = () => Promise<any>;

export interface IListOfDictionariesReceived {
  [lang: string]: object | TFnPromise;
}

export interface IDictionary {
  [name: string]: string | object;
}

export interface IListOfDictionaries {
  [lang: string]: IDictionary;
}

export interface IKeyValueString { [key: string]: string; }
