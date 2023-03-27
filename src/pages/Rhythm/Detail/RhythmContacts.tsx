import ChooseContactsModal from '@/components/ChooseContactsModal';
import { getRhythmContacts, saveRhythmContacts } from '@/services/api/rhythms';
import { PlusCircleFilled } from '@ant-design/icons';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';

interface RhythmContactsProps {
  rhythmId: string;
  afterSave: any;
}

const RhythmContacts = ({ rhythmId, afterSave }: RhythmContactsProps) => {
  const actionRef = useRef<ActionType>();
  
  const [isAdd, setIsAdd] = useState(false);

  const onSelectedContacts = async (rows: any) => {
    message.loading('saving...', 0);
    let contactIds = [];
    for (let stepId in rows) {
      contactIds.push(stepId);
    }
    await saveRhythmContacts(rhythmId, contactIds);
    setIsAdd(false);
    afterSave(contactIds);
    message.destroy();
    actionRef.current?.reload();
  };

  return (
    <>
      <ChooseContactsModal open={isAdd} onOpenChange={setIsAdd} onFinish={onSelectedContacts} />
      <ProTable
        actionRef={actionRef}
        headerTitle={false}
        search={false}
        options={{
          fullScreen: false,
          reload: false,
          setting: false, 
          density: false,
          search: true,
        }}
        toolbar={{
          actions: [
            <Button 
              type="primary" 
              key="add_contacts"
              onClick={() => setIsAdd(true)}
            >
              <PlusCircleFilled /> Add Contacts
            </Button>
          ]
        }}
        request={async (params = {}, sort, filter) => {
          const options = { ...params, sort, filter, page: params.current };
          const result = await getRhythmContacts(rhythmId, options);
          return {
            data: result,
          };
        }}
        columns={[
          {
            title: 'Email',
            dataIndex: 'email',
          },
          {
            title: 'First Name',
            dataIndex: 'firstName',
          },
          {
            title: 'Last Name',
            dataIndex: 'lastName',
          }
        ]}
      />
    </>
  );
};

export default RhythmContacts;