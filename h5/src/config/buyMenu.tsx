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
    key: 'sealCutting',
    title: '篆刻',
    icon: <UnorderedListOutline />
  },
  {
    key: 'calligraphy',
    title: '书法',
    icon: <MessageOutline />
  },
  {
    key: 'gift',
    title: '礼品',
    icon: <SetOutline />
  },
  {
    key: 'other',
    title: '其他',
    icon: <SetOutline />
  }
] as BuyMenuType[];
