// @flow
'use strict';

import type {Currency} from 'types/currency';
import svg_search from '../../images/search.svg';
import {scrollPosition} from 'helpers/scroll';

export class CurrencyList {
  layout: HTMLElement;

  node: HTMLElement;
  input: HTMLInputElement;
  list: HTMLUListElement;
  shadow: HTMLSpanElement;

  items: Currency[];
  filterItems: Currency[];
  search: string = '';
  lastSearch: string = '';

  isOpen: boolean = false;
  id: string;

  _closeCallback: (id: string, ticker?: string) => void;

  constructor(items: Currency[], id: string) {
    this.id = id;
    this.items = items;
    this.filterItems = items;

    const container = document.createElement('div');
    container.className = 'bestrate-widget-layout';

    this.node = document.createElement('div');
    this.node.className = 'br-dropdown';
    container.appendChild(this.node);

    this.shadow = document.createElement('span');
    this.shadow.className = 'br-shadow';
    this.node.appendChild(this.shadow);

    this.layout = container;

    if (document.body) {
      document.body.appendChild(container);
      this.initDom();
      this.initEvent();
    }
  }

  initDom() {
    const search: HTMLElement = document.createElement('div');
    search.className = 'br-search';

    search.innerHTML = `<input type="text" placeholder="Start Typing" name="search"/><span class="br-search-icon">${svg_search}</span>`;

    const input: ?HTMLElement = search.querySelector('input[type="text"]');
    if (input) {
      // $FlowFixMe
      this.input = input;
    }

    this.list = document.createElement('ul');
    this.list.className = 'br-list';
    this.list.appendChild(this.__renderList());

    this.node.appendChild(search);
    this.node.appendChild(this.list);

  }

  initEvent() {
    document.addEventListener('click', this.click);
    window.addEventListener('resize', () => {
      this.whenClose();
    });
    this.input.addEventListener('input', this.onSearch)
  }

  onSearch = (event: Event) => {
    this.search = this.input.value;
    this.render();
  };

  click = (event: Event) => {
    if (!this.isOpen)
      return;
    //$FlowFixMe
    const target: EventTarget = event.target;

    if (this.node.contains(target)) {
      if (target.hasAttribute('data-ticker')) {
        const ticker: string = target.getAttribute('data-ticker');
        if (this._closeCallback) {
          this.whenClose(ticker);
        }
      }
    } else {
      this.whenClose();
    }
  };

  whenClose(ticker?: string) {
    this.close();
    if (this._closeCallback) {
      this._closeCallback(this.id, ticker);
    }
  }

  onClose(cb: (id: string, ticker?: string) => void) {
    this._closeCallback = cb;
  }

  render(): void {
    if (this.lastSearch !== this.search) {
      this.list.innerHTML = '';
      const search = this.search.toLowerCase();
      this.filterItems = this.items.filter((item: Currency) => {
        return item.ticker.toLowerCase().indexOf(search) > -1 || item.name.toLowerCase().indexOf(search) > -1;
      });
      this.list.appendChild(this.__renderList());
    }
    this.lastSearch = this.search;
  }

  __renderList(): DocumentFragment | HTMLElement {
    if (this.filterItems.length === 0) {
      const empty: HTMLElement = document.createElement('li');
      empty.className = 'br-list-item br-empty';
      empty.innerHTML = 'Nothing found';
      return empty;
    }
    const fragment: DocumentFragment = document.createDocumentFragment();
    this.filterItems.forEach((item: Currency) => {
      const node: HTMLElement = document.createElement('li');
      node.className = 'br-list-item';
      node.innerHTML = `<a href="javascript:void(0)" data-ticker="${item.ticker}" class="br-currency"><span class="br-ticker" data-ticker="${item.ticker}">${item.ticker}</span><span data-ticker="${item.ticker}" class="br-name">${item.name}</span></a>`
      fragment.appendChild(node);
    });
    return fragment;
  }

  open(x: number, y: number, width: number, shadowWidth?: number) {
    const {top, left} = scrollPosition();
    const layoutClient: ClientRect = this.layout.getBoundingClientRect();

    x = x - (left + layoutClient.left);
    y = y - (top + layoutClient.top);

    if (shadowWidth) {
      this.shadow.setAttribute('style', `display:block!important;width:${shadowWidth}px!important;`);
    } else {
      this.shadow.removeAttribute('style');
    }

    this.isOpen = true;
    this.node.setAttribute('style', `left:${x}px!important;top:${y}px!important;width:${width}px!important;display:block!important;`);
    this.input.focus();
  }

  close() {
    this.isOpen = false;
    this.node.removeAttribute('style');
  }
}
