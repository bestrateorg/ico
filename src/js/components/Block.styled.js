// @flow
'use strict';

import styled from 'styled-components';
import {$WrapItemButton} from 'components/GroupItem.styled';

export const $Block = styled.div`
  #bestratewidget &{
    display: flex !important;
    align-items: flex-end !important;
    
    &.brw_amount {
      flex-direction: row !important;
      flex-wrap: ${props => props.step > 1 ? 'nowrap' : 'wrap'} !important;
    
      .brw_input-amount {
        flex: ${props => props.step <= 0 ? '1 1 100%' : props.step === 1 ? '1 1 50%' : '1 1 auto'} !important;
        margin-top: 0 !important;
        padding-right: ${props => props.step <= 0 ? 0 : props.step === 1 ? '20px' : props.step < 3 ? '7px' : '13px'} !important;
      }
      
      .brw_ratio {
        flex: ${props => props.step <= 0 ? '1 1 100%' : props.step === 1 ? '1 1 50%' : '0 0 auto'} !important;
        margin-top: ${props => props.step <= 0 ? '24px' : '0'} !important;
        padding-left: ${props => props.step <= 0 ? 0 : props.step === 1 ? '20px' : props.step < 3 ? '7px' : '13px'} !important;
      }
    }
    
    &.brw_deposit_0 {
      flex-direction: row !important;
      flex-wrap: ${props => props.step > 1 ? 'nowrap' : 'wrap'} !important;
      
      
      .brw_input-deposit {
        flex: ${props => props.step <= 0 ? '1 1 100%' : props.step === 1 ? '1 1 50%' : '1 1 auto'} !important;
        margin-top: 0 !important;
        padding-right: ${props => props.step <= 0 ? 0 : props.step === 1 ? '20px' : props.step < 3 ? '7px' : '13px'} !important;        
      }
      
      .brw_submit {
        flex: ${props => props.step <= 0 ? '1 1 100%' : props.step === 1 ? '1 1 50%' : '0 0 auto'} !important;
        margin-top: ${props => props.step <= 0 ? '24px' : '0'} !important;
        padding-left: ${props => props.step <= 0 ? 0 : props.step === 1 ? '20px' : props.step < 3 ? '7px' : '13px'} !important; 
        
        ${$WrapItemButton} {
          width: 100% !important;
        }
      }
    }
    
    &.brw_result {
    
      flex-direction: row !important;
      flex-wrap: ${props => props.step > 1 ? 'nowrap' : 'wrap'} !important;
      
      align-items: flex-end !important;
      justify-content: ${props => props.step === 1 ? 'center' : 'stretch' } !important;
    
      .brw_group {
        flex: 1 1 auto !important;
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: wrap !important;
        justify-content: stretch !important;
        align-items: flex-end !important;
      }
      
      .brw_ratio {
        margin-top: 0 !important;
        padding-right: ${props => props.step <= 0 ? 0 : props.step === 1 ? '20px' : props.step < 3 ? '7px' : '13px'} !important;
        flex: ${props => props.step <= 0 ? '1 1 100%' : '1 1 50%' } !important;      
      }
    
      .brw_amount {
        flex: ${props => props.step <= 0 ? '1 1 100%' : '1 1 50%' } !important;
        padding-right: ${props => props.step <= 1 ? 0 : props.step < 3 ? '7px' : '13px' } !important;
      }
      
      .brw_ratio + .brw_amount{
        margin-top: ${props => props.step <= 0 ? '24px' : 0} !important;
        padding-left: ${props => props.step <= 0 ? 0 : props.step === 1 ? '20px' : props.step < 3 ? '7px' : '13px' } !important;
      }
      
      .brw_submit {
        flex: ${props => props.step <= 1 ? '1 1 100%' : '0 0 auto'} !important;     
        margin-top: ${props => props.step <= 1 ? '24px' : 0} !important; 
        padding-left: ${props => props.step <= 1 ? 0 : props.step < 3 ? '7px' : '13px' } !important;
      }
      
      .brw_bonus_group {
        flex: 1 1 100% !important;
        display: flex !important;
        flex-flow: row wrap !important;
        margin-top: 24px !important;
        
        .brw_bonus {
          flex: ${props => props.step <= 0 ? '1 1 100%' : '1 1 50%'} !important;     
          padding-right: ${props => props.step <= 0 ? 0 : '20px' } !important;
          box-sizing: border-box !important;
        }
        
        .brw_submit {
          flex: ${props => props.step <= 0 ? '1 1 100%' : '1 1 50%'} !important;     
          margin-top: ${props => props.step <= 0 ? '24px' : 0} !important; 
          padding-left: ${props => props.step <= 0 ? 0 : '20px' } !important;
          box-sizing: border-box !important;
        }
      }
    }
  }
`;

// export const $BlockError = styled.div`
//   #bestratewidget & {
//     position: absolute !important;
//     bottom: 3px !important;
//     left: 0 !important;
//     width: 100% !important;
//     text-align: center !important;
//     padding: 0 30px !important;
//     box-sizing: border-box !important;
//   }
// `;

// > div + div{
//   ${props => props.row ? `margin-left: 40px !important;` : `margin-top: 23px !important;`}
// }
