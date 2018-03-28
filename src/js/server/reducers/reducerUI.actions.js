// @flow
'use strict';

import {UI_CHANGE_WIDTH} from '../constants/types';

export type UIActionChangeWidth = {
  type: typeof UI_CHANGE_WIDTH;
  width: number;
}
