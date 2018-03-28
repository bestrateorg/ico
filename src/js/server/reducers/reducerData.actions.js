// @flow
'use strict';
import {DATA_INIT, DATA_MARKETING} from 'server/constants/types';
import type {Options} from '../../widget';

export type DataActionInit = {
  type: typeof DATA_INIT;
  options: Options;
};

export type DataActionMarketing = {
  type: typeof DATA_MARKETING;
  url: string;
};
