import { PaginationType } from '@/interface';
import { CapsuleTabs, List, Tag } from 'antd-mobile';
import React, { useEffect, useState } from 'react';

type CommentTag = {
  id: number;
  count: number; // 数量
  content: string; // 标签内容
};

type CommentProps = {
  id?: number;
} & PaginationType;

// Comment 评论
export default React.memo((props: CommentProps) => {
  const { pageSize = 2 } = props;
  const [tags, setTags] = useState<CommentTag[]>([]); // 评论标签
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    setTags([
      {
        id: 13,
        content: '4124',
        count: 213
      }
    ]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {tags.map((tag) => (
        <Tag key={tag.id}>{tag.content}</Tag>
      ))}
    </div>
  );
});
