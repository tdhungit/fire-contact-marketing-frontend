import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card } from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card title="Welcome"></Card>
    </PageContainer>
  );
};

export default Welcome;
