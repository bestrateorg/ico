// @flow
'use strict';

import {
  FORM_CHANGE_DEPOSIT_AMOUNT, FORM_CHANGE_DEPOSIT_TICKER,
  FORM_CHANGE_ICO_AMOUNT,
  FORM_CHANGE_RESULT_AMOUNT,
  FORM_ERROR
} from 'server/constants/types';

export type FormActionChangeDepositAmount = {
  type: typeof FORM_CHANGE_DEPOSIT_AMOUNT;
  amount: number | string;
};
export type FormActionChangeDepositTicker = {
  type: typeof FORM_CHANGE_DEPOSIT_TICKER;
  ticker: string;
};

export type FormActionChangeResultAmount = {
  type: typeof FORM_CHANGE_RESULT_AMOUNT;
  amount: number | string;
  service: string;
};

export type FormActionChangeICOAmount = {
  type: typeof FORM_CHANGE_ICO_AMOUNT;
  amount: number | string;
  result_amount: number | string;
  service: string;
};

export type FormActionError = {
  type: typeof FORM_ERROR;
  message: string;
};
