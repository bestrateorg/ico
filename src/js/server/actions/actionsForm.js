// @flow
'use strict';

import {
  FORM_CHANGE_DEPOSIT_AMOUNT, FORM_CHANGE_DEPOSIT_TICKER,
  FORM_CHANGE_ICO_AMOUNT,
  FORM_CHANGE_RESULT_AMOUNT,
  FORM_ERROR
} from 'server/constants/types';
import type {
  FormActionChangeDepositAmount, FormActionChangeDepositTicker,
  FormActionChangeICOAmount,
  FormActionChangeResultAmount, FormActionError
} from 'server/reducers/reducerForm.actions';
import type {Dispatch, GetState, ThunkAction} from 'types/redux';
import type {FormStore} from 'server/reducers/reducerForm';
import Api from 'server/api/api';
import type {apiResponse} from 'server/api/core';
import type {ApiBestRate} from 'server/api/rates';

let changeDepositTimestamp: number;

function update(time: number, amount?: string | number, ticker?: string): ThunkAction {
  return function (dispatch: Dispatch, getState: GetState) {
    if (time !== changeDepositTimestamp)
      return;

    if (time !== changeDepositTimestamp) {
      return;
    }
    const form: FormStore = getState().Form;
    const data: FormStore = getState().Data;

    const depositAmount: (string | number) = typeof amount !== 'undefined' ? amount : form.get('depositAmount', 0);
    const depositTicker: string = typeof ticker !== 'undefined' ? ticker : form.get('depositTicker', '');

    const resultTicker: string = form.get('resultTicker', '');
    const icoTicker: string = form.get('icoTicker', '');
    const widgetId: string = data.get('widgetId', '');

    if (!depositAmount || !depositTicker || !resultTicker || !icoTicker) {
      dispatch(errorForm('Something went wrong'));
    } else {
      Api.Rates.getBestRate(depositAmount, depositTicker, resultTicker, icoTicker, widgetId)
         .then((response: apiResponse<ApiBestRate>) => {
           if (time !== changeDepositTimestamp)
             return;
           if (response.success) {
             const result: ApiBestRate = response.result;
             let icoAmount: ?number = parseFloat(result.widgetValue);
             const resultAmount: number = parseFloat(result.result);
             const service: string = result.service || 'changelly';

             if (!icoAmount) {
               icoAmount = resultAmount * getState().Form.get('icoRate', 1);
             }

             dispatch(changeICOAmount(icoAmount, resultAmount, service));
           } else {
             return Promise.reject({message : response.error || 'Something went wrong'});
           }
         })
         .catch(err => {
           if (time !== changeDepositTimestamp)
             return;
           dispatch(errorForm(err.message));
         })
    }

  }
}

export function changeDepositTicker(ticker: string): [FormActionChangeDepositTicker, ThunkAction] {
  const time: number = changeDepositTimestamp = Date.now();
  return [{
    type : FORM_CHANGE_DEPOSIT_TICKER,
    ticker,
  }, update(time, undefined, ticker)]

}

export function changeDepositAmount(amount: number | string): [FormActionChangeDepositAmount, ThunkAction] {
  const time: number = changeDepositTimestamp = Date.now();
  return [{
    type : FORM_CHANGE_DEPOSIT_AMOUNT,
    amount
  }, update(time, amount, undefined)];
}

export function errorForm(message: string): FormActionError {
  return {
    type : FORM_ERROR,
    message
  };
}

export function changeICOAmount(amount: number | string, result_amount: number | string, service: string): FormActionChangeICOAmount {
  return {
    type : FORM_CHANGE_ICO_AMOUNT,
    amount,
    result_amount,
    service
  }
}
