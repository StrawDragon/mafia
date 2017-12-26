import * as React from 'react';
import { Layout } from 'antd';
import styles from './body.css';

export class LayoutBody extends React.Component {
  render() {
    return (
      <Layout className={styles.body}>
        {this.props.children}
      </Layout>
    );
  }
}
