// @flow
'use strict';

import styled from 'styled-components';

export const $Block = styled.div`
  flex: ${props => props.fullsize ? '1 1 100%' : (props.halfsize ? '0 1 50%' : props.fix ? '0 0 auto' : '1 1 auto')};
  padding: 12px 7px;
  box-sizing: border-box;
`;

export const $BlockTitle = styled.div`
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 13px;
  color: ${props => props.bonus ? '#fff' : 'inherit'};
`;
