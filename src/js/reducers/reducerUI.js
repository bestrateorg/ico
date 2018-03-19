// @flow
'use strict';

import {Map} from 'immutable';
import {UI_CHANGE_WIDTH} from 'constants/types';
import {calculateStep} from 'config/steps';

const initialState = Map({
  width : 0,
  step  : 0,
});

export type UIStore = typeof initialState;

export type UIActionChangeWidth = {
  type: typeof UI_CHANGE_WIDTH;
  width: number;
}

type Action = UIActionChangeWidth ;

export default function (state: UIStore = initialState, action: Action): UIStore {
  switch (action.type) {
    case UI_CHANGE_WIDTH:
      let step = calculateStep(action.width);
      return state
        .set('width', action.width)
        .set('step', step);
    default:
      return state;
  }
}
