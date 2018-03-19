// @flow
'use strict';
import {Map} from 'immutable';
import {STATE_KIND_TOGGLE} from 'constants/types';

const initialState = Map({
  // 0 - normal
  // 1 - reverse
  kind : 1,
});

export type StateStore = typeof initialState;

export type StateActionTypeToggle = {
  type: typeof STATE_KIND_TOGGLE;
  kind: number;
}

type Action = StateActionTypeToggle;

export default function (state: StateStore = initialState, action: Action): StateStore {
  switch (action.type) {
    case STATE_KIND_TOGGLE:
      return state.set('kind', action.kind);
    default:
      return state;
  }
}

