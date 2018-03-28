// @flow
'use strict';

import {api} from './core';
import type {apiPromise} from './core';

export type ApiBestRate = {
  result: string|number;
  service: string;
  widgetValue: string|number;
}

export function getBestRate(fromAmount: string | number, fromCurrency: string, toCurrency: string,
                            widgetTicker?: string, widgetId?: ?string): apiPromise<ApiBestRate> {
  return api('/api/widget/getBestRate', {
    fromAmount,
    fromCurrency,
    toCurrency,
    widgetTicker,
    partnerID : widgetId
  });
}
