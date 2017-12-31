import * as React from 'react';
import { Layout } from 'antd';
import styles from './header.css';

export class LayoutHeader extends React.Component {
  render() {
    return (
      <Layout.Header className={styles.header}>
        {this.props.children}
      </Layout.Header>
    );
  }
}