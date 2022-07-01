import React, { memo, PropsWithChildren } from 'react';
import { RightOutline } from 'antd-mobile-icons';
import styles from './index.module.scss';

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  prefix?: React.ReactNode;
  arrow?: React.ReactNode;
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = (props) => {
  const {
    children,
    disabled,
    loading,
    onClick,
    prefix,
    arrow = <RightOutline />
  } = props;

  return (
    <div
      className={styles['button-content']}
      onClick={!disabled && !loading ? onClick : undefined}
    >
      {prefix && <div className={styles['button-prefix']}>{prefix}</div>}
      <div className={styles['button-main']}>{children}</div>
      {arrow && <div className={styles['button-arrow']}>{arrow}</div>}
    </div>
  );
};

export default memo(Button);
