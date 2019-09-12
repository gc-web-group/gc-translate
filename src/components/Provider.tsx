import React, { Component } from "react";
import { IKeyValueString, IListOfDictionaries, IListOfDictionariesReceived, TFnPromise } from "../types";
import Translate from "../utils/translate";
import TrContext from "./Context";

interface IProps {
  defaultLang: string;
  children: JSX.Element;
  dictionaries: IListOfDictionariesReceived;
}

interface IState {
  lang: string;
}

export default class Provider extends Component<IProps, IState> {
  public state = {
    lang: "",
  };

  public componentDidMount() {
    const { dictionaries, defaultLang } = this.props;

    if (dictionaries[defaultLang] instanceof Function) {
      const dictionaryOpen = dictionaries[defaultLang] as TFnPromise;

      dictionaryOpen().then((dictionary: object) => {
        this.setState({
          lang: defaultLang,
          [defaultLang]: dictionary,
        });
      });
    } else if (dictionaries[defaultLang] instanceof Object) {
      const dictionary = dictionaries[defaultLang];

      this.setState({
        lang: defaultLang,
        [defaultLang]: dictionary,
      });
    }
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    const { lang, ...readDictionaries } = this.state;

    if (prevState.lang !== lang && !(readDictionaries as IKeyValueString)[lang]) {
      const { dictionaries } = this.props;

      if (dictionaries[lang] instanceof Function) {
        const dictionaryOpen = dictionaries[lang] as TFnPromise;

        dictionaryOpen().then((dictionary: object) => {
          this.setState({
            lang,
            [lang]: dictionary,
          });
        });
      } else if (dictionaries[lang] instanceof Object) {
        const dictionary = dictionaries[lang];

        this.setState({
          lang,
          [lang]: dictionary,
        });
      }
    }
  }

  public handleChangeLang = (lang: string): void => {
    const { dictionaries } = this.props;
    const { lang: currentLang } = this.state;
    const nameDictionaries = Object.keys(dictionaries);

    if (lang !== currentLang && nameDictionaries.includes(lang)) {
      this.setState({ lang });
    }
  }

  public render() {
    const { lang, ...dictionaries } = this.state;
    const value = new Translate(
      lang,
      (dictionaries as IListOfDictionaries),
      this.handleChangeLang,
    );

    return (
      <TrContext.Provider value={value}>
        { this.props.children }
      </TrContext.Provider>
    );
  }
}
