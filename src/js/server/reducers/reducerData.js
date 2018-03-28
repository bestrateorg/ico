// @flow
'use strict';
import {List, Map} from 'immutable';
import type {Action} from './root.actions';
import {DATA_INIT, DATA_MARKETING, FORM_CHANGE_ICO_AMOUNT} from 'server/constants/types';
import type {Options} from '../../widget';
import type {SettingsBonus} from 'types/settings';

export type DataStore = Map<string, any>;

const initialState: DataStore = Map({
  depositCurrencies : List(),

  renderBonus : false,
  bonuses     : List(),
  bonus       : '',

  widgetId   : null,
  forwardUrl : '',
});

export default function (state: DataStore = initialState, action: Action): DataStore {
  switch (action.type) {
    case FORM_CHANGE_ICO_AMOUNT:
      let bonusString: string = '';
      if (state.get('renderBonus', false)) {
        const bonuses: List<SettingsBonus> = state.get('bonuses', List());
        const result_amount: number = parseFloat(action.result_amount);
        const bonusItem: ?SettingsBonus = bonuses
          .find((item: SettingsBonus) => {
            if (result_amount >= item.from) {
              if (!item.to)
                return true;
              return result_amount < item.to;
            }
            return false;
          });
        if (bonusItem) {
          bonusString = `+${bonusItem.percent}%`;
        }
      }
      return state.set('bonus', bonusString);

    case DATA_INIT:
      const options: Options = action.options;
      return state
        .set('depositCurrencies', List(options.depositCurrencies))
        .set('widgetId', options.widgetId)
        .update((state: DataStore) => {
          if (Array.isArray(options.settings.bonus) && options.settings.bonus.length > 0) {
            return state.set('renderBonus', true)
                        .set('bonuses', List(options.settings.bonus));
          }
          return state;
        });

    case DATA_MARKETING:
      return state
        .set('forwardUrl', action.url);
    default:
      return state;
  }
}
