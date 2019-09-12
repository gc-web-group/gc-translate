import React, { JSXElementConstructor } from "react";
import TrContext from "./Context";

export default function withTranslate(Component: JSXElementConstructor<any>) {
  return (props: object) => (
    <TrContext.Consumer>
      { (intl) => <Component intl={intl} { ...props } /> }
    </TrContext.Consumer>
  );
}
