import React, { PropsWithChildren } from 'react';
import { SpinLoading } from 'antd-mobile';
import styles from './index.module.scss';

export type LoadingProps = {
  loading?: boolean;
};

const Loading: React.FC<PropsWithChildren<LoadingProps>> = (props) => {
  const { children, loading } = props;

  return (
    <div className={styles['loading-container']}>
      {children}
      {loading && (
        <div className={styles['loading-blur']}>
          <SpinLoading style={{ '--size': '48px' }} color="primary" />
        </div>
      )}
    </div>
  );
};

export default React.memo(Loading);
