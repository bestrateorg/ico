// @flow
'use strict';

import React, {Component} from 'react';
import GroupBox from 'components/GroupBox';
import Group from 'components/Group';
import GroupItemInput from 'components/GroupItemInput';
import GroupItemText from 'components/GroupItemText';

interface Props {
  className?:string;
}

interface State {
  value: string;
}

class BlockInputAmount extends Component<Props, State> {

  state = {
    value : ''
  };

  render() {
    return (
      <GroupBox title="Amount of tokens" fullsize={true} className={this.props.className||''}>
        <Group>
          <GroupItemInput value={this.state.value}
                          fullsize={true}
                          onChange={(event: SyntheticEvent<HTMLInputElement>) => {
                            this.setState({value : event.currentTarget.value});
                          }}/>
          <GroupItemText text="TON"/>
        </Group>
      </GroupBox>
    );
  }
}

export default BlockInputAmount;
