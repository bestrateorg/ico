// @flow
'use strict';

import React, {Component} from 'react';
import {$WrapSearch} from './DropListSearch.styled';

import search from '../../../images/search.svg';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

class DropListSearch extends Component<Props> {

  field: ?HTMLInputElement;

  focus() {
    if (this.field) {
      this.field.focus();
    }
  }

  onChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    this.props.onChange(event.currentTarget.value);
  };

  render() {
    return (
      <$WrapSearch>
        <input type="text"
               value={this.props.value}
               onChange={this.onChange}
               placeholder="Start Typing"
               ref={node => this.field = node}/>
        <span dangerouslySetInnerHTML={{__html : search}}/>
      </$WrapSearch>
    );
  }
}

export default DropListSearch;
