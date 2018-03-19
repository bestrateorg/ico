// @flow
'use strict';

import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {Logger} from 'helpers/logger';
import {configureStore} from 'config/store';

import type {Settings} from './app.js';
import {resizeWindow} from 'actions/actionsUI';
import WidgetWrapper from 'containers/Wrapper';
import {toggleType} from 'actions/actionsState';
import styled from 'styled-components';
import {fetch, init} from 'actions/actionsData';
import {calculateStep} from 'config/steps';

export const store = configureStore();

interface Props {

}

const $Options = styled.div`
  #bestratewidget & {
    padding-top: 10px !important;
    
    > button {
      margin: 10px !important;
    }
  }
`;

class BRWidget extends Component<Props> {

  componentDidMount() {
    store.dispatch(fetch());
  }

  render() {
    return (
      <Provider store={store}>
        <div id="bestratewidget">
          <WidgetWrapper/>

          {this.__renderOptions()}

        </div>

      </Provider>
    );
  }

  __renderOptions() {
    if (false) {
      return (
        <$Options>
          <button style={{margin : 20}} onClick={() => {
            const type = store.getState().State.get('kind', 0);
            store.dispatch(toggleType(type === 0 ? 1 : 0));
          }}>Toggle
          </button>
        </$Options>
      );
    }
    return null;
  }
}

const resize_callbacks: Array<(() => void)> = [];

export function resize() {
  resize_callbacks.forEach(callback => callback());
}

export function visualize(settings: Settings) {
  const container: ?HTMLElement = document.getElementById(settings.containerID);

  if (!container) {
    Logger.error('visualize', 'Container does not exist');
    return null;
  }

  let timeStamp;
  let step = 0;

  function resize() {
    const stamp = timeStamp = Date.now();

    const containerWidth: number = container.offsetWidth;

    const ns: number = calculateStep(containerWidth);
    if (ns !== step) {
      store.dispatch(resizeWindow(container));
      step = ns;
    } else {
      setTimeout(() => {
        if (stamp === timeStamp) {
          store.dispatch(resizeWindow(container));
        }
      }, 50);
      step = ns;
    }
  }

  store.dispatch([resizeWindow(container), init(settings)]);

  window.addEventListener('resize', resize);

  resize_callbacks.push(resize);

  // let last_width: number = container.offsetWidth;
  //
  // setInterval(function () {
  //   // console.log(container.offsetWidth);
  //   if (last_width !== container.offsetWidth) {
  //     last_width = container.offsetWidth;
  //     resize();
  //   }
  // }, 100);

  render(
    <BRWidget/>
    , container
    /* develblock:start */
    , () => {
      console.log('WIDGET INSERTED');
    }
    /* develblock:end */
  );
}

