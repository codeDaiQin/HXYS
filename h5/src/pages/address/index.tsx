import React, { useEffect, useState } from 'react';
import {
  List,
  Popup,
  Button,
  Form,
  Input,
  Switch,
  TextArea,
  Empty,
  Toast
} from 'antd-mobile';
import to from 'await-to-js';
import { addAddress, getAddressList, updateAddress } from '@/services/address';
import { querystring } from '@/utils';
import { AddressFormType, AddressType } from '@/interface/address';
import styles from './index.module.scss';

export default React.memo(() => {
  const [form] = Form.useForm();
  const [popupVisible, setPopupVisible] = useState(false);
  const [current, setCurrent] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [addressList, setList] = useState<AddressType[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const [err, result] = await to(getAddressList());
    if (err) {
      console.log(err);
      setLoading(true);
      return;
    }

    setList(result.list);
    setLoading(true);
  };

  const handleOpen = (index = -1) => {
    setPopupVisible(true);
    setCurrent(index);
  };

  const handleSubmit = async (values: AddressFormType) => {
    const { address_id } = querystring(location.search);

    const [err, result] = await to(
      address_id ? updateAddress({ address_id, ...values }) : addAddress(values)
    );
    if (err) {
      Toast.show({
        icon: 'fail',
        content: '添加失败, 请重试'
      });
      return;
    }

    fetchData(); // 获取新列表
    setPopupVisible(false); // 关闭弹窗
    Toast.show({
      icon: 'success',
      content: '添加成功'
    });
  };

  useEffect(() => {
    addressList[current]
      ? form.setFieldsValue({ ...addressList[current] })
      : form.resetFields();
  }, [current, addressList]);

  useEffect(() => {
    // 获取地址
    fetchData();
  }, []);

  return (
    <div className={styles['address-container']}>
      <main>
        <List>
          {addressList?.length ? (
            addressList.map((item, index) => (
              <List.Item
                key={item.address_id}
                onClick={() => handleOpen(index)}
              >
                {item.consignee}
                {item.phone}
                {item.detailed}
              </List.Item>
            ))
          ) : (
            <Empty description="暂无地址" />
          )}
        </List>
      </main>

      <Popup
        forceRender={true}
        visible={popupVisible}
        onMaskClick={() => setPopupVisible(false)}
        bodyStyle={{ height: '90vh', background: '#f2f2f2' }}
      >
        <div className={styles['popup-container']}>
          <Form
            form={form}
            onFinish={handleSubmit}
            footer={
              <Button block type="submit">
                保存
              </Button>
            }
          >
            <Form.Item
              name="consignee"
              label="收货人"
              rules={[{ required: true, message: '收货人不能为空' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item
              name="detailed"
              label="详细地址"
              rules={[{ required: true, message: '详细地址不能为空' }]}
            >
              <TextArea
                placeholder="请输入地址"
                maxLength={100}
                rows={2}
                showCount
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label="手机号"
              rules={[
                { required: true, message: '手机号不能为空' },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: '手机号格式不正确'
                }
              ]}
            >
              <Input placeholder="手机号" />
            </Form.Item>
            <Form.Item
              layout="horizontal"
              name="isDefault"
              label="默认地址"
              childElementPosition="right"
            >
              <Switch />
            </Form.Item>
          </Form>
        </div>
      </Popup>

      <footer className={styles['add-container']}>
        <Button block onClick={() => handleOpen()}>
          新增
        </Button>
      </footer>
    </div>
  );
});
