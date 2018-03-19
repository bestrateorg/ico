// @flow
'use strict';

export const icons: { [key: string]: string } = {
  // btc   : 'BTC-alt',
  // eth   : 'ETH-alt',
  // bch   : 'BCH-alt',
  // xmr   : 'XMR',
  // xrp   : 'XRP-alt',
  // ltc   : 'LTC-alt',
  // game  : 'GAME',
  '1st' : 'FIRST'
};

export function icon(currency: string): string {
  if (typeof currency !== 'string')
    return 'NaN';
  return (icons.hasOwnProperty(currency)
    ? icons[currency]
    : currency.toUpperCase());
}
