import { postData } from '@/services/api';
import { ProCard, ProForm, ProFormGroup, ProFormSwitch, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react'

const EmailSettings = () => {
  const onFinish = async (values: any) => {
    let data = [];
    for (let key in values) {
      if (key === 'fromName' || key === 'fromEmail') {
        data.push({
          category: 'Email',
          name: key,
          value: values[key],
        });
      } else {
        data.push({
          category: 'SMTP',
          name: key,
          value: values[key],
        });
      }
    }
    message.loading('saving...', 0);
    await postData('/settings', data);
    message.destroy();
  };

  return (
    <ProCard title="Email Settings">
      <ProForm
        grid={true}
        onFinish={onFinish}
      >
        <ProFormText colProps={{ md: 12 }} name="fromName" label="From Name" />
        <ProFormText colProps={{ md: 12 }} name="fromEmail" label="From Email" />

        <ProFormGroup title="SMTP">
          <ProFormText colProps={{ md: 12 }} name="host" label="Host" />
          <ProFormText colProps={{ md: 12 }} name="port" label="Port" />
          <ProFormText colProps={{ md: 12 }} name="username" label="Username" />
          <ProFormText colProps={{ md: 12 }} name="password" label="Password" />
          <ProFormSwitch name="secure" label="Secure" />
          <ProFormSwitch name="tls" label="TLS" />
        </ProFormGroup>
      </ProForm>
    </ProCard>
  );
};

export default EmailSettings;