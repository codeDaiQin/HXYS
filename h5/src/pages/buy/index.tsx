import React, { useEffect, useState } from 'react';
import { SideBar, SearchBar, Button, Space } from 'antd-mobile';
import buyMenu from '@/config/buyMenu';
import styles from './index.module.scss';

export default React.memo(() => {
  const [activeKey, setActiveKey] = useState<string>(buyMenu[0].title);

  const doSearch = () => {
    console.log('134');
  };

  useEffect(() => {
    console.log('activeKey', activeKey);
  }, [activeKey]);

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.left}>
          <SearchBar placeholder="请输入内容" />
        </div>
        <div className={styles.right}>
          <Button size="small" color="primary" onClick={doSearch}>
            搜索
          </Button>
        </div>
      </header>

      <div className={styles.main}>
        <aside>
          <SideBar activeKey={activeKey} onChange={setActiveKey}>
            {buyMenu.map((item) => (
              <SideBar.Item
                key={item.title}
                title={
                  <Space>
                    {item.icon}
                    {item.title}
                  </Space>
                }
              />
            ))}
          </SideBar>
        </aside>
        <main>{activeKey}</main>
      </div>
    </div>
  );
});
