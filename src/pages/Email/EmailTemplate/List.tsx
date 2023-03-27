import { getEmailTemplates } from '@/services/api/emailTemplate';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import React from 'react'

const EmailTemplateList = () => {
  return (
    <PageContainer title={false}>
      <ProTable
        headerTitle="Email Templates"
        request={async (params = {}, sort, filter) => {
          const options = { ...params, sort, filter, page: params.current };
          const res = await getEmailTemplates(options);
          return {
            data: res.documents,
          };
        }}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            render: (text, row: any) => {
              return (
                <a
                  onClick={() => {
                    history.push(`/email-template/edit/${row.id}`);
                  }}
                >
                  {text}
                </a>
              );
            }
          },
          {
            title: 'Subject',
            dataIndex: 'subject',
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt',
            valueType: 'dateTime',
          },
        ]}
      />
    </PageContainer>
  );
};

export default EmailTemplateList;