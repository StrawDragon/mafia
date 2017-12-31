import * as React from 'react';

export class Fragment extends React.PureComponent {
  render() {
    return this.props.children;
  }
}