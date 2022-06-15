import { querystring } from '@/utils';
import React, { useEffect } from 'react';
import { getUserDetail } from '@/services/user';

export default React.memo(() => {
  const login = async () => {
    console.log('first');
    const { code } = querystring(location.search);
    if (!code) return;
  };
  useEffect(() => {
    login();
  }, []);
  return <div>login</div>;
});
