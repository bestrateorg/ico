// @flow
'use strict';
// $FlowFixMe
import '../less/app.less';
import Iframe from './client/Iframe';

import {CurrencyList} from 'client/CurrencyList';
import type {Currency} from 'types/currency';
import {scrollPosition} from 'helpers/scroll';

class Widget {
  iframe: Iframe;
  lists: { [id: string]: CurrencyList } = {};

  demo: ?((data: any) => void);

  constructor(container: HTMLElement, widgetId: string, demoCallback?: (data: any) => void) {
    this.iframe = new Iframe(container, widgetId);
    this.iframe.onOpenCurrencyList(this.open);
    this.iframe.onCloseCurrencyList(this.close);
    this.iframe.onSubmit(this.submit);
    if (widgetId === 'demo' && typeof demoCallback !== 'undefined') {
      this.demo = demoCallback;
    }
  }

  submit = (data: any) => {
    if (this.demo)
      this.demo(data);
  };

  close = (id: string) => {
    if (this.lists.hasOwnProperty(id)) {
      const list: CurrencyList = this.lists[id];
      list.close();
    }
  };

  open = (id: string, list: Array<Currency>, rect: ClientRect, shadowWidth?: number) => {

    if (!this.lists.hasOwnProperty(id)) {
      this.lists[id] = new CurrencyList(list, id);
      this.lists[id].onClose((id: string, ticker?: string) => {
        this.iframe.closeCurrencyList(id, ticker);
      });
    }

    const iframeRect: ClientRect = this.iframe.node.getBoundingClientRect();
    const {top, left}: { top: number; left: number; } = scrollPosition();

    this.lists[id].open(
      left + iframeRect.left + rect.left,
      top + iframeRect.top + rect.top + rect.height,
      rect.width,
      shadowWidth
    );
  }

}

const BRWidget = {};

BRWidget.demo = function (containerId: string, callback: (data: any) => void): ?Widget {
  const container: ?HTMLElement = document.getElementById(containerId);
  if (container) {
    return new Widget(container, 'demo', callback);
  } else {
    if (console && console.error) {
      console.error(`ERROR: Container with id attribute "${containerId}" does not exist`);
    }
  }
  return null;
};

BRWidget.init = function (containerId: string, widgetId: string): ?Widget {
  const container: ?HTMLElement = document.getElementById(containerId);
  if (container) {
    return new Widget(container, widgetId);
  } else {
    if (console && console.error) {
      console.error(`ERROR: Container with id attribute "${containerId}" does not exist`);
    }
  }
  return null;
};

BRWidget.resize = function (): typeof BRWidget {
  if (console && console.warn) {
    console.warn('WARN: BRWidget.resize() is deprecated');
  }
  return BRWidget;
};

module.exports = BRWidget;
