// @flow
'use strict';

import styled from 'styled-components';

export const $DropListItem = styled.li`
  .bestratewidget-layout & {
    display: block !important;
    padding: 0 !important;
  }
`;

export const $DropListLink = styled.a.attrs({href : 'javascript:void(0)'})`
  .bestratewidget-layout & {
    text-decoration:none!important;
    font-size: 16px !important;
    line-height: 22px !important;
    
    // 67
    padding: 22px 27px 23px !important;
    display:block !important;
    &:hover{
      background: rgba(219,219,219, .1) !important;
    }
  }
`;

export const $DropListLinkTicker = styled.span`
  .bestratewidget-layout & {
    font-weight: 600 !important;
    font-size: 16px !important;
    color: #101934 !important;
    line-height: 22px !important;
    text-transform: uppercase !important; 
    
    width: 61px !important;
    display: inline-block !important;
    vertical-align: middle !important;  
  }
`;

export const $DropListLinkName = styled.span`
  .bestratewidget-layout & {
    font-weight: 500 !important;
    font-size: 16px !important;
    color: #9B9B9B !important;
    line-height: 22px !important;
    display: inline-block !important;
    vertical-align: middle !important;
  }
`;
