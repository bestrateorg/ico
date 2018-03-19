// @flow
'use strict';

import React, {Component} from 'react';
import {List, Map} from 'immutable';
import type {Currency} from 'api/currency';
import {$WrapItemSelect} from './GroupItem.styled';

import svg_arrow from '../../images/arrow.svg';
import DropList from 'components/GroupItemSelect/DropList';

interface Props {
  selected_ticker: string;
  currencies: List<Currency>;
  onSelectCurrency: (ticker: string) => void;
}

interface State {
  open: boolean;
}

let windowWidth: number = window.innerWidth;

class GroupItemSelect extends Component<Props, State> {

  wrap: ?HTMLElement;

  state = {
    open : false,
  };

  componentDidMount() {
    document.addEventListener('click', this.onClick);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick);
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    if (this.state.open) {
      const winW: number = window.innerWidth;
      if (winW === windowWidth) {
        return;
      }
      windowWidth = winW;
      this.close();
    }
  };

  onClick = (event: Event): void => {
    const target = event.target;
    // $FlowFixMe
    if (this.state.open && this.wrap && !this.wrap.contains(target)) {

      const layouts: HTMLElement[] = Array.prototype.slice.call(document.querySelectorAll('div.bestratewidget-layout'));

      // $FlowFixMe
      if (!layouts.some(item => item.contains(target))) {
        this.setState({open : false});
      }
    }

  };

  toggle = (event: SyntheticEvent<HTMLElement>): void => {
    this.setState(({open}) => ({open : !open}));
  };

  open = (): void => {
    if (!this.state.open) {
      this.setState({open : true});
    }
  };

  close = (): void => {
    if (this.state.open) {
      this.setState({open : false});
    }
  };

  render() {
    return [
      <$WrapItemSelect key="button" innerRef={wrap => this.wrap = wrap}
                       onClick={this.toggle}
                       open={this.state.open}
                       className={this.state.open ? 'open' : ''}>
        <span className="brwdgt-cur">{this.props.selected_ticker}</span>
        <span className="brwdgt-ico" dangerouslySetInnerHTML={{__html : svg_arrow}}/>
      </$WrapItemSelect>,
      this.__renderDrop()
    ];
  }

  getParentNode = (): ?HTMLElement => {
    if (!this.wrap) {
      return null;
    }
    // $FlowFixMe
    return this.wrap.parentNode;
  };

  changeCurrency = (ticker: string): void => {
    this.setState({open : false}, () => {
      this.props.onSelectCurrency(ticker);
    })
  };

  __renderDrop() {
    if (this.state.open) {
      return <DropList key="list" onSelect={this.changeCurrency} getWrapper={this.getParentNode}/>
    }
    return null;
  }
}

export default GroupItemSelect;
