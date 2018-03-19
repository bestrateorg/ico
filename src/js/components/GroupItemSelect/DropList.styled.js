// @flow
'use strict';

import styled from 'styled-components';

export const $Drop = styled.div`
  .bestratewidget-layout & {
    position: absolute !important;
    height: auto !important;
    background: #FFFFFF !important;
    border: 1px solid #F8F8F8 !important;
    border-radius: 0 0 3px 3px !important;
    
    box-shadow: inset 0 20px 30px -30px rgba(0, 0, 0, .1), 1px 2px 3px rgba(0,0,0,.1) !important;
    box-sizing: border-box !important;
    
    
    display: none !important;
    
  }
`;

export const $DropLoader = styled.div`
  .bestratewidget-layout & {
    padding: 30px 0 !important;
  }
`;

export const $DropEmpty = styled.div`
  .bestratewidget-layout & {
    padding: 22px 27px 23px !important;
    font-size: 16px !important;
    line-height: 22px !important;
    color: black !important;
    font-weight: 300 !important;
  }
`;

export const $DropList = styled.ul`
  .bestratewidget-layout & {
    list-style: none !important;
    padding: 0 !important;
    margin: 0 !important;
    max-height: 300px !important;
    overflow-y: auto !important;
  }
`;
