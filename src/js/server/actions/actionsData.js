// @flow
'use strict';

import type {DataActionInit, DataActionMarketing} from 'server/reducers/reducerData.actions';
import {DATA_INIT, DATA_MARKETING} from 'server/constants/types';
import type {Options} from '../../widget';

export function initData(options: Options): DataActionInit {
  return {
    type : DATA_INIT,
    options
  };
}

export function marketingData(url: string): DataActionMarketing {
  return {
    type : DATA_MARKETING,
    url
  };
}
