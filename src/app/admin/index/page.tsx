import { Card, Col, Empty, Flex, Row, Statistic } from 'antd';
import React from 'react';

export default function Page() {
  return (
    <Flex gap={12} vertical>
      <Row gutter={12}>
        <Col flex={1}>
          <Card style={{ height: 120 }} hoverable />
        </Col>
        <Col flex={1}>
          <Card style={{ height: 120 }}>
            <Statistic title="服务运行次数" value={0} />
          </Card>
        </Col>
        <Col flex={1}>
          <Card style={{ height: 120 }}>
            <Statistic title="服务运行成功次数" valueStyle={{ color: '#3f8600' }} value={0} />
          </Card>
        </Col>
        <Col flex={1}>
          <Card style={{ height: 120 }}>
            <Statistic title="服务运行失败次数" valueStyle={{ color: '#cf1322' }} value={0} />
          </Card>
        </Col>
      </Row>
      <Card style={{ minHeight: 300 }}>
        <Empty description={'没有失败的流程消息'} />
      </Card>
    </Flex>
  );
}
