import { getRhythms } from '@/services/api/rhythms';
import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Typography } from 'antd';
import React, { useRef } from 'react';

const ViewRhythms = () => {
  const actionRef = useRef<ActionType>();

  return (
    <PageContainer title={false}>
      <ProTable
        headerTitle="View Rhythms"
        rowKey="id"
        request={async (params = {}, sort, filter) => {
          const options = { ...params, sort, filter, page: params.current };
          const result = await getRhythms(options);
          return {
            data: result.documents,
          };
        }}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            render: (text, row) => {
              return (
                <a
                  onClick={() => {
                    history.push(`/rhythm/detail/${row.id}`);
                  }}
                >
                  {text}
                </a>
              );
            },
          },
          {
            title: 'Status',
            dataIndex: 'status',
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt',
            valueType: 'dateTime'
          },
          {
            title: 'Options',
            valueType: 'option',
            key: 'option',
            render: (text, record) => [
              <a
                key="edit"
                onClick={() => {
                  history.push(`/rhythm/edit/${record.id}`);
                }}
              >
                <EditOutlined />
              </a>,
              <a
                key="delete"
                onClick={async () => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  actionRef.current && actionRef.current.reload();
                }}
              >
                <Typography.Text type="danger">
                  <DeleteFilled />
                </Typography.Text>
              </a>,
            ],
          },
        ]}
      >

      </ProTable>
    </PageContainer>
  );
};

export default ViewRhythms;