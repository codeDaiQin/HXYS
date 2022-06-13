import React, { useEffect, useState } from 'react';
import { List, Image, Tabs, Empty } from 'antd-mobile';

export default React.memo(() => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrderList = async () => {
    setLoading(true);
    console.log('getOrderList');
    setLoading(false);
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <>
      <Tabs onChange={console.log}>
        <Tabs.Tab title="当前订单" key="fruits" />
        <Tabs.Tab title="历史订单" key="vegetables" />
      </Tabs>
      <List>
        {!list.length ? (
          list.map((user) => (
            <List.Item
              key={user}
              prefix={
                <Image
                  src={user}
                  style={{ borderRadius: 20 }}
                  fit="cover"
                  width={40}
                  height={40}
                />
              }
              description={user}
            >
              {user}
            </List.Item>
          ))
        ) : (
          <Empty
            style={{ padding: '64px 0' }}
            imageStyle={{ width: 128 }}
            description="暂无数据"
          />
        )}
      </List>
    </>
  );
});
