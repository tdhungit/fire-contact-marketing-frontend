import { defaultRules } from '@/config/form';
import { createContact, getContact, updateContact } from '@/services/api/contact';
import { EyeOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { history, Link, useParams } from '@umijs/max';
import { message } from 'antd';
import React, { useState } from 'react';

function ContactEdit() {
  const { id } = useParams();

  const [title, setTitle] = useState('');

  const onFinish = async (values: any) => {
    message.loading('loading...', 0);
    if (id) {
      await updateContact(id, values);
    } else {
      await createContact(values);
    }
    message.destroy();
    history.push('/contact');
  };

  return (
    <PageContainer title={false}>
      <ProCard 
        title={title}
        extra={
          <Link to={`/contact/detail/${id}`}>
            <EyeOutlined />
          </Link>
        }
      >
        <ProForm 
          grid={true} 
          onFinish={onFinish}
          request={async () => {
            if (id) {
              const result = await getContact(id);
              setTitle(result?.document?.email);
              return result.document;
            }
            return {};
          }}
        >
          <ProFormText
            colProps={{ md: 12 }}
            name="firstName"
            label="First Name"
            rules={[defaultRules.required]}
          />
          <ProFormText
            colProps={{ md: 12 }}
            name="lastName"
            label="Last Name"
            rules={[defaultRules.required]}
          />
          <ProFormText
            colProps={{ md: 12 }}
            name="email"
            label="Email"
            rules={[defaultRules.required]}
          />
          <ProFormText colProps={{ md: 12 }} name="phone" label="Phone" />

          <ProFormText colProps={{ md: 12 }} name="billingEmail" label="Billing Email" />
          <ProFormText colProps={{ md: 12 }} name="shippingEmail" label="Shipping Email" />
          
          <ProFormText colProps={{ md: 12 }} name="billingPhone" label="Billing Phone" />
          <ProFormText colProps={{ md: 12 }} name="shippingPhone" label="Shipping Phone" />

          <ProFormText colProps={{ md: 12 }} name="billingStreet1" label="Billing Street1" />
          <ProFormText colProps={{ md: 12 }} name="shippingStreet1" label="Shipping Street1" />

          <ProFormText colProps={{ md: 12 }} name="billingStreet2" label="Billing Street2" />
          <ProFormText colProps={{ md: 12 }} name="shippingStreet2" label="Shipping Street2" />

          <ProFormText colProps={{ md: 12 }} name="billingCity" label="Billing City" />
          <ProFormText colProps={{ md: 12 }} name="shippingCity" label="Shipping City" />

          <ProFormText colProps={{ md: 12 }} name="billingState" label="Billing State" />
          <ProFormText colProps={{ md: 12 }} name="shippingState" label="Shipping State" />

          <ProFormText colProps={{ md: 12 }} name="billingCountry" label="Billing Country" />
          <ProFormText colProps={{ md: 12 }} name="shippingCountry" label="Shipping Country" />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
}

export default ContactEdit;
