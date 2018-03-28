// @flow
'use strict';

import React, {Component} from 'react';
import {$Link, $Disabled} from './Submit.styled';
import {origin} from 'client/hosts';
import type {Store} from 'server/reducers/root';
import {connect} from 'react-redux';
import {sendParentData} from '../../widget';

type Props = {
  widgetId: string;
  forwardUrl: string;

  depositAmount: number | string;
  depositTicker: string;

  resultAmount: string;
  resultTicker: string;

  icoAmount: string;
  icoTicker: string;

  service: string;

  children: any;

  disabled: boolean;
};

const mapStateToProps = ({Form, Data}: Store) => ({
  widgetId   : Data.get('widgetId', ''),
  forwardUrl : Data.get('forwardUrl', ''),

  depositAmount : Form.get('depositAmount', 0),
  depositTicker : Form.get('depositTicker', 0),

  resultAmount : Form.get('resultAmount', 0),
  resultTicker : Form.get('resultTicker', 0),

  icoAmount : Form.get('icoAmount', 0),
  icoTicker : Form.get('icoTicker', 0),

  service : Form.get('service', 'changelly'),

  disabled : !Form.get('depositAmount', 0)
  || Form.get('resultPending')
  || Form.get('icoPending')
  || Form.get('error')
  || Form.get('depositError')
  || !Form.get('resultAmount')
  || !Form.get('icoAmount')
  || !Form.get('service'),
});

class Submit extends Component<Props> {

  onClick = () => {
    const data = {
      widgetId      : this.props.widgetId,
      forwardUrl    : this.props.forwardUrl,
      depositAmount : this.props.depositAmount,
      depositTicker : this.props.depositTicker,
      resultAmount  : this.props.resultAmount,
      resultTicker  : this.props.resultTicker,
      icoAmount     : this.props.icoAmount,
      icoTicker     : this.props.icoTicker,
      service       : this.props.service
    };

    sendParentData({
      type : 'submit',
      data,
    });
  };

  render() {

    if (this.props.disabled) {
      return <$Disabled>{this.props.children}</$Disabled>
    }

    if (this.props.widgetId === 'demo') {

      return (
        <$Link href="javascript:void(0)" onClick={this.onClick}>{this.props.children}</$Link>
      );
    }

    return (
      <$Link href={this.generateLink()}>{this.props.children}</$Link>
    );
  }

  generateLink(): string {

    return `${origin}/exchange?id=${this.props.widgetId}` +
      `&url=${encodeURIComponent(this.props.forwardUrl)}` +
      `&da=${this.props.depositAmount}` +
      `&dt=${this.props.depositTicker}` +
      `&ra=${this.props.resultAmount}` +
      `&rt=${this.props.resultTicker}` +
      `&ia=${this.props.icoAmount}` +
      `&it=${this.props.icoTicker}` +
      `&s=${this.props.service}`
  }
}

export default connect(mapStateToProps)(Submit);
