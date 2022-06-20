import React, { useEffect, useState } from 'react';
import to from 'await-to-js';
import { Swiper, ImageViewer, Button, Popup, Avatar, Card } from 'antd-mobile';
import { querystring } from '@/utils';
import { GoodsDetailInfo } from '@/interface/goods';
import { getGoodsDetail } from '@/services/goods';
import styles from './index.module.scss';
import { CloseOutline } from 'antd-mobile-icons';
import DynamicForm from '@/components/DynamicForm';

export default React.memo(() => {
  const [currentImg, setCurrentImg] = useState(0);
  const [imageViewerVisible, setImageViewerVisible] = useState(false); // 图片预览图层
  const [popupVisible, setPopupVisible] = useState(false); // 商品规格抽屉
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
                setImageViewerVisible(true);
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
        visible={imageViewerVisible}
        defaultIndex={currentImg}
        onClose={() => setImageViewerVisible(false)}
      />
      <main></main>
      <footer className={styles['settlement-container']}>
        <Button onClick={() => setPopupVisible(true)}>收藏</Button>
        <Button onClick={() => setPopupVisible(true)}>立即购买</Button>
      </footer>
      <Popup
        visible={popupVisible}
        onMaskClick={() => setPopupVisible(false)}
        bodyStyle={{ height: '90vh', background: '#f2f2f2' }}
      >
        <div className={styles['popup-container']}>
          <header>
            <Avatar src="https://images.unsplash.com/photo-1601128533718-374ffcca299b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3128&q=80" />
            <p>商品名称</p>
          </header>
          <Card
            onClick={() => {
              console.log('go to address');
            }}
          >
            选择地址
          </Card>

          <Card
            style={{ marginTop: 8 }}
            onClick={() => {
              console.log('go to address');
            }}
          >
            <DynamicForm specs={[]} />
          </Card>
          <CloseOutline
            onClick={() => setPopupVisible(false)}
            className={styles['icon-close']}
          />
          <footer>
            <Button block onClick={() => setPopupVisible(false)}>
              确认
            </Button>
          </footer>
        </div>
      </Popup>
    </div>
  );
});
