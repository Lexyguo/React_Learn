import React, { useState, useEffect } from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import styles from './index.less';
import { connect } from 'umi';

const columns: ProColumns[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    // copyable: true,
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
  },
];

const User = ({ user, getUserData }) => {
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <ProTable<{}, { keywords: string }>
      size="small"
      columns={columns}
      request={params => {
        getUserData(params);
        // 模仿数据筛选以实现关键字搜索
        var list = user.data;
        for (const key in params) {
          if (key !== 'current' && key !== 'pageSize' && key !== '_timestamp') {
            const value = params[key];
            list = list.filter(item => {
              if (String(item[key]).indexOf(value) > -1) {
                return item;
              }
            });
          }
        }
        // 筛选结束

        return { ...user, data: list };
      }}
      rowKey="id"
      pagination={{
        current: 1,
        pageSize: 10,
      }}
    />
  );
};

export default connect(({ user }) => ({ user }), {
  getUserData: value => ({
    type: 'user/getUserData',
    payload: value,
  }),
})(User);
