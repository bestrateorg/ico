// @flow
'use strict';

import styled from 'styled-components';

export const $Wrapper = styled.div`
  position: relative;
    
  font-family: "Avenir Next", sans-serif;
  font-size: 16px;
  line-height: 22px;
  color: rgba(0, 0, 0, .5);
  
  background: #FCF53C linear-gradient(-47deg, #FCF53C 0%, #FADC30 39%, #FADB2F 41%, #FAD82D 46%, #F8B51C 100%);
  border: 1px solid #E2C050;
  border-radius: 5px;
  
  display: flex;
  flex-flow: row wrap;
  justify-content: stretch;
  align-items: stretch;
  min-width: 180px;
  
`;

export const $WrapperDeposit = styled.div`
  flex: ${props => (props.step < 2 ? '1 0 100%' : (props.step === 2 ? '1 0 33.25%' : '1 0 30.15%'))};
  width: ${props => (props.step < 2 ? '100%' : (props.step === 2 ? '33.25%' : '30.15%')) };
  background: transparent;
  padding: ${props => props.step < 0 ? '14px 15px 16px' : '30px 33px 34px'};
  box-sizing: border-box;
`;

export const $WrapperResult = styled.div`
  flex: 1 ${props => props.step < 2 ? '0 100%' : (props.step === 2 ? '0 66.75%' : '0 69.85%')};
  width: ${props => props.step < 2 ? 'auto' : (props.step === 2 ? '66.75%' : '69.85%')};
  background: #101934;
  color: rgba(255, 255, 255, .5);
  padding: ${props => props.step < 0 ? '15px 16px 17px' : '31px 34px 35px'};
  margin: ${props => props.step < 2 ? '0 -1px -1px -1px' : '-1px -1px -1px 0'};
  border-radius: ${props => props.step < 2 ? '0 0 5px 5px' : '0 5px 5px 0'};
  box-sizing: border-box;
`;

export const $Logo = styled.a.attrs({
  href   : 'https://bestrate.org',
  target : '_blank',
  title  : 'Go to bestrate.org'
})`

  position: absolute !important;
  top: ${props => props.step < 0 ? '17px' : '30px'} !important;
  right: ${props => props.step < 0 ? '13px' : '31px'} !important;
  cursor: pointer !important; 

  > svg {
    width: 80px !important; 
    height: 20px !important;
    opacity: .9 !important;
    
    .logo {
       fill: ${props => props.white ? '#FFFFFF' : '#000000'} !important;
    }
  }
  
  &:hover {
    > svg {
      opacity: 1 !important;
    }
  }
`;

export const $Error = styled.div`
  display: block;
  position: absolute;
  
  
  width: 100%;
  bottom: 5px;
  box-sizing: border-box;
  text-align: center;
  padding: 0 10px;
  
  @media(min-width: 768px){
    padding: 0 60px;
  }
  
  > span{
    font-weight: 500;
    font-size: 14px;
    color: #fff;
    line-height: 16px;
    background: #d0021b;
    border-radius: 5px;
    padding: 3px 10px 2px;
  }
`;
