// @flow
'use strict';

import {combineReducers} from 'redux';
import UI from './reducerUI';
import Data from './reducerData';
import Form from './reducerForm';
import type {DataStore} from './reducerData';
import type {UIStore} from './reducerUI';
import type {FormStore} from './reducerForm';

export type Store = {
  Form: FormStore;
  Data: DataStore;
  UI: UIStore;
};

// $FlowFixMe
export default combineReducers({
  Form,
  Data,
  UI,
});
