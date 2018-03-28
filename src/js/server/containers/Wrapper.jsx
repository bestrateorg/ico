// @flow
'use strict';

import React, {Component} from 'react';
import {$Wrapper, $WrapperDeposit, $WrapperResult, $Logo, $Error} from './Wrapper.styled';
import Deposit from 'server/containers/Deposit';
import type {Store} from 'server/reducers/root';
import {connect} from 'react-redux';
import Result from 'server/containers/Result';
import logo from '../../../images/logo.hor.black.svg';
import {sendParentData} from '../../widget';

type Props = {
  step: number;
  updated: boolean;

  error: boolean;
  errorMessage: string;
};

const mapStateToProps = ({UI, Data, Form}: Store) => ({
  step    : UI.get('step'),
  updated : UI.get('updated', false) ? 'true' : 'false' + Data.get('bonus', ''),

  error        : Form.get('error', false),
  errorMessage : Form.get('errorMessage', ''),
});

class Wrapper extends Component<Props> {

  node: ?HTMLElement;
  height: ?number;

  componentDidMount() {
    this.sendHeight();
  }

  componentDidUpdate() {
    this.sendHeight();
  }

  sendHeight() {
    if (this.node) {
      const height: number = this.node.offsetHeight;
      if (height === this.height)
        return;
      this.height = height;
      sendParentData({
        type   : 'resize',
        height : height
      });
    }
  }

  render() {
    return (
      <$Wrapper innerRef={node => this.node = node}>
        <$WrapperDeposit step={this.props.step}>
          <Deposit step={this.props.step}/>
        </$WrapperDeposit>
        <$WrapperResult step={this.props.step}>
          <Result step={this.props.step}/>
        </$WrapperResult>
        <$Logo dangerouslySetInnerHTML={{__html : logo}} white={this.props.step >= 2} step={this.props.step}/>
        {this.__renderError()}
      </$Wrapper>
    );
  }

  __renderError() {
    if (this.props.error) {
      return (<$Error><span>{this.props.errorMessage}</span></$Error>);
    }
    return null
  }
}

export default connect(mapStateToProps)(Wrapper);
