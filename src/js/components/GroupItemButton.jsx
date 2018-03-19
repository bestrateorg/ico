// @flow
'use strict';

import React, {Component} from 'react';
import {$WrapItemButton} from './GroupItem.styled';
import {connect} from 'react-redux';
import {siteURL} from 'constants/url';
import type {Store} from '../reducers/root';

type OriginalProps = {
  fullsize?: boolean;
  children: any;
  disabled?: boolean;
  onClick?: () => void;
  stretch: boolean;
};

type ReduxProps = {
  step: number;

  wallet: string;

  fromAmount: string | number;
  toAmount: string | number;
  fromCurrency: string;
  toCurrency: string;

  service: string;
  partnerId: ?string;
}

type Props = OriginalProps & ReduxProps;

const mapStateToProps = ({UI, Data, Form}: Store): ReduxProps => ({
  step         : UI.get('step', 0),
  // $FlowFixMe
  wallet       : Data.get('wallet', ''),
  // $FlowFixMe
  fromAmount   : Form.get('depositAmount', 0),
  // $FlowFixMe
  toAmount     : Form.get('resultAmount', 0),
  // $FlowFixMe
  fromCurrency : Form.get('depositCurrency', 'btc'),
  // $FlowFixMe
  toCurrency   : Form.get('resultCurrency', 'eth'),
  service      : Form.get('service', 'changelly'),
  partnerId    : Data.get('partnerID', null),
});

class GroupItemText extends Component<Props> {

  onClick = (event: SyntheticEvent<HTMLButtonElement>): void => {
    if (this.props.disabled) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  render() {
    return (
      <$WrapItemButton fullsize={this.props.fullsize} stretch={this.props.stretch}>
        <a href={this.generateLink()} className={this.props.disabled ? 'disabled' : ''} target="_blank"
           onClick={this.onClick}>{this.props.children}</a>
      </$WrapItemButton>
    );
  }

  generateLink(): string {
    if (this.props.disabled) {
      return 'javascript:void(0)';
    }

    const url: string = encodeURIComponent(location.href);
    const wallet: string = encodeURIComponent(this.props.wallet);
    const fromAmount: string | number = this.props.fromAmount;
    const toCurrency: string = this.props.toCurrency;
    const fromCurrency: string = this.props.fromCurrency;
    const toAmount: string | number = this.props.toAmount;
    const service: string | number = this.props.service || 'changelly';
    const partnerId: ?string = this.props.partnerId || null;

    const data = {
      url,
      wallet,
      fromAmount,
      toAmount,
      toCurrency,
      fromCurrency,
      service
    };

    if (partnerId)
      data['partnerId'] = partnerId;

    const code: string = JSON.stringify(data);
    return `${siteURL}?code=${btoa(code)}`;
  }
}

export default connect(mapStateToProps)(GroupItemText);
