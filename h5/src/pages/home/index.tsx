import React from 'react';
import { Swiper, Toast } from 'antd-mobile';
import styles from './index.module.scss';

const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac'];

const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className={styles.content}
      style={{ background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`);
      }}
    >
      {index + 1}
    </div>
  </Swiper.Item>
));

export default React.memo(() => {
  return (
    <div>
      <Swiper
        loop
        autoplay
        style={{
          '--border-radius': '0 0 12px 12px'
        }}
      >
        {items}
      </Swiper>
    </div>
  );
});
