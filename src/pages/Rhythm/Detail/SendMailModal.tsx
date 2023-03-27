import { getEmailTemplates } from '@/services/api/emailTemplate';
import { sendMailToRhythm } from '@/services/api/rhythms';
import { ModalForm, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { template } from 'lodash';
import React, { useState, useRef } from 'react';

interface SendMailModalProps {
  rhythmId: string;
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  onFinish: (values: any) => void;
}

const SendMailModal = ({ rhythmId, open, onOpenChange, onFinish }: SendMailModalProps) => {
  const formRef = useRef<ProFormInstance>();

  const [templates, setTemplates] = useState<any>({});
  const [template, setTemplate] = useState<any>({});
  const [mailContent, setMailContent] = useState('');

  const onSend = async (values: any) => {
    if (template && template.id) {
      message.loading('sending...');
      await sendMailToRhythm(rhythmId, template.id);
      onFinish({ emailTemplate: template });
      message.destroy();
      message.success('Add to queue mail success!');
    }
  };

  return (
    <ModalForm
      formRef={formRef}
      open={open}
      onOpenChange={onOpenChange}
      onFinish={onSend}
    >
      <ProFormSelect
        name="emailTemplateId"
        label="Email Template"
        request={async () => {
          let ems: any = [];
          const emRes = await getEmailTemplates({});
          let tem: any = {};
          emRes.documents.forEach((document: any) => {
            ems.push({ label: document.name, value: document.id });
            tem[document.id] = document;
          });
          setTemplates(tem);
          return ems;
        }}
        fieldProps={{
          onChange: (value: string) => {
            const selectedTem = templates[value];
            formRef.current?.setFieldValue('subject', selectedTem.subject);
            setMailContent(selectedTem.content);
            setTemplate(selectedTem);
          }
        }}
      />
      <ProFormText
        name="subject"
        label="Subject"
        disabled
      />

      <div 
        dangerouslySetInnerHTML={{ __html: mailContent }}
        style={{
          maxHeight: 400,
          overflowX: 'hidden',
          overflowY: 'visible',
        }}
      />
    </ModalForm>
  );
};

export default SendMailModal;