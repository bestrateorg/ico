// @flow
'use strict';

import styled from 'styled-components';

export const $BoxItem = styled.div`
  color: rgb(99, 109, 139);
  line-height: 22px;
  flex: ${props => props.full ? ('1 1 100%') : props.fix ? '0 0 auto' : '1 1 auto'};
  border: 1px solid rgb(99, 109, 139);
  padding: 24px 16px 22px;
  overflow: hidden;
  box-sizing: border-box;
`;

export const $BoxItemSelectTitle = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: rgb(16, 25, 52);
  text-transform: uppercase;
  text-align: center;
  min-width: 42px;
  margin-right: 7px;
  box-sizing: border-box;
`;
export const $BoxItemSelectIcon = styled.span`
  width: 9px;
  display:block;
  
  svg {
    position: absolute;
    width: 10px;
    height: 5px;
    top: 0;
    bottom: 0;
    margin:auto;  
    transform: ${props => props.open ? 'rotateZ(-90deg)' : 'rotateZ(0)'};
    transition: transform .2s ease;
  }
`;

export const $BoxItemSelect = styled.div`
  position: relative;
  z-index: 1;
  flex: ${props => props.full ? '1 1 100%' : '0 0 auto'};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  background: white;
  padding: 25px 17px 23px;
  
  box-shadow: 0 0 15px 0 rgba(0,0,0,0.16);
  box-sizing: border-box;
`;

export const $BoxItemInput = styled.div`
  position: relative;
  z-index: 0;
  flex: 1 1 auto;
  color: rgb(16, 25, 52);
  background: rgba(255, 255, 255, 0.73);
  border: 1px solid white;
  
  > input {
    font-family: "Avenir Next", sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: rgb(99, 109, 139);
    line-height: 22px;
    box-sizing: border-box;
    display: block;
    position: relative;
    width: 100%;
    background: transparent;
    border: 0;
    padding: 24px 16px 22px;
    outline: none;
    box-shadow: none;
    
    
    &::placeholder {
      font-weight: 400;
    }
    
    &:focus {
    
    }
  }
`;
