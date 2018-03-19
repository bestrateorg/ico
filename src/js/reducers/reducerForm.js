// @flow
'use strict';

import {Map} from 'immutable';
import {
  DATA_FETCH, DATA_INIT,
  FORM_CHANGE_DEPOSIT_AMOUNT, FORM_CHANGE_DEPOSIT_CURRENCY,
  FORM_ERROR_DEPOSIT,
  FORM_FETCH_RESULT_AMOUNT,
  FORM_INIT
} from 'constants/types';
import type {DataActionFetch} from './reducerData';
import type {Settings} from '../app';

const initialState = Map({
  depositAmount   : '',
  depositCurrency : '',
  depositError    : false,

  resultAmount   : '',
  resultCurrency : '',
  resultPending  : false,

  icoAmount   : '',
  icoCurrency : '',
  icoRatio    : 1, // resultCurrency / icoCurrency

  service : 'changelly',
});

export type FormStore = Map<string, any>;

export type FormActionInit = {
  type: typeof FORM_INIT;

  depositAmount: ?string | number;
  depositCurrency: ?string;

  resultCurrency: ?string;

  icoCurrency: string;
  icoRatio: number; // 1 ICO = ? ETH
}

export type FormActionChangeDepositAmount = {
  type: typeof FORM_CHANGE_DEPOSIT_AMOUNT;
  value: number | string;
  pending: boolean;
}

export type FormActionFetchResultAmount = {
  type: typeof FORM_FETCH_RESULT_AMOUNT;
  value: number | string;
  service: string;
  icoValue?: number | string;
}

export type FormActionErrorDeposit = {
  type: typeof FORM_ERROR_DEPOSIT;
  message: string;
}

export type FormActionChangeDepositCurrency = {
  type: typeof FORM_CHANGE_DEPOSIT_CURRENCY;
  ticker: string;
  pending: boolean;
}

export type FormActionInitData = Settings & { type: typeof DATA_INIT };

type Action =
  FormActionInit
  | FormActionErrorDeposit
  | FormActionInitData
  | FormActionChangeDepositAmount
  | FormActionChangeDepositCurrency
  | FormActionFetchResultAmount
  | DataActionFetch;

export default function (state: FormStore = initialState, action: Action): FormStore {
  switch (action.type) {

    case FORM_CHANGE_DEPOSIT_CURRENCY:
      return state.set('depositCurrency', action.ticker)
                  .set('depositError', false)
                  .set('resultPending', action.pending)
                  .set('resultAmount', 0)
                  .set('icoAmount', 0);

    case DATA_INIT:
      return state.set('icoCurrency', action.token_ticker)
                  .set('icoRatio', action.rate || null)
                  .set('resultCurrency', action.currency_ticker || 'eth');

    case FORM_ERROR_DEPOSIT:
      return state.set('depositError', action.message)
                  .set('resultPending', false)
                  .set('resultAmount', 0)
                  .set('icoAmount', 0);

    case FORM_CHANGE_DEPOSIT_AMOUNT:
      return state.set('depositAmount', action.value)
                  .set('depositError', false)
                  .set('resultPending', action.pending)
                  .set('resultAmount', 0)
                  .set('icoAmount', 0);

    case FORM_FETCH_RESULT_AMOUNT:
      const icoValue: number = parseFloat(action.icoValue) || parseFloat(action.value) * parseFloat(state.get('icoRatio', 1));
      return state.set('resultPending', false)
                  .set('resultAmount', action.value)
                  .set('service', action.service || 'changelly')
                  .set('icoAmount', icoValue);

    case FORM_INIT:
      return state
        .set('icoRatio', action.icoRatio)
        .set('icoCurrency', action.icoCurrency)
        .set('depositAmount', action.depositAmount)
        .set('depositCurrency', action.depositCurrency)
        .set('resultCurrency', action.resultCurrency || 'eth');

    case DATA_FETCH:
      if (action.result)
        state = state.set('resultAmount', action.result);

      if (!state.get('depositCurrency', null))
        state = state.set('depositCurrency', action.default);

      return state;

    default:
      return state;
  }
}
