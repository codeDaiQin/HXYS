import React, { useEffect, useRef, useState } from 'react';
import { SideBar, SearchBar, Button, Space, Skeleton } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import to from 'await-to-js';
import buyMenu from '@/config/buyMenu';
import { GoodsBaseInfo, GoodsType } from '@/interface/goods';
import { getGoodsList } from '@/services/goods';
import styles from './index.module.scss';

export default React.memo(() => {
  const navigate = useNavigate();
  const [goodsType, setGoodsType] = useState<GoodsType>(GoodsType.sealCutting);
  const [list, setList] = useState<GoodsBaseInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const skeletonCount = Math.ceil(
    (containerRef.current?.clientHeight ||
      containerRef.current?.offsetHeight ||
      containerRef.current?.scrollHeight ||
      0) / 90
  ); // 骨架屏数量

  const doSearch = async (type: GoodsType = GoodsType.all) => {
    setLoading(true);
    // 根据类型获取商品列表
    const [err, result] = await to(getGoodsList({ goods_type: type }));
    if (err) {
      console.log(err);
      return;
    }
    const { total, list = [] } = result;
    setList(list);
    setLoading(false);
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
            {list.map((item) => (
              <div
                onClick={() => navigate(`/detail?goods_id=${item.goods_id}`)}
                key={item.goods_id}
                className={styles['list-item']}
              >
                {item.goods_name}
                {item.goods_name}
              </div>
            ))}
          </main>
        </div>
      </div>
    </>
  );
});
