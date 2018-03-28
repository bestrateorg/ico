// @flow
'use strict';

import type {UIActionChangeWidth} from './reducerUI.actions';
import type {DataActionInit, DataActionMarketing} from 'server/reducers/reducerData.actions';
import type {
  FormActionChangeDepositAmount, FormActionChangeDepositTicker,
  FormActionChangeICOAmount,
  FormActionChangeResultAmount,
  FormActionError
} from 'server/reducers/reducerForm.actions';

export type Action =
  UIActionChangeWidth
  | DataActionInit
  | DataActionMarketing
  | FormActionChangeDepositAmount
  | FormActionChangeDepositTicker
  | FormActionChangeResultAmount
  | FormActionError
  | FormActionChangeICOAmount;

