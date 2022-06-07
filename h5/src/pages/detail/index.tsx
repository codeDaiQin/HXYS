import React, { useEffect } from 'react';
import { querystring } from '@/utils';

export default React.memo(() => {
  useEffect(() => {
    console.log(querystring(location.search));
  }, []);

  return <div>详情</div>;
});
