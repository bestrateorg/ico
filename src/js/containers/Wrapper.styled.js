// @flow
'use strict';

import styled from 'styled-components';


export const WrapColumnAmount = styled.div`
  #bestratewidget &{
    flex: 1 1 auto !important;
    background: #101934 !important;
    color: rgba(255, 255, 255, .5) !important;
    padding: ${props => props.step < 0 ? '15px 16px 17px' : '31px 34px 35px'} !important;
    margin:  ${props => props.step < 2 ? '-1px -1px 0 -1px' : '-1px 0 -1px -1px'}  !important;
    border-radius: ${props => props.step < 2 ? '5px 5px 0 0' : '5px 0 0 5px'} !important;
    box-sizing: border-box !important;
  }
`;

export const $WrapColumnDeposit = styled.div`
  #bestratewidget &{
    // kind 1 step 0-1 100% step 2 '33.25%' step 3 '30.15%'
    // kind new step 0-1 100% 
    flex: 1 ${props => props.kind === 1 ? (props.step < 2 ? '0 100%' : (props.step === 2 ? '0 33.25%' : '0 30.15%')) : '1 auto'} !important;
    width: ${props => props.kind === 1 ? (props.step < 2 ? '100%' : (props.step === 2 ? '33.25%' : '30.15%')) : 'auto'} !important;
    //height: 100% !important;
    background: transparent !important;
    padding: ${props => props.step < 0 ? '14px 15px 16px' : '30px 33px 34px'} !important;
    box-sizing: border-box !important;
  }
`;

export const WrapColumnResult = styled.div`
  #bestratewidget &{
    // kind 1 step 0-1 100% step 2 '66.75%' step 3 '69.85%'
    flex: 1 ${props => props.step < 2 ? '0 100%' : (props.step === 2 ? '0 66.75%' : '0 69.85%')} !important;
    width: ${props => props.step < 2 ? 'auto' : (props.step === 2 ? '66.75%' : '69.85%')} !important;
    background: #101934 !important;
    color: rgba(255, 255, 255, .5) !important;
    padding: ${props => props.step < 0 ? '15px 16px 17px' : '31px 34px 35px'} !important;
    margin: ${props => props.step < 2 ? '0 -1px -1px -1px' : '-1px -1px -1px 0'} !important;
    border-radius: ${props => props.step < 2 ? '0 0 5px 5px' : '0 5px 5px 0'} !important;
    box-sizing: border-box !important;
  }
`;

export const $Wrapper = styled.div`
  #bestratewidget &{
    position: relative !important;
    
    font-size: 16px !important;
    color: rgba(0, 0, 0, .5) !important;
    line-height: 22px !important;
    
    /* Rectangle 5: */
    background: #FCF53C linear-gradient(-47deg, #FCF53C 0%, #FADC30 39%, #FADB2F 41%, #FAD82D 46%, #F8B51C 100%) !important;
    border: 1px solid #E2C050 !important;
    border-radius: 5px !important;
    
    display: flex !important;
    flex-flow: row ${props => props.step < 2 ? 'wrap' : 'nowrap'} !important;
    justify-content: ${props => props.step < 2 ? 'flex-start' : 'stretch'} !important;
    align-items: flex-end !important;
    
    > ${WrapColumnResult}, > ${$WrapColumnDeposit}, > ${WrapColumnResult}{
      position: relative !important;  
    }
  }
`;

export const $WrapError = styled.div`
  #bestratewidget & {
    position: absolute !important;
    bottom: 3px !important;
    left: 0 !important;
    width: 100% !important;
    text-align: center !important;
  }
`;
