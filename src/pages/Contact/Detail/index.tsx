import { getDownloadUrlFile } from '@/services/api';
import { addContactLog, getContact, getContactLogs, sendEmailToContact } from '@/services/api/contact';
import { EditOutlined, FileOutlined, MailOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProCard, ProDescriptions, ProList } from '@ant-design/pro-components';
import { Link, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Col, message, Row, Tag, Typography } from 'antd';
import CheckableTag from 'antd/es/tag/CheckableTag';
import moment from 'moment';
import React, { useState, useRef } from 'react';
import AddNoteModal from './AddNoteModal';
import SendMailModal from './SendMailModal';

const DetailContact = () => {
  const { id } = useParams();
  const logRef = useRef<ActionType>();

  const [isAddNote, setIsAddNote] = useState(false);
  const [isSendMail, setIsSendMail] = useState(false);

  const { data: contact, loading } = useRequest<any, any>(() => {
    if (id) {
      return getContact(id);
    }
    return Promise.resolve({});
  });

  const onSaveNote = async (values: any) => {
    message.loading('saving...');
    setIsAddNote(false);
    const note = {
      name: '[Note] - ' + moment().format('YYYY-MM-DD'),
      message: values.note,
      type: 'Note',
      attachments: values.attachments || [],
    };
    if (id) {
      await addContactLog(id, note);
    }
    logRef.current?.reload();
    message.destroy();
  };

  const onSendMail = async (values: any) => {
    message.loading('sending...', 0);
    setIsSendMail(false);
    if (id) {
      await sendEmailToContact(id, values);
    }
    logRef.current?.reload();
    message.destroy();
  };

  const onViewAttachment = async (attachment: any) => {
    message.loading('downloading...', 0);
    const res = await getDownloadUrlFile(attachment.path);
    window.open(res.url);
    message.destroy();
  };

  if (loading) return <>Loading...</>;

  return (
    <PageContainer title={false}>
      <AddNoteModal open={isAddNote} onOpenChange={setIsAddNote} onFinish={onSaveNote} />
      <SendMailModal open={isSendMail} onOpenChange={setIsSendMail} onFinish={onSendMail} />
      <Row gutter={10}>
        <Col span={8}>
          <ProCard 
            title={contact?.document.email}
            extra={
              <Link to={`/contact/edit/${id}`}>
                <EditOutlined />
              </Link>
            }
          >
            <ProDescriptions 
              column={1}
              dataSource={contact?.document || {}}
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
                },
                {
                  title: 'Phone',
                  dataIndex: 'phone',
                },
                {
                  title: 'Created At',
                  dataIndex: 'createdAt',
                  valueType: 'dateTime',
                },
              ]}
            />
          </ProCard>
        </Col>
        <Col span={16}>
          <ProList 
            actionRef={logRef}
            itemLayout="vertical"
            toolBarRender={() => {
              return [
                <Button key="add_note" type="primary" onClick={() => setIsAddNote(true)}>
                  <FileOutlined /> Add Note
                </Button>,
                <Button key="send_mail" type="primary" onClick={() => setIsSendMail(true)}>
                  <MailOutlined /> Send Mail
                </Button>,
              ];
            }}
            request={async () => {
              if (id) {
                const result = await getContactLogs(id);
                return Promise.resolve({ data: result.documents || [] });
              }
              return Promise.resolve({ data: [] });
            }}
            metas={{
              title: {
                dataIndex: 'name',
              },
              description: {
                dataIndex: 'message',
                search: false,
                render: function(html: any) {
                  return <div dangerouslySetInnerHTML={{ __html: html }} />;
                }
              },
              subTitle: {
                dataIndex: 'createdAt',
                render: (_, row: any) => {
                  return (
                    <Tag>
                      {moment(row.createdAt).format('YYYY-MM-DD hh:mm:ss')}
                    </Tag>
                  );
                },
                search: false,
              },
              actions: {
                render: (_, row) => {
                  let acts: any = [];
                  row.attachments.forEach((att: any) => {
                    acts.push(
                      <CheckableTag 
                        checked={true} 
                        key={att.originalname}
                        onClick={() => onViewAttachment(att)}
                      >
                        <FileOutlined /> {att.originalname}
                      </CheckableTag>
                    );
                  });
                  return acts;
                },
              },
            }}
          />
        </Col>
      </Row>
    </PageContainer>
  );
}

export default DetailContact;