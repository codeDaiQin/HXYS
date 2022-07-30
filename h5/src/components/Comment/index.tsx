import React, { useEffect, useState } from 'react';
import { CapsuleTabs, Empty, List, Space, Tag } from 'antd-mobile';
import { PaginationType } from '@/interface';
import {
  GoodsCommentListResponse,
  GoodsCommentType,
  TagsType
} from '@/interface/goods';
import styles from './index.module.scss';

type CommentProps = {
  id?: number;
} & PaginationType;

const data: GoodsCommentListResponse = {
  tags: {
    red: 1,
    '标签🏷️': 3124,
    test: 132,
    f: 123,
    '🐷': 23,
    fsafa: 123123
  },
  list: [
    {
      comment_id: '312'
    }
  ],
  total: 1
};

// Comment 评论
export default React.memo((props: CommentProps) => {
  const { pageSize = 2 } = props;
  const [commentTags, setCommentTags] = useState<TagsType>({}); // 评论标签
  const [commentList, setCommentList] = useState<GoodsCommentType[]>([]);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    const { tags, list, total } = data;
    setCommentTags(tags);
    setCommentList(list);
  };

  const handleTabsChange = (key: string) => {
    console.log(key);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <header>
        <CapsuleTabs onChange={handleTabsChange}>
          {Object.entries(commentTags).map(([key, value]) => (
            <CapsuleTabs.Tab key={key} title={`${key}: ${value}`} />
          ))}
        </CapsuleTabs>
      </header>
      <main>
        {commentList.length ? commentList.map(() => <h1>123</h1>) : <Empty />}
      </main>
    </div>
  );
});
