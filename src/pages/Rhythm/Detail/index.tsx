import { getRhythm } from '@/services/api/rhythms';
import { EditOutlined, MailOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Link, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Col, Row, Skeleton } from 'antd';
import React, { useState } from 'react';
import AddStepModal from './AddStepModal';
import RhythmContacts from './RhythmContacts';
import RhythmLogs from './RhythmLogs';
import RhythmSteps from './RhythmSteps';
import SendMailModal from './SendMailModal';
import './styles.css';

const RhythmDetail = () => {
  const { id } = useParams<string>();

  const [isAddStep, setIsAddStep] = useState(false);
  const [isSendMail, setIsSendMail] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [selectedStep, setSelectedStep] = useState<any>(null);

  const { data, loading } = useRequest<any, any>(() => {
    if (id) {
      return getRhythm(id);
    }
    return Promise.resolve({ data: {}, loading: false });
  }, { refreshDeps: [ refresh ] });

  const afterSaveStep = () => {
    setRefresh((f: number) => f + 1);
    setIsAddStep(false);
  };

  const afterSaveContacts = () => {
    
  };

  const clickEditStep = (step: any) => {
    setSelectedStep(step);
    setIsAddStep(true);
  };

  const afterSendMail = () => {
    setIsSendMail(false);
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <PageContainer title={false} className="rhythm-detail">
      {id && 
        <AddStepModal 
          rhythm={id} 
          step={selectedStep}
          open={isAddStep} 
          onOpenChange={setIsAddStep} 
          onFinish={afterSaveStep} 
        />}
      {id &&
        <SendMailModal 
          rhythmId={id} 
          open={isSendMail} 
          onOpenChange={setIsSendMail} 
          onFinish={afterSendMail}
        />}
      <Row gutter={10}>
        <Col span={8}>
          <ProCard 
            title={data?.document?.name}
            extra={
              <>
                <Link to={`/rhythm/edit/${id}`}>
                  <EditOutlined />
                </Link>
                <Button type='link' onClick={() => setIsSendMail(true)}>
                  <MailOutlined />
                </Button>
              </>
            }
          >
            <ProDescriptions
              column={1}
              dataSource={data?.document || {}}
              columns={[
                {
                  title: 'Name',
                  dataIndex: 'name',
                },
                {
                  title: 'Status',
                  dataIndex: 'status',
                },
                {
                  title: 'Created At',
                  dataIndex: 'createdAt',
                  valueType: 'dateTime',
                },
              ]}
            />
          </ProCard>

          <RhythmSteps 
            rhythm={data} 
            clickAddStep={() => {
              setSelectedStep({});
              setIsAddStep(true);
            }}
            clickEditStep={clickEditStep}
          />
        </Col>
        <Col span={16}>
          <RhythmContacts rhythmId={id || ''} afterSave={afterSaveContacts} />
          {id && <RhythmLogs rhythmId={id} logs={data.logs || []} />}
        </Col>
      </Row>
    </PageContainer>
  );
};

export default RhythmDetail;