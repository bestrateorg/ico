// @flow
'use strict';

import React from 'react';
import styled, {keyframes} from 'styled-components';

const KFLoaders = keyframes`
  0% {
    opacity: .47;
    transform: scale(0.3333, 0.3333);
  } 
  50% {
    opacity: 1;
    transform: scale(1, 1);
  } 
  100% {
    opacity: .47;
    transform: scale(0.3333, 0.3333);
  }  
`;

const $WrapLoader = styled.div`

  height: ${props => props.size + 2 * props.margin}px;
  width: ${props => (props.size + props.margin * 2) * props.count}px;
  display: flex;
  flex-flow: row nowrap;
  transform: translate3d(0, 0, 0);
  
  margin: ${props => props.center ? '0 auto' : '0'};
  
  > span {
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    display: block;
    margin: ${props => props.margin}px;
         
    animation-name: ${KFLoaders};
    animation-iteration-count: infinite;
    animation-duration: ${props => props.time}ms;
    animation-timing-function: linear;
    
    background: ${props => (props.orange ? '#FDE033' : (props.dark ? '#101934' : (props.grey ? '#636D8B' : 'white')))};
    
  }
  
    
`;

const $DotLoader = styled.span`
  animation-delay: ${props => (-1 * props.time * (props.count - props.index / props.count)) }ms;
`;

interface Props {
  center: boolean;
  dark?: boolean;
  grey?: boolean;
  orange?: boolean;

  count: number;

  size: number;
  margin: number;

  time: number;
}

export class LoaderLine extends React.PureComponent<Props> {

  static defaultProps = {
    center : true,
    count  : 9,
    size   : 12,
    margin : 1,
    time   : 1000,
  };

  render() {
    return (
      <$WrapLoader {...this.props}>
        {this.__renderDots()}
      </$WrapLoader>
    );
  }

  __renderDots() {
    const dots = [];
    for (let i = 0; i < this.props.count; i++) {
      dots.push(<$DotLoader key={i} index={i} count={this.props.count} time={this.props.time}/>);
    }
    return dots;
  }
}
