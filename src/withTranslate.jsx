import React from 'react';
import TrContext from './Context';

export default function withTranslate(Component) {
  // eslint-disable-next-line react/display-name
  return props => (
    <TrContext.Consumer>
      { tr => <Component tr={tr} { ...props } /> }
    </TrContext.Consumer>
  );
}
