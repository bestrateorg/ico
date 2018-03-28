// @flow
'use strict';

export function calculateStep(width: number): number {
  if (width >= 982) {
    return 3;
  } else if (width >= 800) {
    return 2;
  } else if (width >= 605) {
    return 1;
  } else if (width >= 290) {
    return 0;
  } else if (width >= 300) {
    return -1;
  } else {
    return -2;
  }
}
