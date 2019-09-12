import _get from "lodash.get";
import { IKeyValueString, IListOfDictionaries } from "../types";

type TFnChangeLanguage = (language: string) => void;

export default class Translate {
  public readonly changeLang: TFnChangeLanguage;
  public readonly lang: string;
  constructor(
    lang: string,
    dictionaries: IListOfDictionaries,
    changeLang: TFnChangeLanguage,
  ) {
    const dictionary = dictionaries[lang];

    if (dictionary) {
      Object.keys(dictionary).forEach((property: string) => {
        Object.defineProperty(this.tr, property, { get: () => dictionary[property] });
      });
    }

    this.lang = Object.freeze(lang);
    this.tr = Object.freeze(this.tr);
    this.changeLang = Object.freeze(changeLang);
  }
  public tr = (path: string, options?: IKeyValueString): string | object => {
    const translate = _get(this.tr, path, "");

    if (options && typeof translate === "string") {
      return translate.replace(
        /{([^{}]+)}/g,
        (_: any, option: string) => options[option] || `{${option}}`,
      );
    }

    return translate;
  }
}
