import { ProTable } from '@ant-design/pro-components';
import React from 'react';

interface RhythmLogsProps {
  rhythmId: string;
  logs: any;
}

const RhythmLogs = ({ rhythmId, logs }: RhythmLogsProps) => {
  return (
    <ProTable
      style={{ marginTop: 10 }}
      headerTitle="Logs"
      options={false}
      search={false}
      dataSource={logs}
      rowKey="id"
      columns={[
        {
          title: 'Action',
          dataIndex: 'action',
        },
        {
          title: 'Description',
          dataIndex: 'description',
        },
        {
          title: 'Created At',
          dataIndex: 'createdAt',
          valueType: 'dateTime',
        },
      ]}
    />
  );
};

export default RhythmLogs;