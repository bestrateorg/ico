// @flow
'use strict';

import {Map, List} from 'immutable';

import React, {Component} from 'react';
import Layout from 'containers/Layout';
import {$Drop, $DropEmpty, $DropLoader, $DropList} from './DropList.styled';
import DropListSearch from 'components/GroupItemSelect/DropListSearch';
import {LoaderLine} from 'components/Loader';
import {scrollPosition} from 'helpers/scroll';
import type {Currency} from 'api/currency';
import {connect} from 'react-redux';
import DropListItem from 'components/GroupItemSelect/DropListItem';

// import {icon} from 'helpers/currency-icon';

interface Props {
  getWrapper: () => ?HTMLElement;

  pending: boolean;
  currencies: List<Currency>;

  onSelect: (ticker: string) => void;
}

interface State {
  data: Map<string, any>;
}

const mapStateToProps = ({Data}) => ({
  pending    : Data.get('pending', true),
  currencies : Data.get('currencies', List()),
});

class DropList extends Component<Props, State> {

  node: ?HTMLElement;
  search: ?DropListSearch;

  constructor(props: Props) {
    super();

    this.state = {
      data : Map({
        search : '',
        items  : props.currencies
      })
    };
  }

  init(skip?: boolean) {
    const wrapper: ?HTMLElement = this.props.getWrapper();

    if (wrapper) {
      this.position(wrapper);
    } else if (!skip) {
      setTimeout(() => {
        this.init(true);
      }, 10);
    }
  };

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.pending !== nextProps.pending) {
      const search: string = this.state.data.get('search', '').toLowerCase().trim();
      this.setState(({data}) => ({
        data : data.set('items', nextProps.currencies
                                          .filter((item: Currency) =>
                                            !search || item.ticker.indexOf(search) > -1 || item.name.toLowerCase().indexOf(search) > -1)
        )
      }))
    }
  }

  componentDidMount() {
    this.init();
  }

  position(wrapper: HTMLElement) {
    if (this.node) {
      const rect: ClientRect = wrapper.getBoundingClientRect();
      const scrollPos: { top: number, left: number } = scrollPosition();
      // $FlowFixMe
      this.node.setAttribute('style', `display: block !important; top: ${scrollPos.top + rect.top + rect.height}px !important; left: ${scrollPos.left + rect.left}px !important; width: ${rect.width}px !important;`);
      if (this.search) {
        this.search.focus();
      }
    }
  }

  searchChange = (value: string): void => {
    const search: string = value.toLowerCase().trim();
    this.setState(({data}) => ({
      data : data
        .set('search', value)
        .set('items', search
          ? this.props.currencies.filter((item: Currency) =>
            !search || item.ticker.indexOf(search) > -1 || item.name.toLowerCase().indexOf(search) > -1
          )
          : this.props.currencies
        )
    }));
  };

  render() {
    return (
      <Layout>
        <$Drop innerRef={node => this.node = node}>
          <DropListSearch value={this.state.data.get('search', '')}
                          onChange={this.searchChange}
                          ref={node => this.search = node}/>
          {this.__renderList()}
        </$Drop>
      </Layout>
    );
  }

  selectCurrency = (ticker: string): void => {
    this.props.onSelect(ticker);
  };

  __renderList() {
    if (this.props.pending) {
      return <$DropLoader><LoaderLine dark={true} center={true}/></$DropLoader>
    }
    const items: List<Currency> = this.state.data.get('items', List());
    if (items.size === 0) {
      return <$DropEmpty>Nothing found</$DropEmpty>
    }
    return <$DropList>
      {items
        .map((currency: Currency) =>
          <DropListItem key={currency.ticker}
                        onSelect={this.selectCurrency}
                        ticker={currency.ticker}
                        name={currency.name}/>
        ).toArray()}
    </$DropList>;
  }
}

export default connect(mapStateToProps)(DropList);
