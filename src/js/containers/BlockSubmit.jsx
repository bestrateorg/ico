// @flow
'use strict';

import React, {Component} from 'react';
import GroupBox from 'components/GroupBox';
import Group from 'components/Group';
import GroupItemButton from 'components/GroupItemButton';
import {connect} from 'react-redux';
import type {Store} from '../reducers/root';
import type {Bonus} from '../app';
import {List, Map} from 'immutable';

interface Props {
  step: number;
  className?: string;

  disabled: string;
  bonus?: ?string;

  stretch: boolean;
}

const mapStateToProps = ({UI, Form, Data}: Store) => ({
  step     : UI.get('step'),
  disabled : (!Form.get('depositAmount', 0) || !!Form.get('resultPending', false) || !!Form.get('depositError', false)),
});

class BlockSubmit extends Component<Props> {

  render() {
    return (
      <GroupBox className={this.props.className || ''} bonus={this.calculateBonus()}>
        <Group>
          {this.__renderButton()}
        </Group>
      </GroupBox>
    );
  }

  calculateBonus(): ?string {
    if (!this.props.bonus || this.props.disabled)
      return null;
    return this.props.bonus;
  }

  onSubmit = () => {

  };

  __renderButton() {
    return <GroupItemButton stretch={this.props.stretch} onClick={this.onSubmit}
                            disabled={this.props.disabled}>Pay <span>via BestRate</span></GroupItemButton>;
  }
}

export default connect(mapStateToProps)(BlockSubmit);
