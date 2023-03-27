import { getContactMergeTags } from '@/services/api/contact';
import { createEmailTemplate, getEmailTemplate, updateEmailTemplate } from '@/services/api/emailTemplate';
import { FooterToolbar, PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import { message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import EmailEditor, { EditorRef } from 'react-email-editor';

const EmailTemplateEdit = () => {
  const { id } = useParams();

  const emailEditorRef = useRef<EditorRef>(null);

  const [title, setTitle] = useState('Create Email Template');
  const [template, setTemplate] = useState<any>({});

  useEffect(() => {
    getContactMergeTags()
      .then((resMergeTag: any) => {
        emailEditorRef?.current?.editor?.setMergeTags(resMergeTag);
      });
  }, [])
  

  const editorReady = () => {
    if (template && template.design) {
      emailEditorRef?.current?.editor?.loadDesign(template.design);
    }
  };

  const onFinish = async (values: any) => {
    message.loading('saving...', 0);
    emailEditorRef?.current?.editor?.exportHtml(async (data: any) => {
      const { design, html } = data;
      const postData = { ...values, content: html, design: design };
      if (id) {
        await updateEmailTemplate(id, postData)
      } else {
        await createEmailTemplate(postData);
      }
      history.push('/email-template/list');
      message.destroy();
    });
  };

  return (
    <>
      <ProForm
        grid={true}
        request={async () => {
          if (id) {
            const result = await getEmailTemplate(id);
            setTitle(result?.document?.name);
            setTemplate(result?.document);
            return result.document;
          }
          return {};
        }}
        submitter={{
          render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
        }}
        onFinish={onFinish}
      >
        <ProFormText colProps={{ md: 8 }} name="name" label="Name" />
        <ProFormText colProps={{ md: 16 }} name="subject" label="Subject" />
      </ProForm>

      <EmailEditor
        ref={emailEditorRef} 
        minHeight={550}
        onReady={editorReady}
      />
    </>
  );
};

export default EmailTemplateEdit;