import { getEmailTemplates } from '@/services/api/emailTemplate';
import { createRhythmStep, getRhythmSteps, updateRhythmStep } from '@/services/api/rhythms';
import { ModalForm, ProFormDatePicker, ProFormDependency, ProFormDigit, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import React, { useState, useEffect, useRef } from 'react';

interface AddStepModalProps {
  open: boolean;
  onOpenChange: any;
  onFinish: any;
  rhythm: string;
  step?: any;
};

const AddStepModal = ({ step, rhythm, open, onOpenChange, onFinish }: AddStepModalProps) => {
  const formRef = useRef<ProFormInstance>();

  const [title, setTitle] = useState('Create Step');

  useEffect(() => {
    setTitle(step?.name || 'Create Step');
    formRef.current?.setFieldsValue(step);
  }, [step]);

  const onSave = async (values: any) => {
    message.loading('saving...', 0);
    if (step && step.id) {
      await updateRhythmStep(step.id, values);
    } else {
      await createRhythmStep(rhythm, values);
    }
    onFinish(values);
    message.destroy();
  };

  return (
    <ModalForm
      formRef={formRef}
      title={title}
      grid={true}
      open={open}
      onOpenChange={onOpenChange}
      onFinish={onSave}
    >
      <ProFormText 
        colProps={{ md: 12 }}
        name="name"
        label="Name"
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
      <ProFormSelect
        colProps={{ md: 6 }}
        name="runType"
        label="Run Type"
        valueEnum={{
          'ElapsedDays': 'Elapsed Days',
          'ElapsedHours': 'Elapsed Hours',
          'ExactDate': 'Exact Date',
        }}
      />
      <ProFormDependency name={[ 'runType' ]}>
        {({ runType }) => {
          switch (runType) {
            case 'ElapsedDays':
              return <ProFormDigit name="days" label="Days" colProps={{ md: 6 }} />;
            case 'ExactDate':
              return <ProFormDatePicker name="runAt" label="Run At" colProps={{ md: 6 }} />;
            default:
              return <ProFormText label="Choose Hours" disabled colProps={{ md: 6 }} />;
          }
        }}
      </ProFormDependency>
      <ProFormDigit name="hours" label="Hours" colProps={{ md: 6 }} />
      <ProFormSelect
        colProps={{ md: 6 }}
        name="minutes"
        label="Minutes"
        valueEnum={{
          '0': '00',
          '15': '15',
          '30': '30',
          '45': '45',
        }}
      />
      <ProFormSelect
        name="emailTemplateId"
        label="Email Template"
        request={async () => {
          let ems: any = [];
          const emRes = await getEmailTemplates({});
          emRes.documents.forEach((document: any) => {
            ems.push({ label: document.name, value: document.id });
          });
          return ems;
        }}
      />
      <ProFormSelect
        colProps={{ md: 12 }}
        name="relateStepId"
        label="Relate Step"
        request={async () => {
          let rs: any = [];
          const emRes = await getRhythmSteps(rhythm);
          emRes.documents.forEach((document: any) => {
            rs.push({ label: document.name, value: document.id });
          });
          return rs;
        }}
      />
      <ProFormDependency name={[ 'relateStepId' ]}>
        {({ relateStepId }) => {
          if (relateStepId) {
            return (
              <ProFormSelect
                colProps={{ md: 12 }}
                name="relateAction"
                label="Relate Action"
              />
            );
          }
          return <ProFormText colProps={{ md: 12 }} label="Relate Action" disabled />;
        }}
      </ProFormDependency>
    </ModalForm>
  );
};

export default AddStepModal;
