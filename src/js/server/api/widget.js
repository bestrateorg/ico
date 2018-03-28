// @flow
'use strict';

import {api} from './core';
import type {apiPromise} from 'server/api/core';
import type {PartnerObject} from 'types/settings';
import type {Currency} from 'types/currency';

export function init(widgetId: string): apiPromise<{ partner: PartnerObject }> {
  return api(`/api/widget/${widgetId}`);
}

export type ApiInitData = {
  default: string;
  result?: number;
  currencies: Array<Currency>;
}

export function getInitData(fromAmount?: number, fromCurrency?: string, toCurrency?: string): apiPromise<ApiInitData> {
  return api('/api/widget/getInitData', {
    fromAmount,
    fromCurrency,
    toCurrency
  });
}
