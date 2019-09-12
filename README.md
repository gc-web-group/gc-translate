# gc-translate
Internationalize [React][] apps.
This library provides React components and an API to handling translations.


## Install
```bash
$ npm install gc-translate
# or
$ yarn add gc-translate
```


## Example
lang/en.json
```json
{
  "title": "My application",
  "Main": {
    "info": "Hello world",
    "example": "Example {num}"
  }
}
```

lang/ru.json
```json
{
  "title": "Моё приложение",
  "Main": {
    "info": "Привет мир",
    "example": "Пример {num}"
  }
}
```

Main.jsx
```jsx
import React, { Compenent } from 'react'
import { withTranslate } from 'gc-translate'

@withTranslate
export default class Main extends Compenent {
  render () {
    const { intl } = this.props

    return (
      <h1>{ intl.tr.title }</h1>
      <h2>{ intl.tr('Main.example', { num: 1 }) }</h2>
      <p>{ intl.tr(['Main', 'info']) }</p>
      <div>
        <button onClick={() => { intl.changeLang('en') }}>En</button>
        <button onClick={() => { intl.changeLang('ru') }}>Ru</button>
      </div>
    )
  }
}
```

index.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { TrProvider } from 'gc-translate'
import Main from 'Main';

ReactDOM.render(
  <TrProvider
    defaultLang='en'
    dictionaries={{
      en: () => import('./lang/en.json'),
      ru: () => import('./lang/ru.json'),
    }}
  >
    <Main />
  <TrProvider/>,
  document.getElementById('root'),
)
```


***
## API


### `TrProvider`
Provides the translation data for descendant components.
```jsx
import { TrProvider } from 'gc-translate'
```
```xml
<TrProvider
  defaultLang={string}
  dictionaries={object}
>
  {/* render something */}
<TrProvider/>
```

#### Properties
*defaultLang* (**required**) - default language from the dictionaries list

*dictionaries* (**required**) - list of connected json files or objects with translations ([Dictionary](#dictionary))
```js
{
  en: () => import('lang/en.json'),
  ru: () => import('lang/ru.json'),
}
```
or
```js
{
  en: { /* Object with translations */ },
  ru: { /* Object with translations */ },
}
```


### `TrConsumer`
A React component that subscribes to context changes. This lets you subscribe to a context within a function component.
```jsx
import { TrConsumer } from 'gc-translate'
```
```xml
<TrConsumer>
  {value => /* render something based on the context value */}
<TrConsumer/>
```

#### Function arguments
*value* - [context object](#context) with translations and handling translations


### `withTranslate`
Provides the translation data for descendant components.
```jsx
import { withTranslate } from 'gc-translate'
```
```jsx
@withTranslate
class Page extends Compenent {
  render () {
    const { intl } = this.props;

    /* render something based on the context value */
  }
}
```

#### Props
*intl* - [context object](#context) with translations and handling translations


### `TrContext`
The `contextType` property on a class can be assigned a `TrContext`. This lets you consume the nearest current value of `TrContext` using this.context. You can reference this in any of the lifecycle methods including the render function.
```jsx
import TrContext from 'gc-translate'
```
```jsx
class Page extends Compenent {
  static contextType = TrContext;

  render () {
    const {
      tr,
      lang,
      changeLang,
    } = this.context;

    /* render something based on the context value */
  }
}
```


### Context

#### `lang`
The value of the current language

#### `tr`
Object with translations [dictionary](#dictionary)

#### `tr(path[, options])`
Function for translation

**Arguments:**

*path* (**required**) - path of object [dictionary](#dictionary)

*options* - object options for replace in value at path of dictionary

#### `changeLang(newLanguage)`
Function for changing the current language

### Dictionary
Data with translations

**Example:**
```json
{
  "title": "My application",
  "Main": {
    "info": "Hello world",
    "example": "Example {num}"
  }
}
```

## License
This software is free to use under the MIT license.
See the [LICENSE file][] for license text and copyright information.


[react]: http://facebook.github.io/react/
[license file]: https://github.com/gc-web-group/gc-translate/blob/master/LICENSE
