import { getContacts } from '@/services/api/contact';
import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Typography } from 'antd';
import { useRef } from 'react';

const ContactList = () => {
  const actionRef = useRef<ActionType>();

  return (
    <PageContainer title={false}>
      <ProTable
        headerTitle={'View Contacts'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={async (params = {}, sort, filter) => {
          const options = { ...params, sort, filter, page: params.current };
          const result = await getContacts(options);
          return {
            data: result.documents,
          };
        }}
        columns={[
          {
            title: 'First Name',
            dataIndex: 'firstName',
          },
          {
            title: 'Last Name',
            dataIndex: 'lastName',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            render: (text, row) => {
              return (
                <a
                  onClick={() => {
                    history.push(`/contact/detail/${row.id}`);
                  }}
                >
                  {text}
                </a>
              );
            },
          },
          {
            title: 'Phone',
            dataIndex: 'phone',
          },
          {
            title: 'Options',
            valueType: 'option',
            key: 'option',
            render: (text, record) => [
              <a
                key="edit"
                onClick={() => {
                  history.push(`/contact/edit/${record.id}`);
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
        pagination={{
          pageSize: 20,
        }}
      />
    </PageContainer>
  );
};

export default ContactList;
