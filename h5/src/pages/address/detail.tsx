import { Form, Input, Switch, TextArea } from 'antd-mobile';
import React from 'react';

export default React.memo(() => {
  return (
    <div>
      <Form>
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '姓名不能为空' }]}
        >
          <Input onChange={console.log} placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          name="address"
          label="地址"
          help="详情地址"
          rules={[{ required: true, message: '姓名不能为空' }]}
        >
          <TextArea
            placeholder="请输入地址"
            maxLength={100}
            rows={2}
            showCount
          />
        </Form.Item>
        <Form.Item
          name="amount"
          label="手机号"
          rules={[{ required: true, message: '姓名不能为空' }]}
        >
          <Input onChange={console.log} placeholder="手机号" />
        </Form.Item>
        <Form.Item
          layout="horizontal"
          name="delivery"
          label="默认地址"
          childElementPosition="right"
        >
          <Switch />
        </Form.Item>
      </Form>
    </div>
  );
});
