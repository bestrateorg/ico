// @flow
'use strict';

export const Logger = {};

Logger.error = function (state:string, message: string) {
  console.error(` BestRate::Widget->${state}: ${message}`);
};

