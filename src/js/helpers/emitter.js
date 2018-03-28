// @flow
'use strict';

export type EmitterEvent = {
  one: boolean;
  cb: (data?: any) => void;
};

const events: { [name: string]: Array<EmitterEvent> } = {};

export function on(eventName: string, cb: (data?: any) => void, one: boolean = false) {
  if (!events.hasOwnProperty(eventName))
    events[eventName] = [];
  events[eventName].push({
    one,
    cb
  });
}

export function one(eventName: string, cb: (data?: any) => void) {
  return on(eventName, cb, true);
}

export function dispatch(eventName: string, data: any = null) {
  if (events.hasOwnProperty(eventName)) {
    events[eventName] = events[eventName].filter((event: EmitterEvent) => {
      event.cb(data);
      return !event.one;
    });
  }
}


