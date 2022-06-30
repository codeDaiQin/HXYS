import React, { useEffect, useState } from 'react';
import {
  Swiper,
  ImageViewer,
  Button,
  Popup,
  Avatar,
  Card,
  CheckList,
  SearchBar
} from 'antd-mobile';
import to from 'await-to-js';
import { CloseOutline } from 'antd-mobile-icons';
import DynamicForm from '@/components/DynamicForm';
import Loading from '@/components/Loading';
import Comment from '@/components/Comment';
import { querystring } from '@/utils';
import { GoodsDetailInfo } from '@/interface/goods';
import { getGoodsDetail } from '@/services/goods';
import notice from '@/utils/notice';
import { AddressType } from '@/interface/address';
import { getAddressList } from '@/services/address';
import styles from './index.module.scss';

export default React.memo(() => {
  const [currentImg, setCurrentImg] = useState(0);
  const [imageViewerVisible, setImageViewerVisible] = useState(false); // 图片预览图层
  const [popupVisible, setPopupVisible] = useState(false); // 商品规格抽屉
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<GoodsDetailInfo>();
  const [addressList, setAddressList] = useState<AddressType[]>([]);
  const [showAddress, setShowAddress] = useState(false);

  const doSearch = async (goods_id: string) => {
    setLoading(true);
    const [err, result] = await to(getGoodsDetail({ goods_id }));

    if (err || !result?.goods_id) {
      notice.error('获取详情失败 跳转到列表页面');
      setLoading(false);
      return;
    }

    result.covers = [
      'https://images.unsplash.com/photo-1601128533718-374ffcca299b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3128&q=80',
      'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3113&q=80'
    ];

    setDetail(result);
    setLoading(false);
  };

  // 获取地址列表
  const fetchAddressData = async () => {
    setLoading(true);
    const [err, result] = await to(getAddressList());
    if (err) {
      notice.error('获取地址失败, 请重试');
      setLoading(false);
      return;
    }

    setAddressList(result.list);
    setLoading(false);
  };

  useEffect(() => {
    const { goods_id } = querystring(window.location.search);
    if (!goods_id) {
      notice.error('没有id 跳转到列表页面');
      return;
    }
    doSearch(goods_id);
    fetchAddressData();
  }, []);

  if (!detail?.goods_id) return null;

  return (
    <Loading loading={loading}>
      {!!detail?.covers?.length && (
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
      )}
      {/* 图片预览 */}
      <ImageViewer.Multi
        images={detail?.covers}
        visible={imageViewerVisible}
        defaultIndex={currentImg}
        onClose={() => setImageViewerVisible(false)}
      />
      <main className={styles['goods-container']}>
        <Card title="宝贝详情">{detail.goods_name}</Card>
        <Card title="规格选择" style={{ marginTop: 8 }}>
          <DynamicForm specs={[]} />
        </Card>
        <Card title="宝贝评价" style={{ marginTop: 8 }}>
          <Comment />
        </Card>
        <Card title="看了又看" style={{ marginTop: 8 }}>
          <Comment />
        </Card>
      </main>

      <footer className={styles['settlement-container']}>
        <Button onClick={() => setPopupVisible(true)}>收藏</Button>
        <Button onClick={() => setPopupVisible(true)}>立即购买</Button>
      </footer>

      <Popup
        getContainer={null}
        visible={popupVisible}
        onMaskClick={() => {
          setPopupVisible(false);
          setShowAddress(false);
        }}
        bodyStyle={{ height: '90vh', background: '#f2f2f2' }}
      >
        <div className={styles['popup-container']}>
          <header>
            <Avatar src="https://images.unsplash.com/photo-1601128533718-374ffcca299b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3128&q=80" />
            <p>{detail.goods_name}</p>
          </header>
          <Card>
            <Button onClick={() => setShowAddress(true)}>选择地址</Button>
            <Popup
              getContainer={null}
              visible={showAddress}
              onMaskClick={() => {
                setShowAddress(false);
              }}
              destroyOnClose
            >
              <div className={styles['search-container']}>
                <SearchBar
                  placeholder="输入文字过滤选项"
                  // value={searchText}
                  // onChange={(v) => {
                  //   setSearchText(v);
                  // }}
                />
              </div>
              <CheckList
                defaultValue={[
                  `${addressList.find((item) => item.is_default)?.address_id}`
                ]}
              >
                {addressList.map((item) => (
                  <CheckList.Item
                    key={item.address_id}
                    value={`${item.address_id}`}
                  >
                    {item.detailed}
                  </CheckList.Item>
                ))}
              </CheckList>
            </Popup>
          </Card>

          <Card style={{ marginTop: 8 }}>
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
    </Loading>
  );
});
