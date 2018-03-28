// @flow
'use strict';

import {ClientFrameAction} from '../types/actions';
import type {Currency} from 'types/currency';
import type {ClientFrameActionCloseCurrenciesList, ClientFrameActionOpenCurrenciesList} from 'types/actions';
import {ClientFrameActionSubmit} from 'types/actions';
import {origin, originRoute} from 'client/hosts';

export default class Iframe {
  node: HTMLIFrameElement;
  loaded: boolean;

  constructor(container: HTMLElement, widgetId: string) {

    this.loaded = false;

    this.init();

    this.node = document.createElement('iframe');
    this.node.className = 'bestrate-widget';
    this.node.src = `${origin}${originRoute}/widget.html?key=${widgetId}`;
    this.node.setAttribute('frameBorder', '0');
    this.node.setAttribute('style', 'height:171px!important;');
    container.setAttribute('style', 'position:relative;');
    container.appendChild(this.node);
  }

  init() {
    window.addEventListener('message', (event: MessageEvent) => {
      /* develblock:start */
      console.groupCollapsed('Client: message event');
      console.log('event:');
      console.log(event);
      console.groupEnd();
      /* develblock:end */

      if (event.origin === origin && event.source === this.node.contentWindow) {
        this.reducer(event.data);
      }
    });
  }

  reducer(action: ClientFrameAction) {

    if (!action || !action.type)
      return;

    /* develblock:start */
    console.groupCollapsed('Client: iframe reducer =>', action.type);
    console.log('action:');
    console.log(action);
    console.groupEnd();
    /* develblock:end */

    switch (action.type) {
      case 'resize':
        this.resize(action.height);
        break;
      case 'open-currency-list':
        this.__openCurrencyList(action);
        break;
      case 'close-currency-list':
        this.__closeCurrencyList(action);
        break;
      case 'submit':
        this.__submit(action);
        break;
      case 'init':
        this.loaded = true;
        this.send({
          type : 'marketing-data',
          url  : window.location.href
        });
        break;

    }
  };

  resize(height: number) {
    this.node.setAttribute('style', `height:${height}px !important`);
  }

  send(data: any) {
    if (this.loaded && this.node) {
      this.node.contentWindow.postMessage(data, origin);
    }
  }

  __closeCurrencyList(action: ClientFrameActionCloseCurrenciesList) {
    if (this._closeCurrencyListCallback)
      this._closeCurrencyListCallback(action.id);
  }

  __openCurrencyList(action: ClientFrameActionOpenCurrenciesList) {
    if (this._openCurrencyListCallback)
      this._openCurrencyListCallback(action.id, action.currencies, action.rect, action.shadowWidth);
  }

  __submit(action: ClientFrameActionSubmit) {
    if (this._submit)
      this._submit(action.data);
  }

  _openCurrencyListCallback: (id: string, list: Array<Currency>, rect: ClientRect, shadowWidth?: number) => void;
  _closeCurrencyListCallback: (id: string) => void;
  _submit: (data: any) => void;

  onOpenCurrencyList(cb: (id: string, list: Array<Currency>, rect: ClientRect, shadowWidth?: number) => void) {
    this._openCurrencyListCallback = cb;
  }

  onCloseCurrencyList(cb: (id: string) => void) {
    this._closeCurrencyListCallback = cb;
  }

  onSubmit(cb: (data: any) => void) {
    this._submit = cb;
  }

  closeCurrencyList(id: string, ticker?: string) {
    this.send({
      type : `${id}-close`,
      ticker
    });
  }
}

