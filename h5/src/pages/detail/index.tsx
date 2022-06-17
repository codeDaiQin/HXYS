import React, { useEffect, useState } from 'react';
import to from 'await-to-js';
import { Swiper, ImageViewer } from 'antd-mobile';
import { querystring } from '@/utils';
import { GoodsDetailInfo } from '@/interface/goods';
import { getGoodsDetail } from '@/services/goods';
import styles from './index.module.scss';

export default React.memo(() => {
  const [currentImg, setCurrentImg] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<GoodsDetailInfo>();

  const doSearch = async () => {
    const { goods_id } = querystring(location.search);
    if (!goods_id) return;
    setLoading(true);
    const [err, result] = await to(getGoodsDetail({ goods_id }));

    if (err || !result) {
      console.log(err);
      return;
    }

    result.covers = [
      'https://images.unsplash.com/photo-1601128533718-374ffcca299b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3128&q=80',
      'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3113&q=80'
    ];

    setDetail(result);
    setLoading(false);
  };

  useEffect(() => {
    doSearch();
  }, []);

  return (
    <div>
      <Swiper className={styles['swiper-container']}>
        {detail?.covers.map((item, index) => (
          <Swiper.Item key={index}>
            <div
              className={styles['swiper-item']}
              onClick={() => {
                setCurrentImg(index);
                setVisible(true);
              }}
            >
              <img src={item} alt="" />
            </div>
          </Swiper.Item>
        ))}
      </Swiper>
      {/* 图片预览 */}
      <ImageViewer.Multi
        images={detail?.covers}
        visible={visible}
        defaultIndex={currentImg}
        onClose={() => {
          setVisible(false);
        }}
      />
    </div>
  );
});
