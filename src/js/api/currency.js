// @flow
'use strict';

import {api} from './core';
import type {apiResponse} from 'api/core';

export type Currency = {
  ticker: string;
  name: string;
};

export type ApiInitData = {
  currencies: Array<Currency>;
  default: string;
  result?: number;
}

export function getInitData(partnerID?: string, fromAmount?: number, fromCurrency?: string, toCurrency?: string): Promise<apiResponse<ApiInitData>> {
  return api('/api/widget/getInitData', {
    fromAmount,
    fromCurrency,
    toCurrency
  });
}

