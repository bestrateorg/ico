// @flow
'use strict';

import React, {Component} from 'react';
import {WrapColumnAmount, $WrapColumnDeposit, $WrapError, WrapColumnResult, $Wrapper} from 'containers/Wrapper.styled';
import type {Store} from '../reducers/root';
import {connect} from 'react-redux';
import Amount from 'containers/Amount';
import Deposit from 'containers/Deposit';
import Result from 'containers/Result';

import styled from 'styled-components';

const $Logo = styled.a.attrs({
  href   : 'https://bestrate.org',
  target : '_blank',
  title  : 'Go to bestrate.org'
})`
  #bestratewidget & {
    position: absolute !important;
    top: ${props => props.step < 0 ? '17px' : '32px'} !important;
    right: ${props => props.step < 0 ? '13px' : '31px'} !important;
    cursor: pointer !important; 

    > svg {
      width: 80px !important; 
      height: 20px !important;
      opacity: .9 !important;
      
      .logo {
         fill: ${props => props.white ? '#FFFFFF' : '#000000'} !important;
      }
    }
    
    &:hover {
      > svg {
        opacity: 1 !important;
      }
    }
  }
`;

import logo from '../../images/logo.hor.black.svg';
import ErrorString from 'components/ErrorString';

interface Props {
  step: number;
  kind: number;

  depositError: false | string;
}

const mapStateToProps = ({UI, State, Form}: Store) => ({
  step : UI.get('step', 0),
  kind : State.get('kind', 0),

  depositError : Form.get('depositError', false),
});

class WidgetWrapper extends Component<Props> {

  render() {
    const white = this.props.kind === 0 && this.props.step < 2
      || this.props.kind === 1 && this.props.step >= 2;

    return (
      <$Wrapper step={this.props.step}>
        {this.__renderAmount()}
        <$WrapColumnDeposit step={this.props.step} kind={this.props.kind}>
          <Deposit step={this.props.step} submit={this.props.kind === 0}/>
        </$WrapColumnDeposit>
        {this.__renderResult()}
        <$Logo dangerouslySetInnerHTML={{__html : logo}} white={white} step={this.props.step}/>
        {this.__renderError()}
      </$Wrapper>
    );
  }

  __renderAmount() {
    if (this.props.kind === 0) {
      return (
        <WrapColumnAmount step={this.props.step}>
          <Amount step={this.props.step}/>
        </WrapColumnAmount>
      );
    }
    return null;
  }

  __renderResult() {
    if (this.props.kind === 1) {
      return <WrapColumnResult step={this.props.step}>
        <Result step={this.props.step}/>
      </WrapColumnResult>;
    }
    return null;
  }

  __renderError() {
    if (this.props.depositError) {
      return <$WrapError><ErrorString>{this.props.depositError}</ErrorString></$WrapError>
    }
    return null;
  }
}

export default connect(mapStateToProps)(WidgetWrapper);
