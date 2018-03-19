// @flow
'use strict';

import {combineReducers} from 'redux';
import UI from './reducerUI';
import State from './reducerState';
import Data from './reducerData';
import Form from './reducerForm';
import type {DataStore} from './reducerData';
import type {StateStore} from './reducerState';
import type {UIStore} from './reducerUI';
import type {FormStore} from './reducerForm';

export type Store = {
  Form: FormStore;
  Data: DataStore;
  State: StateStore;
  UI: UIStore;
};

// $FlowFixMe
export default combineReducers({
  Form,
  Data,
  State,
  UI,
});
