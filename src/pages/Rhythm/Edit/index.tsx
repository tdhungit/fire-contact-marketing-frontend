import { defaultRules } from '@/config/form';
import { getRhythm, saveRhythm, updateRhythm } from '@/services/api/rhythms';
import { PageContainer, ProCard, ProForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import { message } from 'antd';
import React, { useState } from 'react';

const RhythmEdit = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');

  const onFinish = async (values: any) => {
    message.loading('saving...', 0);
    if (id) {
      await updateRhythm(id, values);
    } else {
      await saveRhythm(values);
    }
    history.push('/rhythm');
    message.destroy();
  };

  return (
    <PageContainer title={false}>
      <ProCard title={title}>
        <ProForm
          grid={true}
          onFinish={onFinish}
          request={async () => {
            if (id) {
              const result = await getRhythm(id);
              setTitle(result?.document?.name);
              return result.document;
            }
            setTitle('Create Rhythm');
            return {};
          }}
        >
          <ProFormText
            colProps={{ md: 12 }}
            name="name"
            label="Name"
            rules={[defaultRules.required]}
          />
          <ProFormSelect
            colProps={{ md: 12 }}
            name="status"
            label="Status"
            valueEnum={{
              Active: 'Active',
              Inactive: 'Inactive',
            }}
          />
          <ProFormTextArea
            name="description"
            label="Description"
          />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default RhythmEdit;