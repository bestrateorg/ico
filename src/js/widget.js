// @flow
'use strict';

//$FlowFixMe
import '../less/widget.less';
import insertWidget from 'server/Widget';

import {parse} from 'helpers/search';
import Api from 'server/api/api';

import type {PartnerObject, Settings} from 'types/settings';
import type {apiResponse} from 'server/api/core';
import type {ApiInitData} from 'server/api/widget';
import type {Currency} from 'types/currency';
import type {ApiBestRate} from 'server/api/rates';

const data = parse();

export type Options = {

  widgetId: string;
  settings: Settings;

  depositTicker: string;
  depositAmount: ?number;

  resultTicker: string;
  resultAmount: ?number;

  icoTicker: string;
  icoAmount: ?number;

  service: string;
  depositCurrencies: Array<Currency>;
  wallet?: string;
}

const origin = window.parent;

export const sendParentData: (data: any) => void = function (data: any) {
  if (origin) {
    origin.postMessage(data, '*');
  }
};

const demoSettings: PartnerObject = {
  key      : 'demo',
  name     : 'DEMO Widget v2',
  settings : {
    bonus           : [],
    deposit_amount  : 1,
    deposit_ticker  : 'btc',
    rate            : 1,
    currency_ticker : 'eth',
    token_name      : 'DemoToken',
    token_ticker    : 'DEMO',
    wallet          : '',
  }
};

if (origin && data.key) {

  const initPromise: Promise<PartnerObject> = data.key === 'demo'
    ? (Promise.resolve(demoSettings))
    : (Api.Widget.init(data.key)
          .then((response: apiResponse<{ partner: PartnerObject }>) => {
            if (response.success)
              return response.result.partner;
            return Promise.reject({message : response.error});
          }));

  Promise.all([initPromise,
    Api.Widget.getInitData()
       .then((response: apiResponse<ApiInitData>) => {
         if (response.success)
           return response.result;
         return Promise.reject({message : response.error});
       })])
         .then((response: [PartnerObject, ApiInitData]) => {
             const resultTicker: string = (response[0].settings.currency_ticker || 'eth').toLowerCase();
             const icoTicker: string = response[0].settings.token_ticker.toLowerCase();
             return {
               widgetId : response[0].key,
               settings : response[0].settings,

               depositTicker : response[0].settings.deposit_ticker || response[1].default,
               depositAmount : response[0].settings.deposit_amount || null,

               resultTicker,
               resultAmount : null,

               icoTicker,
               icoAmount : null,

               service           : 'changelly',
               depositCurrencies : response[1].currencies
                                              .filter((item: Currency) => {
                                                const ticker: string = item.ticker.toLowerCase();
                                                return ticker !== resultTicker && ticker !== icoTicker
                                              }),
             }
           }
         ).then((options: Options) => {
    if (options.depositAmount) {
      return Api.Rates.getBestRate(
        options.depositAmount,
        options.depositTicker,
        options.resultTicker,
        options.icoTicker,
        options.widgetId
      )
                .then((response: apiResponse<ApiBestRate>) => {
                  if (response.success) {
                    const res: ApiBestRate = response.result;
                    options.service = res.service || 'changelly';
                    options.resultAmount = parseFloat(res.result);
                    options.icoAmount = res.widgetValue
                      ? parseFloat(res.widgetValue)
                      : options.resultAmount * (options.settings.rate || 1);
                    return options;
                  }
                  return Promise.reject();
                })
                .catch(() => options);
    }
    return options;
  })
         .then(insertWidget)
         .catch(error);
} else {
  error({message : 'There is not required parameter.'});
}

function error(err: any) {
  const con: ?HTMLElement = document.getElementById('error');
  const loader: ?HTMLElement = document.getElementById('loader');
  if (con) {
    con.innerHTML = `<span class="message">${err.message}</span>`;
  }

  if (loader && loader.parentNode) {
    loader.parentNode.removeChild(loader);
  }
}



