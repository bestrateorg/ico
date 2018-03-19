// @flow
'use strict';

import styled from 'styled-components';

export const $BonusWrap = styled.div`
  #bestratewidget & {
    display: flex !important;
    flex-flow: row nowrap !important;
    justify-content: stretch !important;
    align-items: center !important;
    
    > div.brw_title {
      flex: 1 1 auto !important;
    }
    
    > div.brw_value {
      flex: 0 0 auto !important;
      color: white !important;
    }
  }
`;
