// @flow
'use strict';

import styled from 'styled-components';

export const $Group = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${props => props.center ? 'center' : 'stretch'};
  align-items: ${props => props.center ? 'center' : 'flex-end'};
  margin: -12px -7px;
`;

