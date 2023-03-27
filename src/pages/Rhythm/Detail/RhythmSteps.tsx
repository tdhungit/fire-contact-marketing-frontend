import { DiffOutlined, EditFilled } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Button, Space, Tag, Typography } from 'antd';
import moment from 'moment';
import React from 'react';

interface RhythmStepsProps {
  rhythm: any;
  clickEditStep?: any;
  clickAddStep: any;
}

const RhythmSteps = ({ rhythm, clickEditStep, clickAddStep }: RhythmStepsProps) => {
  return (
    <ProList
      headerTitle={
        <>
          Steps
          <Button key="add_step" type='link' onClick={clickAddStep}>
            <DiffOutlined />
          </Button>
        </>
      }
      style={{ marginTop: 10 }}
      dataSource={rhythm.steps}
      rowKey="id"
      metas={{
        title: {
          dataIndex: 'name',
        },
        subTitle: {
          render: (_, row: any) => {
            return (
              <Space size={0}>
                <Tag color={row.status === 'Active' ? 'blue' : 'gray'}>{row.status}</Tag>
                <Tag color="#5BD8A6">{row.runType}</Tag>
              </Space>
            );
          },
        },
        description: {
          render: (_, row: any) => {
            return (
              <>
                <Typography.Title level={5}>Run At</Typography.Title>
                <Typography.Text type='secondary'>
                  {row.runAt ? moment(row.runAt).format('YYYY-MM-DD') : row.days}
                </Typography.Text>
                <Typography.Text type='secondary'>
                  &nbsp;{row.hours}h:{row.minutes}'
                </Typography.Text>
              </>
            );
          },
        },
        actions: {
          render: (_, row: any) => [
            <Button 
              type='link'
              onClick={() =>{
                clickEditStep && clickEditStep(row);
              }}
            >
              <EditFilled />
            </Button>,
          ],
        },
      }}
    />
  );
};

export default RhythmSteps;