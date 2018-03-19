// @flow
'use strict';

const supportPageOffset = window.pageXOffset !== undefined;
const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');

export function scrollPosition(): { top: number, left: number } {
  return {
    // $FlowFixMe
    top  : supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop,
    // $FlowFixMe
    left : supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft
  }
}
