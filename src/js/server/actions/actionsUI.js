// @flow
'use strict';

import {UI_CHANGE_WIDTH} from 'server/constants/types';
import type {UIActionChangeWidth} from 'server/reducers/reducerUI.actions';

export function resizeWindow(width: number): UIActionChangeWidth {
  return {
    type : UI_CHANGE_WIDTH,
    width
  }
}
