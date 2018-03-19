// @flow
'use strict';

import React, {Component} from 'react';
import {$ErrorWrap, $ErrorIcon, $ErrorMessage} from './ErrorString.styled';


interface Props {
  children: string;
}

class ErrorString extends Component<Props> {

  render() {
    return (
      <$ErrorWrap><$ErrorIcon>!</$ErrorIcon><$ErrorMessage>{this.props.children}</$ErrorMessage></$ErrorWrap>
    );
  }
}

export default ErrorString;
