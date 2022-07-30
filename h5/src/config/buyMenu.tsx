import React from 'react';
import {
  SetOutline,
  MessageOutline,
  UnorderedListOutline
} from 'antd-mobile-icons';
import { GoodsType } from '@/interface/goods';

type BuyMenuType = {
  key: GoodsType;
  title: string;
  icon: React.ReactNode;
};

export default [
  {
    key: GoodsType.sealCutting,
    title: '篆刻',
    icon: <UnorderedListOutline />
  },
  {
    key: GoodsType.calligraphy,
    title: '书法',
    icon: <MessageOutline />
  },
  {
    key: GoodsType.gift,
    title: '礼品',
    icon: <SetOutline />
  },
  {
    key: GoodsType.other,
    title: '其他',
    icon: <SetOutline />
  }
] as BuyMenuType[];
