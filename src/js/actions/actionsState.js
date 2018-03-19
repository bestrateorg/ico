// @flow
'use strict';

import type {StateActionTypeToggle} from '../reducers/reducerState';
import {STATE_KIND_TOGGLE} from 'constants/types';

export function toggleType(kind: number): StateActionTypeToggle {
  return {
    type : STATE_KIND_TOGGLE,
    kind,
  }
}
