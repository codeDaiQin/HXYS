import React, { useState } from 'react';
import { List } from 'antd-mobile';
import { AddressType } from '@/interface';

export default React.memo(() => {
  const [list, setList] = useState<AddressType[]>([]);

  const handleEdit = (addressId?: string) => {
    if (addressId) {
      // 修改
    }
    // 创建
  };

  return (
    <>
      <List>
        <List.Item onClick={() => handleEdit()}>账单</List.Item>
      </List>
    </>
  );
});
