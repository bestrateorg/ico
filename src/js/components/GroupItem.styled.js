// @flow
'use strict';

import styled from 'styled-components';

import {$WrapColumnDeposit} from 'containers/Wrapper.styled';

export const $WrapItemInput = styled.div`
  #bestratewidget &{
    //display: flex !important;
    //flex-flow: row nowrap !important;
    background: white !important;
    flex: ${props => props.fullsize ? '1 1 auto' : '0 0 auto'} !important;
    position: relative !important;
    
    input[type=text]{
      background: transparent !important;
      border: 0 !important;
      font-weight: 500 !important;
      font-size: 16px !important;
      color: #636D8B !important;
      line-height: 22px !important;
      
      padding: 25px 17px 23px !important;
      box-sizing: border-box !important;
      display: block !important;
      width: 100% !important; 
    }
  }
  
  #bestratewidget ${$WrapColumnDeposit} &{
    background: rgba(256, 256, 256, 0.73) !important;
    color: #101934 !important;
    border: 1px solid white !important;
    
    input[type=text]{
      padding: 24px 16px 22px !important;
    }
  }
`;

export const $WrapItemText = styled.div`
  #bestratewidget &{
    flex: ${props => props.fullsize ? '1 1 auto' : '0 0 auto'} !important;
    color: #636D8B !important;
    border: 1px solid #636D8B !important;  
    line-height: 22px !important; 
   
    padding: 24px 16px 22px !important; 
    overflow: hidden !important;
  }
  #bestratewidget ${$WrapColumnDeposit} &{
    background: rgba(256, 256, 256, 0.73) !important;
    color: #101934 !important;
    border-color: white !important;
  }
`;

export const $ItemTextLoader = styled.div`
  #bestratewidget & {
    padding: 4px 0 !important;
  }
`;

export const $ItemText = styled.div`
  #bestratewidget & {
    text-transform: ${props => props.uppercase ? 'uppercase' : 'none'} !important;
  }
`;

export const $TextEllipsis = styled.div`
  #bestratewidget & {
    overflow: hidden !important;  
    white-space: nowrap !important; 
    text-overflow: ellipsis !important;
  }
`;

export const $WrapItemSelect = styled.div`

  #bestratewidget & {
  
    cursor: pointer !important;
    flex: ${props => props.fullsize ? '1 1 auto' : '0 0 auto'} !important;
    background: white !important;
    display: flex !important;
    flex-flow: row nowrap !important;
    padding: 25px 17px 23px !important;
    user-select: none !important;
    
    
      
    > span {
      /* BTC: */
      font-weight: 500 !important;
      font-size: 16px !important;
      line-height: 22px !important;
      color: #101934 !important;
      text-transform: uppercase !important;
      
      &.brwdgt-cur {
        min-width: 42px !important;
        margin-right: 5px !important;
      }
      
      &.brwdgt-ico {
        width: 15px !important;
        height: 22px !important;
        display: inline-block !important;
        position: relative !important;
        transform: ${props => props.open ? 'translate(0, -1px) rotate(-90deg)' : 'rotate(0)'} !important;
        
        > svg {
          position: absolute !important;
          width: 15px !important;
          height: 9px !important;
          top: 0 !important;
          bottom: 0 !important;
          margin: auto !important;
        }
      }
      
    }
    
    svg {
      height: 9px !important;
    }
  }
`;

export const $WrapItemButton = styled.div`
  #bestratewidget &{
    flex: ${props => props.fullsize ? '1 1' : '0 0'} ${props => props.stretch ? '100%' : 'auto'} !important;
    
    > button, > a {
      text-decoration: none !important;
      text-align: center !important;
      background: #FFE533 !important;
      border: 0 !important;
      font-weight: 500 !important;
      font-size: 16px !important;
      color: black !important;
      line-height: 22px !important;
      border-radius: 4px !important;
      
      padding: 25px 31px 23px !important;
      box-sizing: border-box !important;
      display: block !important;
      width: 100% !important; 
      
      box-shadow: none !important;
      
      &:visited {
        color: black !important;
      }
      
      > span {
        color: #636D8B !important;
      }
      
      
      &:hover {
        background: rgba(256,256,256,.85) !important;
      }
      
      &:disabled, &.disabled {
        background:  #636D8B !important;
        border-color: #636D8B !important;
        opacity: .5 !important;
        cursor: default !important;
        
        > span {
          color: #101934 !important;
        }
      }
    }
  }
  #bestratewidget ${$WrapColumnDeposit} &{
    > button, > a {
      background: #101934 !important;
      color: white !important;
      
      &:visited {
        color: white !important;
      }
      
      &:hover{
      
      }
    }
  }
`;
