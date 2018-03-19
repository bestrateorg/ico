// @flow
'use strict';
// REDUX
import {applyMiddleware} from 'redux';
// $FlowFixMe
import thunk from 'redux-thunk';
/* develblock:start */
import {fromJS} from 'immutable';

// $FlowFixMe
import {createLogger} from 'redux-logger';
/* develblock:end */

const arrayMiddleware = store => next => actions => {
  if (Array.isArray(actions)) {
    actions.forEach((action) => {
      store.dispatch(action);
    });
  } else {
    return next(actions);
  }
};
/* develblock:start */
const logger = createLogger({
  collapsed        : () => true,
  stateTransformer : (state) => fromJS(state).toJS()
});
/* develblock:end */

export default applyMiddleware(/* develblock:start */logger, /* develblock:end */thunk, arrayMiddleware);
