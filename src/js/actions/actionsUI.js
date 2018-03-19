// @flow
'use strict';

import type {UIActionChangeWidth} from '../reducers/reducerUI';
import {UI_CHANGE_WIDTH} from 'constants/types';

export function resizeWindow(container: HTMLElement): UIActionChangeWidth {
  return {
    type  : UI_CHANGE_WIDTH,
    width : container.offsetWidth
  }
}
