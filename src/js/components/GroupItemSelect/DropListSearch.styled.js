// @flow
'use strict';

import styled from 'styled-components';

export const $WrapSearch = styled.div`
  .bestratewidget-layout & {
    position: relative !important;
    border-bottom: 1px solid #F8F8F8 !important;
    width: 100% !important;  
      
    input[type=text] {
      display: block !important;
      box-sizing: border-box !important;
      width: 100% !important;

      font-weight: 400 !important;      
      font-size: 16px !important;
      color: #000000 !important;
      
      border: 0 !important;
      
      padding: 21px 45px 21px 24px !important; 
      background: transparent !important;
      position: relative !important;
      z-index: 1 !important;
      
      &::placeholder {
        font-weight: 300 !important;      
        color: #ABABAB !important;
      }
    }
    > span {
      display: block !important;  
      position: absolute !important;
      top: 0 !important;
      right: 14px !important;
      bottom: 0 !important;
      margin: auto !important;
      width: 19px !important;
      height: 19px !important;
      z-index: 0 !important;
      
      svg {
        width: 19px !important;
        height: 19px !important;
      }
    }
  }
`;
