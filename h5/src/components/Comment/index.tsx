import { PaginationType } from '@/interface';
import { List } from 'antd-mobile';
import React, { useState } from 'react';

type CommentProps = {
  id?: number;
} & PaginationType;

// Comment 评论
export default React.memo((props: CommentProps) => {
  const { pageSize = 3 } = props;
  const [total, setTotal] = useState(0);

  return (
    <div>
      tag
      <List></List>
    </div>
  );
});
