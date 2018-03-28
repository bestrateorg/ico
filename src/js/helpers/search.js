// @flow
'use strict';

export function parse() {
  let query;

  if (!location.search)
    return {};

  let search = location.search.substring(1);

  const vars = search.split('&');

  query = {};

  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=');

    let key: string;
    let value: string | number | boolean;

    if (pair.length) {

      key = pair[0];
      value = true;

      if (pair.length === 2) {
        value = decodeURIComponent(pair[1]);

        if (+value) {
          value = +value;
        }

      }

      query[key] = value;

    }

  }

  return query;

}
