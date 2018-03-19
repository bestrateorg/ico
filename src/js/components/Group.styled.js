// @flow
'use strict';

import styled from 'styled-components';
import {$WrapItemInput, $WrapItemText} from 'components/GroupItem.styled';

export const $Group = styled.div`
  #bestratewidget &{
    display: flex !important;
    flex-flow: row nowrap !important;
    justify-content: center !important;
    
    > div {
      &:first-child {
        border-top-left-radius: 3px !important; 
      }
      
      &:not(.open):first-child {
        border-bottom-left-radius: 3px !important; 
      }
      
      &:last-child {
        border-top-right-radius: 3px !important; 
        border-bottom-right-radius: 3px !important;       
      }
    }
    
    ${$WrapItemInput}{
      
    }
    
    ${$WrapItemInput} + ${$WrapItemText}{
      border-left: 0 !important;
    }
    
    ${$WrapItemText} + ${$WrapItemText}{
      border-left: 0 !important;
    }
  }
`;
