import * as React from 'react';
import { Tabs, Card, Avatar } from 'antd';

const TabPane = Tabs.TabPane;
const { Meta } = Card as any;

class Voting extends React.Component {
  render () {
    return (
      <Tabs defaultActiveKey="5" size="small" tabPosition="left">
        <TabPane tab="День 5" key="5">
          <Card>
            <Meta
              avatar={<Avatar src="https://images.stopgame.ru/uploads/avatars/c64x64/-OD2ShYwAG2ELpwGBv7w7A/avatar_422038.jpg" />}
              title="Игрок № 1"
            />
          </Card>
        </TabPane>
        <TabPane tab="День 4" key="4">
          День 4
        </TabPane>
        <TabPane tab="День 3" key="3">
          День 3
        </TabPane>
        <TabPane tab="День 2" key="2">
          День 2
        </TabPane>
        <TabPane tab="День 1" key="1">
          День 1
        </TabPane>
    </Tabs>
    );
  }
}

export default Voting;