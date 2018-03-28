// @flow
'use strict';

import styled from 'styled-components';

export const $Link = styled.a.attrs({target : '_blank'})`
  text-align: center ;
  font-weight: 500 ;
  font-size: 16px ;
  color: black ;
  line-height: 22px ;
  box-sizing: border-box ;
  display: block ;
  width: 100% ;
  box-shadow: none ;
  text-decoration: none ;
  background: rgb(255, 229, 51) ;
  border: 0;
  border-radius: 4px ;
  padding: 25px 31px 23px ;
  
  > span {
    color: rgb(99, 109, 139);
  }
  
  &:hover{
    background: rgb(248,181,28);    
  }
`;

export const $Disabled = styled.div`
  text-align: center ;
  font-weight: 500 ;
  font-size: 16px ;
  color: rgb(64,65,87);
  line-height: 22px ;
  box-sizing: border-box ;
  display: block ;
  width: 100% ;
  box-shadow: none ;
  text-decoration: none ;
  background: rgb(99, 109, 139) ;
  border: 0;
  border-radius: 4px ;
  padding: 25px 31px 23px ;
  
  > span {
    color: #101934;
  }
`;

