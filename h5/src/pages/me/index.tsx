import React from 'react';
import { Grid, Card, List, Avatar } from 'antd-mobile';
import userMenu from '@/config/userMenu';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const url =
  'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ';

export default React.memo(() => {
  const navigate = useNavigate();

  return (
    <>
      <Grid columns={1} gap={8}>
        {/* userMenu */}
        <List mode="card">
          {userMenu.map((item) => (
            <List.Item
              key={item.path}
              extra={item.extra}
              prefix={item.icon}
              onClick={() => navigate(item.path)}
            >
              {item.title}
            </List.Item>
          ))}
        </List>
      </Grid>
    </>
  );
});
