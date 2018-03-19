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
  #bestratewidget &, .bestratewidget-layout &{

    height: ${props => props.size + 2 * props.margin}px !important;
    width: ${props => (props.size + props.margin * 2) * props.count}px !important;
    display: flex !important;
    flex-flow: row nowrap !important;
    transform: translate3d(0, 0, 0) !important;
    
    margin: ${props => props.center ? '0 auto' : '0'} !important;
    
    > span {
      width: ${props => props.size}px !important;
      height: ${props => props.size}px !important;
      display: block !important;
      margin: ${props => props.margin}px !important;
           
      animation-name: ${KFLoaders} !important;
      animation-iteration-count: infinite !important;
      animation-duration: ${props => props.time}ms !important;
      animation-timing-function: linear !important;
      
      background: ${props => (props.orange ? '#FDE033' : (props.dark ? '#101934' : (props.grey ? '#636D8B' : 'white')))} !important;
      
    }
    
    //&.dark > span {
    //  background: #101934 !important;
    //}
    
    //&.orange > span {
    //  background: #FDE033 !important;
    //}
    
    //&.center {
    //  margin: 0 auto !important;
    //}
    
  }
`;

const $DotLoader = styled.span`
  #bestratewidget &, .bestratewidget-layout &{
    animation-delay: ${props => (-1 * props.time * (props.count - props.index / props.count)) }ms !important;
  }
`;

interface Props {
  center?: boolean;
  dark?: boolean;
  grey?: boolean;
  orange?: boolean;

  count?: number;

  size?: number;
  margin?: number;

  time?: number;
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
    // $FlowFixMe
    for (let i = 0; i < this.props.count; i++) {
      dots.push(<$DotLoader key={i} index={i} count={this.props.count} time={this.props.time}/>);
    }
    return dots;
  }
}

//
// export function LoaderLine(props: Props) {
//   let className = 'loader';
//   if (props.dark)
//     className = className + ' dark';
//   if (props.orange)
//     className = className + ' orange';
//   if (props.center)
//     className = className + ' center';
//
//   const props = {
//     count : props.count || 9,
//   }
//
//   return (
//     <$WrapLoader className={className}>
//       123
//     </$WrapLoader>
//   );
// };
