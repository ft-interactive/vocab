// @flow
import React, { Component } from 'react';
import type { Node } from 'react';

type Props = {
  children: Node
};

export default class App extends Component<Props> {
  props: Props;

  render() {
    return <div>{this.props.children}</div>;
  }
}
