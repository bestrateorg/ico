// @flow
'use strict';

import styled from 'styled-components';

export const $ErrorIcon = styled.span`
  #bestratewidget & {
    border: 1px solid #fd6533 !important;
    color: #fd6533 !important;
    border-radius: 50% !important;
    display: block !important; 
    width: 16px !important;
    height: 16px !important;
    text-align: center !important;
  }
`;

export const $ErrorMessage = styled.span`
  #bestratewidget & {
  
  }
`;

export const $ErrorWrap = styled.div`
  #bestratewidget & {
  
    position: relative !important;  
    display: inline-block !important;
    font-size: 14px !important;
    line-height: 16px !important;
    color: #fd6533 !important;
    
    background: rgba(255,255,255,.7) !important;
    border-radius: 15px !important;
    padding: 6px 15px 6px 28px !important;
    
    ${$ErrorIcon} {
      position: absolute !important;
      top: 0 !important;
      left: 6px !important;
      bottom: 0 !important;
      margin: auto !important;  
    }
    
    ${$ErrorMessage} {
    
    }
  }
`;
