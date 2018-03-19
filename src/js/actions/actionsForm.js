// @flow
'use strict';

import {
  FORM_CHANGE_DEPOSIT_AMOUNT,
  FORM_CHANGE_DEPOSIT_CURRENCY,
  FORM_ERROR_DEPOSIT,
  FORM_FETCH_RESULT_AMOUNT
} from 'constants/types';
import type {Dispatch} from 'redux';

import type {
  FormActionChangeDepositAmount,
  FormActionChangeDepositCurrency,
  FormActionErrorDeposit, FormActionFetchResultAmount, FormStore
} from '../reducers/reducerForm';
import type {Store} from '../reducers/root';
import Api from 'api/api';
import type {apiResponse} from 'api/core';
import type {ApiBestRate} from 'api/rates';
import type {DataStore} from '../reducers/reducerData';

function updateDepositAmount(value: string | number, pending: boolean = true): FormActionChangeDepositAmount {
  return {
    type : FORM_CHANGE_DEPOSIT_AMOUNT,
    value,
    pending
  }
}

function updateDepositCurrency(ticker: string, pending: boolean = true): FormActionChangeDepositCurrency {
  return {
    type : FORM_CHANGE_DEPOSIT_CURRENCY,
    ticker,
    pending
  };
}

function fetchResultAmount(value: string | number, service: string = 'changelly', icoValue?: number | string): FormActionFetchResultAmount {
  return {
    type : FORM_FETCH_RESULT_AMOUNT,
    value,
    service,
    icoValue
  };
}

function errorDeposit(message: string): FormActionErrorDeposit {
  return {
    type : FORM_ERROR_DEPOSIT,
    message
  };
}

let timeout: number;

export function changeDepositCurrency(ticker: string) {
  const time: number = timeout = Date.now();
  return (dispatch: Dispatch<Store>, getState: () => Store): void => {

    const stateForm: FormStore = getState().Form;
    const stateData: DataStore = getState().Data;

    const amount: number = parseFloat(stateForm.get('depositAmount', 0));
    const partnerID: ?string = stateData.get('partnerID', null);
    const icoCurrency: string = stateForm.get('icoCurrency');

    // console.log('changeDepositCurrency', !!amount);

    dispatch(updateDepositCurrency(ticker, !!amount));

    if (time === timeout && amount) {
      // $FlowFixMe
      Api.Rates.getBestRate(amount, ticker, stateForm.get('resultCurrency', 'eth'),
        icoCurrency, partnerID)
         .then((response: apiResponse<ApiBestRate>) => {
           if (time === timeout) {
             if (response.success) {
               dispatch(fetchResultAmount(response.result.result, response.result.service, response.result.widgetValue));
             } else {
               dispatch(errorDeposit(response.error || 'Something went wrong!'));
             }
           }
         })
         .catch(err => {
           if (time === timeout) {
             dispatch(errorDeposit(err.message || 'Something went wrong!'));
           }
         });
    }
  }
}

export function changeDepositAmount(value: string | number) {
  const time: number = timeout = Date.now();

  value = value.toString().replace(/[^\d.,]/g, '').replace(/[,.]+/g, '.');

  if (value[0] === '.') {
    value = '0' + value;
  }

  return (dispatch: Dispatch<Store>, getState: () => Store): void => {
    const amount: number = parseFloat(value);

    dispatch(updateDepositAmount(value, !!amount));
    if (time === timeout && amount) {

      const stateForm: FormStore = getState().Form;
      const stateData: DataStore = getState().Data;

      const partnerID: ?string = stateData.get('partnerID', null);
      const icoCurrency: string = stateForm.get('icoCurrency');
      // console.log('changeDepositAmount 1', amount, partnerID, icoCurrency);
      // $FlowFixMe
      Api.Rates.getBestRate(value,
        stateForm.get('depositCurrency', 'btc'),
        stateForm.get('resultCurrency', 'eth'),
        icoCurrency,
        partnerID)
         .then((response: apiResponse<ApiBestRate>) => {
           if (time === timeout) {
             if (response.success) {
               dispatch(fetchResultAmount(
                 response.result.result,
                 response.result.service || 'changelly',
                 response.result.widgetValue
               ));
             } else {
               dispatch(errorDeposit(response.error || 'Something went wrong!'));
             }
           }
         })
         .catch(err => {
           if (time === timeout) {
             dispatch(errorDeposit(err.message || 'Something went wrong!'));
           }
         });
    }
  }
}

