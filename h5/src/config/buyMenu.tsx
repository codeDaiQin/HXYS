import {
  SetOutline,
  MessageOutline,
  UnorderedListOutline
} from 'antd-mobile-icons';
import { MenuType } from './menu';

type BuyMenuType = {
  extra?: string; // 额外信息
} & MenuType;

export default [
  {
    title: '篆刻',
    icon: <UnorderedListOutline />
  },
  {
    title: '书法',
    icon: <MessageOutline />
  },
  {
    title: '礼品',
    icon: <SetOutline />
  }
] as BuyMenuType[];
