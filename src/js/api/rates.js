// @flow
'use strict';

import {api} from 'api/core';
import type {apiResponse} from 'api/core';

export type ApiBestRate = {
  result: number;
  service: string;
  widgetValue: number;
}

export function getBestRate(fromAmount: string | number, fromCurrency: string, toCurrency: string,
                            widgetTicker?: string, partnerID?: ?string): Promise<apiResponse<ApiBestRate>> {
  return api('/api/widget/getBestRate', {
    fromAmount,
    fromCurrency,
    toCurrency,
    widgetTicker,
    partnerID
  });
}
