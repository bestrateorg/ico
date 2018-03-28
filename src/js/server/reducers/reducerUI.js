// @flow
'use strict';

import {Map} from 'immutable';
import {UI_CHANGE_WIDTH} from '../constants/types';
import {calculateStep} from '../config/steps';
import type {Action} from './root.actions';

export type UIStore = Map<string, any>;
const initialState: UIStore = Map({
  updated : false,
  width   : 0,
  step    : 0,
});

export default function (state: UIStore = initialState, action: Action): UIStore {
  switch (action.type) {
    case UI_CHANGE_WIDTH:
      let step = calculateStep(action.width);
      if (step === state.get('step') && action.width < 300) {
        state = state.update('updated', updated => !updated);
      }
      return state
        .set('width', action.width)
        .set('step', step);
    default:
      return state;
  }
}
