// @flow
'use strict';


import type {Action} from 'server/reducers/root.actions';
import type {Store} from 'server/reducers/root';

export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => Store;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
