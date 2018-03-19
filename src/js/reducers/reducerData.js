// @flow
'use strict';
import {List, Map} from 'immutable';
import {DATA_FETCH, DATA_INIT} from 'constants/types';
import type {Currency} from 'api/currency';
import type {FormActionInitData} from './reducerForm';

const initialState = Map({
  pending    : true,
  currencies : List(),

  exclude     : '',
  wallet      : '',
  renderBonus : false,
  bonus       : List(),
  partnerID   : null,
});

export type DataStore = Map<string, any>;

export type DataActionFetch = {
  type: typeof DATA_FETCH;

  currencies: Array<Currency>;
  default: string;
  result?: number;
}

type Action = DataActionFetch | FormActionInitData;

export default function (state: DataStore = initialState, action: Action): DataStore {
  switch (action.type) {
    case DATA_INIT:
      return state
        .set('wallet', action.wallet)
        .set('partnerID', action.partnerID || null)
        .set('renderBonus', action.bonus && Array.isArray(action.bonus) && action.bonus.length > 0)
        .set('exclude', action.currency_ticker || 'eth')
        .set('bonus', List(action.bonus))
        .update((st: DataStore): DataStore => {
          if (st.get('currencies', List()).size === 0)
            return st;
          return st.update('currencies', (currencies: List<Currency>) => currencies.filter((currency: Currency) => {
            if (!exclude)
              return true;
            return currency.ticker !== (action.currency_ticker || 'eth');
          }));
        });
    case DATA_FETCH:
      const exclude: string = state.get('exclude', '');
      return state
        .set('pending', false)
        .set('currencies', List(action.currencies)
          .filter((currency: Currency) => {
            if (!exclude)
              return true;
            return currency.ticker !== exclude;
          })
          .map((currency: Currency) => {
            return {
              ticker : currency.ticker.toLowerCase(),
              name   : currency.name
            }
          })
          .sort((curA: Currency, curB: Currency) => {
            if (curA.ticker > curB.ticker) {
              return 1;
            } else if (curA.ticker < curB.ticker) {
              return -1;
            }
            return 0;
          }));
    default:
      return state;
  }
}
