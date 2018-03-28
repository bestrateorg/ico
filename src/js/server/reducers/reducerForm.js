// @flow
'use strict';

import {Map} from 'immutable';
import {
  DATA_INIT,
  FORM_CHANGE_DEPOSIT_AMOUNT
} from '../constants/types';
import type {Action} from './root.actions';
import type {Options} from '../../widget';
import {FORM_CHANGE_DEPOSIT_TICKER, FORM_CHANGE_ICO_AMOUNT, FORM_ERROR} from 'server/constants/types';

export type FormStore = Map<string, any>;
const initialState: FormStore = Map({
  depositAmount       : '',
  depositTicker       : '',
  depositError        : false,
  depositErrorMessage : '',

  resultAmount  : '',
  resultTicker  : '',
  resultPending : false,

  icoAmount  : '',
  icoTicker  : '',
  icoPending : false,
  icoRate    : 1, // resultCurrency / icoCurrency

  error        : false,
  errorMessage : '',

  service : 'changelly',
});

function clearErrors(state: FormStore) {
  return state
    .set('error', false)
    .set('errorMessage', '')
    .set('depositError', false)
    .set('depositErrorMessage', '')
}

export default function (state: FormStore = initialState, action: Action): FormStore {
  switch (action.type) {

    case FORM_ERROR:
      return state
        .set('icoPending', false)
        .set('error', true)
        .set('errorMessage', action.message);

    case FORM_CHANGE_DEPOSIT_AMOUNT:
      return state
        .update(clearErrors)
        .set('depositAmount', action.amount)
        .set('resultPending', true)
        .set('icoPending', true);

    case FORM_CHANGE_DEPOSIT_TICKER:
      return state
        .update(clearErrors)
        .set('depositTicker', action.ticker)
        .set('resultPending', true)
        .set('icoPending', true);

    case FORM_CHANGE_ICO_AMOUNT:
      return state
        .update(clearErrors)
        .set('resultPending', false)
        .set('resultAmount', action.result_amount)
        .set('icoAmount', action.amount)
        .set('icoPending', false);

    case DATA_INIT:
      const options: Options = action.options;
      return state
        .set('depositTicker', options.depositTicker)
        .set('depositAmount', options.depositAmount)
        .set('resultTicker', options.resultTicker)
        .set('resultAmount', options.resultAmount)
        .set('icoTicker', options.icoTicker)
        .set('icoAmount', options.icoAmount)
        .set('icoRate', options.settings.rate)
        .set('service', options.service);
    default:
      return state;
  }
}
