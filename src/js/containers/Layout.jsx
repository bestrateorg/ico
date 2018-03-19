// @flow
'use strict';

import React, {Component} from 'react';
import {createPortal} from 'react-dom';

interface Props {
  children: any;
}

class Layout extends Component<Props> {

  container: ?HTMLElement;
  el: HTMLElement;

  constructor(props: Props) {
    super();

    this.container = document.body;
    this.el = document.createElement('div');
    this.el.className = 'bestratewidget-layout';
    this.el.setAttribute('style', 'position:absolute!important;top:0!important;left:0!important;width:0!important;height:0!important;');
  }

  componentDidMount() {
    if (this.container) {
      this.container.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (this.container) {
      this.container.removeChild(this.el);
    }
  }

  render() {
    return createPortal(
      this.props.children,
      this.el
    );
  }
}

export default Layout;
