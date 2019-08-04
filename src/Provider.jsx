import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import TrContext from './Context';

export default class Provider extends Component {
  static propTypes = {
    defaultLanguage: PropTypes.string.isRequired,
    dictionaries: PropTypes.shape().isRequired,
    children: PropTypes.node.isRequired,
  }

  state = {
    language: null,
  }

  componentDidMount() {
    const { dictionaries, defaultLanguage } = this.props;
    const dictionaryOpen = dictionaries[defaultLanguage];

    if (dictionaryOpen) {
      dictionaryOpen().then((dictionary) => {
        this.setState({
          language: defaultLanguage,
          [defaultLanguage]: dictionary,
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { language, ...readDictionaries } = this.state;

    if (prevState.language !== language && !readDictionaries[language]) {
      const dictionaryOpen = this.props.dictionaries[language];

      if (dictionaryOpen) {
        dictionaryOpen().then((dictionary) => {
          this.setState({
            language,
            [language]: dictionary,
          });
        });
      }
    }
  }

  handleChangeLanguage = (language) => {
    const { dictionaries } = this.props;
    const nameDictionaries = Object.keys(dictionaries);

    if (nameDictionaries.includes(language)) {
      this.setState({ language });
    }
  }

  handleGetTranslate = (path, options) => {
    const { language, ...dictionaries } = this.state;
    const dictionary = dictionaries[language];

    return _get(dictionary, path, '').replace(
      /{([^{}]+)}/g,
      (_, option) => options[option] || `{${option}}`,
    );
  }

  render() {
    const { language, ...dictionaries } = this.state;
    const value = {
      dictionary: dictionaries[language] || {},
      getTranslate: this.handleGetTranslate,
      changeLanguage: this.handleChangeLanguage,
    };

    return (
      <TrContext.Provider value={value}>
        { this.props.children }
      </TrContext.Provider>
    );
  }
}
