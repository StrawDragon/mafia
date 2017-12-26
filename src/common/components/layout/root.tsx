import * as React from 'react';
import { Layout } from 'antd';
import styles from './root.css';

export class LayoutRoot extends React.Component {
  render() {
    return (
      <Layout className={styles.layout}>
        {this.props.children}
      </Layout>
    );
  }
}
