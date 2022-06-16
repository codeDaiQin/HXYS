import React, { useEffect, useState } from 'react';
import { querystring } from '@/utils';
import { GoodsDetailInfo, GoodsType } from '@/interface/goods';

export default React.memo(() => {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<GoodsDetailInfo>();

  const doSearch = async (type: GoodsType = 'all') => {
    setLoading(true);
    // 获取商品分类列表
    console.log('获取商品详情', type);
    const [err, goodsTypeList] = [1, 2];

    setLoading(false);
  };
  // 获取推荐商品列表
  // console.log('获取推荐商品列表', type);
  // 获取商品评论列表
  // console.log('获取商品评论列表', type);
  useEffect(() => {
    console.log();
    const goodsId = querystring(location.search);
  }, []);

  return <>详情</>;
});
