import { defaultRules } from '@/config/form';
import { uploadFile } from '@/services/api';
import { UploadOutlined } from '@ant-design/icons';
import { ModalForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { Button, message, Typography, Upload } from 'antd';
import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SendMailModal = ({ open, onOpenChange, onFinish }: any) => {
  const ref = useRef<ProFormInstance>();
  const editorRef = useRef<any>();

  const [attachments, setAttachments] = useState<any>([]);
  const [fileList, setFileList] = useState<any>([]);

  const onUpload = async ({ onSuccess, onError, file }: any) => {
    message.loading('uploading...', 0);
    setFileList((f: any) => [ ...f, file ]);
    const res = await uploadFile(file);
    setAttachments((a: any) => [
      ...a,
      {
        mimetype: res.mimetype,
        originalname: res.originalname,
        path: res.path,
      }
    ]);
    onSuccess(null, file);
    message.destroy();
  };

  const handleSubmit = async (values: any) => {
    onFinish({ ...values, attachments, message: editorRef.current?.value });
    ref.current?.resetFields();
    setFileList([]);
    setAttachments([]);
    editorRef.current?.editor.setContents([]);
  };

  return (
    <ModalForm
      formRef={ref}
      open={open}
      onOpenChange={onOpenChange}
      onFinish={handleSubmit}
    >
      <ProFormText
        name="subject"
        label="Subject"
        rules={[defaultRules.required]}
      />

      <div style={{ height: 300 }}>
        <Typography.Title level={5}>Message</Typography.Title>
        <ReactQuill theme="snow" style={{ height: 200 }} ref={editorRef} />
      </div>

      <Upload customRequest={onUpload} fileList={fileList || []} multiple>
        <Button icon={<UploadOutlined />}>Click to Add Attachments</Button>
      </Upload>
    </ModalForm>
  );
};

export default SendMailModal;