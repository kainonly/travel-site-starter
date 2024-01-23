import { Card, Col, Flex, Result, Row, Statistic } from 'antd';
import React from 'react';

export default function Page() {
  return (
    <Flex gap={12} vertical>
      <Row gutter={12}>
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
        <Col flex={1}>
          <Card style={{ height: 120 }}>
            <Statistic title="异常的端点" valueStyle={{ color: '#cf1322' }} value={0} />
          </Card>
        </Col>
      </Row>
      <Card style={{ minHeight: 300 }}>
        <Result status="success" title="未发现问题" subTitle="系统服务状态一切正常" />
      </Card>
    </Flex>
  );
}
