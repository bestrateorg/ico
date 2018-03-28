'use strict';

import type {Currency} from 'types/currency';

export type ClientFrameActionTest = {
  type: 'test';
}
export type ClientFrameActionResize = {
  type: 'resize';
  height: number;
}

export type ClientFrameActionOpenCurrenciesList = {
  type: 'open-currency-list';
  id: string;
  rect: ClientRect;
  shadowWidth: number;
  currencies: Array<Currency>;
}

export type ClientFrameActionSubmit = {
  type: 'open-currency-list';
  data: any;
}

export type ClientFrameActionCloseCurrenciesList = {
  type: 'close-currency-list';
  id: string;
}

export type ClientFrameAction =
  ClientFrameActionTest
  | ClientFrameActionSubmit
  | ClientFrameActionResize
  | ClientFrameActionOpenCurrenciesList
  | ClientFrameActionCloseCurrenciesList;

export type ServerFrameActionMarketingData = {
  type: 'marketing-data';
  url: string;
};

export type ServerFrameAction = ServerFrameActionMarketingData;
