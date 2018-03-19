// @flow
'use strict';

import {Dispatch} from 'redux';
import type {Store} from '../reducers/root';
import Api from 'api/api';
import type {ApiInitData} from 'api/currency';
import type {apiResponse} from 'api/core';
import {DATA_FETCH, DATA_INIT} from 'constants/types';
import type {Settings} from '../app';
import type {FormActionInitData} from '../reducers/reducerForm';

function fetching(results: ApiInitData) {
  return {
    type : DATA_FETCH,
    ...results
  };
}

export function init(settings: Settings): FormActionInitData {
  return {
    ...settings,
    type : DATA_INIT,
  }
}

export function fetch() {
  return (dispatch: Dispatch<Store>, getState: () => Store) => {
    Api.Currency.getInitData()
       .then((response: apiResponse<ApiInitData>) => {
         if (response.success) {
           dispatch(fetching(response.result));
         }
       })
       .catch(err => {
         // Do Nothing;
       })
  };
}
