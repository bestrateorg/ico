// @flow
'use strict';

import React, {Component} from 'react';
import {$BoxItemInput} from './BoxItem.styled';

type Props = {
  value: string | number;
  onChange: (event: SyntheticEvent<HTMLInputElement>) => void;
  placeholder: string;
  textAlign: ('left' | 'center' | 'right');
};

class BoxItemInput extends Component<Props> {

  render() {
    return (
      <$BoxItemInput>
        <input type="text" placeholder={this.props.placeholder}
               style={{textAlign : this.props.textAlign}}
               value={this.props.value} onChange={this.props.onChange}/>
      </$BoxItemInput>
    );
  }
}

export default BoxItemInput;
