// @flow
'use strict';

export type SettingsBonus = {
  // from value
  from: number;
  // to value
  // default infinite
  to?: number;
  // bonus amount in percent
  percent: number;
}

export type Settings = {
  // init value
  deposit_amount?: number;
  deposit_ticker?: string;

  // (TON) инфа о токене
  token_ticker: string;
  // (Telegram Scam Token) инфа о токене
  token_name?: string;
  // цена токена
  rate?: number;
  // кошель на который надо передавать валюту
  wallet: string;
  // в какой валюте измерять
  currency_ticker?: string;
  // бонусы
  bonus?: Array<SettingsBonus>;
};

export type PartnerObject = {
  key: string;
  name: string;
  settings: Settings;
};
