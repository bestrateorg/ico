// @flow
'use strict';

import React, {Component} from 'react';
import Block from 'components/Block';
import BlockOutputAmount from 'containers/BlockOutputAmount';
import BlockRatio from 'containers/BlockRatio';
import BlockSubmit from 'containers/BlockSubmit';
import {connect} from 'react-redux';
import type {Store} from '../reducers/root';
import type {Bonus} from '../app';
import {List} from 'immutable';
import BlockBonus from 'containers/BlockBonus';

interface Props {
  step: number;
  renderBonus: boolean;

  bonus: List<Bonus>;
  amount: number;
  ticker: string;
}

const mapStateToProps = ({Data, Form}: Store) => ({
  renderBonus : Data.get('renderBonus', false),
  bonus       : Data.get('bonus', List()),
  amount      : parseFloat(Form.get('resultAmount', 0)),
  ticker      : Form.get('icoCurrency', ''),
});

class Result extends Component<Props> {

  render() {
    return (
      <Block row={this.props.step > 0} className="brw_result">
        <div className="brw_group">
          {/*<BlockRatio className="brw_ratio"/>*/}
          <BlockOutputAmount className="brw_amount"/>
        </div>
        {this.__renderSubmit()}
      </Block>
    );
  }

  __renderSubmit() {
    const bonus: ?string = this.calculateBonusForSubmit();
    if (this.props.step > 1 || !bonus) {
      return <BlockSubmit className="brw_submit" bonus={bonus} stretch={this.props.step < 1}/>
    }
    return (
      <div className="brw_bonus_group">
        <BlockBonus className="brw_bonus">{bonus}</BlockBonus>
        <BlockSubmit className="brw_submit" stretch={true}/>
      </div>
    );
  }

  calculateBonusForSubmit() {
    if (this.props.renderBonus) {
      const bonus: ?Bonus = this.props.bonus.find((item: Bonus) => {
        if (this.props.amount >= item.from) {
          if (!item.to)
            return true;
          return this.props.amount < item.to;
        }
        return false;
      });
      if (bonus) {
        return `+${bonus.percent}% ${this.props.step > 2 || this.props.step === 0 ? this.props.ticker.toUpperCase() : ''}`;
      }
      return null;
    }
    return null;
  }
}

export default connect(mapStateToProps)(Result);
