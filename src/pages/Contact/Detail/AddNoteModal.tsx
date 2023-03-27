import { defaultRules } from '@/config/form';
import { uploadFile } from '@/services/api';
import { UploadOutlined } from '@ant-design/icons';
import { ModalForm, ProFormInstance, ProFormTextArea } from '@ant-design/pro-components';
import { Button, message, Typography, Upload } from 'antd';
import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddNoteModal = ({ open, onOpenChange, onFinish }: any) => {
  const [attachments, setAttachments] = useState<any>([]);
  const [fileList, setFileList] = useState<any>([]);

  const ref = useRef<ProFormInstance>();
  const editorRef = useRef<any>();

  const handleSubmit = async (values: any) => {
    onFinish({ ...values, attachments, note: editorRef.current?.value });
    ref.current?.resetFields();
    setFileList([]);
    setAttachments([]);
  };

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

  return (
    <ModalForm
      formRef={ref}
      open={open}
      onOpenChange={onOpenChange}
      onFinish={handleSubmit}
    >
      <div style={{ height: 200 }}>
        <Typography.Title level={5}>Note</Typography.Title>
        <ReactQuill theme="snow" style={{ height: 120 }} ref={editorRef} />
      </div>
      
      <Upload customRequest={onUpload} fileList={fileList || []} multiple>
        <Button icon={<UploadOutlined />}>Click to Upload Document</Button>
      </Upload>
    </ModalForm>
  );
}

export default AddNoteModal;