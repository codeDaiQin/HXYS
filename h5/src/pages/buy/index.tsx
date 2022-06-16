import React, { useEffect, useRef, useState } from 'react';
import { SideBar, SearchBar, Button, Space, Skeleton } from 'antd-mobile';
import buyMenu from '@/config/buyMenu';
import { GoodsBaseInfo, GoodsType } from '@/interface/goods';
import to from 'await-to-js';
import { getGoodsList } from '@/services/goods';
import styles from './index.module.scss';

export default React.memo(() => {
  const [goodsType, setGoodsType] = useState<GoodsType>('calligraphy');
  const [list, setList] = useState<GoodsBaseInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const skeletonCount = Math.ceil(
    (containerRef.current?.clientHeight ||
      containerRef.current?.offsetHeight ||
      containerRef.current?.scrollHeight ||
      0) / 90
  ); // 骨架屏数量

  const doSearch = async (type: GoodsType = 'all') => {
    setLoading(true);

    // 根据类型获取商品列表
    const [err, result] = await to(getGoodsList({ goodsType: type }));
    if (err) {
      console.log(err);
      return;
    }
    const { total, list = [] } = result;
    setList(list);
    // setLoading(false);
  };

  useEffect(() => {
    doSearch(goodsType);
  }, [goodsType]);

  return (
    <>
      <div className={styles['container']}>
        <header>
          <div className={styles['left']}>
            <SearchBar placeholder="请输入内容" />
          </div>
          <div className={styles['right']}>
            <Button size="small" color="primary" onClick={() => doSearch()}>
              搜索
            </Button>
          </div>
        </header>

        <div className={styles['main']}>
          <aside>
            <SideBar
              activeKey={goodsType}
              onChange={(key) => setGoodsType(key as GoodsType)}
            >
              {buyMenu.map((item) => (
                <SideBar.Item
                  key={item.key}
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
          <main ref={containerRef}>
            {(loading ? new Array(skeletonCount).fill('') : list).map(
              (item, index) => (
                <div
                  key={item?.goodsId ?? index}
                  className={styles['list-item']}
                >
                  {item?.cover ?? (
                    <Skeleton animated className={styles['cover-skeleton']} />
                  )}
                  {item?.name ?? (
                    <Skeleton.Paragraph
                      animated
                      lineCount={2}
                      className={styles['title-skeleton']}
                    />
                  )}
                </div>
              )
            )}
          </main>
        </div>
      </div>
    </>
  );
});
