import { getContacts } from '@/services/api/contact';
import { ProTable } from '@ant-design/pro-components';
import { Modal, Switch } from 'antd';
import React, {useState } from 'react';

interface ChooseContactsModalProps {
  open: boolean;
  onOpenChange: any;
  onFinish: any;
}

const ChooseContactsModal = ({ open, onOpenChange, onFinish }: ChooseContactsModalProps) => {
  const [selectedRows, setSelectedRows] = useState<any>({});

  const onOk = () => {
    onFinish(selectedRows);
  };

  const onChecked = (checked: boolean, row: any) => {
    if (checked) {
      setSelectedRows((items: any) => ({ ...items, [row.id]: row }));
    } else {
      setSelectedRows((items: any) => {
        delete items[row.id];
        return items;
      });
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => onOpenChange(false)}
      onOk={onOk}
      width={1100}
    >
      <ProTable
        headerTitle={false}
        search={false}
        rowKey="id"
        options={{
          fullScreen: false,
          reload: false,
          setting: false, 
          density: false,
          search: true,
        }}
        request={async (params = {}, sort, filter) => {
          const options = { ...params, sort, filter, page: params.current };
          const result = await getContacts(options);
          return {
            data: result.documents,
          };
        }}
        columns={[
          {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
          },
          {
            title: 'First Name',
            key: 'firstName',
            dataIndex: 'firstName',
          },
          {
            title: 'Last Name',
            key: 'lastName',
            dataIndex: 'lastName',
          },
          {
            title: 'Options',
            valueType: 'option',
            key: 'option',
            render: (_, row: any) => [
              <Switch key={row.id} defaultChecked={false} onChange={(checked: boolean) => onChecked(checked, row)} />,
            ],
          },
        ]}
      />
    </Modal>
  );
};

export default ChooseContactsModal;