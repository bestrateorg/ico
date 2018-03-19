// @flow
'use strict';

import styled from 'styled-components';

export const $WrapGroupBox = styled.div`
  #bestratewidget &{
    box-sizing: border-box !important;
    flex: ${props => props.fullsize ? '1 1 auto' : '0 0 auto'} !important;
  }
`;

export const $TitleGroupBox = styled.div`
  #bestratewidget &{
    margin-bottom: 13px !important;
    color: ${props => props.bonus ? 'white' : 'inherit'} !important;
  }
`;
