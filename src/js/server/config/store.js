// @flow
'use strict';

import {compose, createStore} from 'redux';

import reducers from '../reducers/root';

import middleware from './middleware';

export function configureStore() {
  return createStore(
    reducers,
    compose(
      middleware,
    )
  );
}
