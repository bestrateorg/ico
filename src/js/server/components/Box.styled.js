// @flow
'use strict';

import styled from 'styled-components';
import {$BoxItem, $BoxItemSelect, $BoxItemInput} from './BoxItem.styled';

export const $Box = styled.div`

  display: flex;
  flex-flow: row ${props => props.column ? 'wrap' : 'nowrap'};
  justify-content: stretch;
  align-items: stretch;
  overflow: hidden;
 
  > ${$BoxItem}, ${$BoxItemSelect}, ${$BoxItemInput} {
  
    & + ${$BoxItem}, & + ${$BoxItemSelect} {
      border-${props => props.column ? 'top' : 'left'}: 0;
    }
    
    &:first-child {
      border-top-left-radius: 3px;
      border-${props => props.column ? 'top-right' : 'bottom-left'}-radius: ${props => props.open && !props.column ? '0' : '3px'}; 
    }
    
    &:last-child {
      border-${props => props.column ? 'bottom-left' : 'top-right'}-radius: ${props => props.open && props.column ? '0' : '3px'};
      border-bottom-right-radius: ${props => props.open ? '0' : '3px'}; 
    }
    
  }
`;
