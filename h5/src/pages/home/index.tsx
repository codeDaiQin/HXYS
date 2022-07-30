import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Swiper, Toast } from 'antd-mobile';
import styles from './index.module.scss';

const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac'];

export default React.memo(() => {
  const navigate = useNavigate();

  return (
    <>
      <Swiper
        loop
        autoplay
        style={{
          '--border-radius': '0 0 12px 12px'
        }}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <div
              className={styles['swiper-content']}
              style={{ background: color }}
              onClick={() => {
                Toast.show(`你点击了卡片 ${index + 1}`);
              }}
            >
              {index + 1}
            </div>
          </Swiper.Item>
        ))}
      </Swiper>
      <main className={styles['home-container']}>
        <Button block size="large">
          立即下单
        </Button>
      </main>
      <Button onClick={() => navigate('/login')}>去登陆</Button>
    </>
  );
});
