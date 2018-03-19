// @flow
'use strict';

import {Logger} from 'helpers/logger';
import {resize, visualize} from './Widget';

// $FlowFixMe
import '../less/widget.less';

export type Bonus = {
  // от какого значения (включительно)
  from: number;
  // до какого значения (не включительно)
  // если не задано то до бесконечности
  to?: number;
  // размер бонуса
  percent: number;
}

export type Settings = {
  // ID еонтейнера
  containerID: string;
  // ID партнерки
  partnerID?: string;
  // (TON) инфа о токене
  token_ticker: string;
  // (Telegram Scam Token) инфа о токене
  token_name?: string;
  // цена токена
  rate?: number;
  // кошель на который надо передавать баблоу
  wallet: string;
  // в какой валюте измерять
  currency_ticker?: string;
  // бонусы
  bonus?: Array<Bonus>;
};

const defaultSettings = {
  currency_ticker : 'eth'
};

/* develblock:start */
console.log('INIT WIDGET!!!');
/* develblock:end */

module.exports = {
  init(settings: Settings) {

    if (!settings) {
      Logger.error('Init', 'Settings are required');
      return null;
    }

    if (!settings.containerID || !settings.token_ticker || !settings.wallet) {
      Logger.error('Init', '`containerID`, `token_ticker`, `token_name` are required');
      return null;
    }

    settings = {...defaultSettings, ...settings};

    visualize(settings);
  },
  resize() {
    resize();
  }
};
