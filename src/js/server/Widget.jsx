// @flow
'use strict';

import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore} from 'server/config/store';
import Wrapper from 'server/containers/Wrapper';
import type {Options} from '../widget';
import * as actionsData from './actions/actionsData';
import * as actionsUI from './actions/actionsUI';
import {sendParentData} from '../widget';
import {ServerFrameAction} from 'types/actions';

const root: ?HTMLElement = document.getElementById('root');

export const store = configureStore();

type Props = {};

class Widget extends Component<Props> {

  componentDidMount() {
    sendParentData({type : 'init'});
  }

  render() {
    return (
      <Provider store={store}>
        <Wrapper/>
      </Provider>
    );
  }
}

export default function (options: Options) {

  store.dispatch(actionsData.initData(options));

  window.addEventListener('resize', function () {
    store.dispatch(actionsUI.resizeWindow(window.innerWidth));
  });

  window.addEventListener('message', (event: MessageEvent) => {
    /* develblock:start */
    console.groupCollapsed('Server: PostMessage event');
    console.log('event:');
    console.log(event);
    console.groupEnd();
    /* develblock:end */

    if (!event.data || !event.data.type)
      return;
    const data: ServerFrameAction = event.data;
    switch (data.type) {
      case 'marketing-data':
        store.dispatch(actionsData.marketingData(data.url));
        break;
    }
  });

  if (root) {
    render(<Widget/>, root);
  }
}
