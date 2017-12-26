import * as React from 'react';
import { Layout } from 'antd';
import styles from './content.css';

export class LayoutContent extends React.Component {
  render() {
    return (
      <Layout.Content className={styles.content}>
        {this.props.children}
      </Layout.Content>
    );
  }
}