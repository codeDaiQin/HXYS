import React, { memo, useEffect, useState } from 'react';
import {
  List,
  Popup,
  Button,
  Form,
  Input,
  Switch,
  TextArea,
  Empty,
  NavBar,
  CheckList
} from 'antd-mobile';
import to from 'await-to-js';
import Loading from '@/components/Loading';
import {
  addAddress,
  getAddressList,
  updateAddress,
  deleteAddress
} from '@/services/address';
import { AddressFormType, AddressType } from '@/interface/address';
import notice from '@/utils/notice';
import { useAppSelector } from '@/models/store';
import { selectUser } from '@/models/user';
import styles from './index.module.scss';

type AddressSelectProps = {
  type?: 'check' | 'list';
  handleClick?: () => void;
};

const AddressSelect: React.FC<AddressSelectProps> = (props) => {
  const { type = 'list', handleClick } = props;
  const RenderList = type === 'list' ? List : CheckList;
  const userState = useAppSelector(selectUser);
  const [form] = Form.useForm();
  const [popupVisible, setPopupVisible] = useState(false);
  const [current, setCurrent] = useState(-1); // -1表示新增
  const [loading, setLoading] = useState(false);
  const [addressList, setAddressList] = useState<AddressType[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const [err, result] = await to(getAddressList());
    if (err) {
      notice.error('获取地址失败, 请重试');
      setLoading(false);
      return;
    }

    setAddressList(result.list);
    setLoading(false);
  };

  // 每一项点击事件
  const handleItemClick = (index = -1) => {
    handleClick && handleClick();
    // checkList时不做处理
    if (type === 'check') return;
    setPopupVisible(true);
    setCurrent(index);
  };

  const handleDelete = async () => {
    const { address_id } = addressList[current];
    if (!address_id) return;
    setLoading(true);

    const [err] = await to(deleteAddress(address_id));
    if (err) {
      notice.error('操作失败, 请重试');
      setLoading(false);
      return;
    }

    fetchData(); // 获取新列表
    setPopupVisible(false); // 关闭弹窗
    notice.success('操作成功');
  };

  const handleSubmit = async (values: AddressFormType) => {
    const { address_id } = addressList[current];

    const [err] = await to(
      address_id ? updateAddress(address_id, values) : addAddress(values)
    );

    if (err) {
      notice.error('操作失败, 请重试');
      return;
    }

    fetchData(); // 获取新列表
    setPopupVisible(false); // 关闭弹窗
    notice.success('操作成功');
  };

  useEffect(() => {
    // 数据同步到弹窗内
    addressList[current]
      ? form.setFieldsValue(addressList[current])
      : form.resetFields();
  }, [current, addressList]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Loading loading={loading}>
      <div className={styles['address-container']}>
        <main>
          <RenderList>
            {addressList?.length ? (
              addressList.map((item, index) => (
                <RenderList.Item
                  value={`${item.address_id}`}
                  key={item.address_id}
                  onClick={() => handleItemClick(index)}
                >
                  <section className={styles['list-item']}>
                    <main>
                      {item.detailed}
                      <span>{item.phone}</span>
                      {item.consignee}
                    </main>
                  </section>
                </RenderList.Item>
              ))
            ) : (
              <Empty description="暂无地址" />
            )}
          </RenderList>
        </main>

        <Popup
          forceRender={true}
          visible={popupVisible}
          onMaskClick={() => setPopupVisible(false)}
          bodyStyle={{ height: '90vh', background: '#f2f2f2' }}
        >
          <div className={styles['popup-container']}>
            <NavBar
              right={
                current > -1 && (
                  <Button size="mini" onClick={handleDelete}>
                    删除
                  </Button>
                )
              }
              onBack={() => setPopupVisible(false)}
            >
              {current > -1 ? '编辑' : '新增'}收货地址
            </NavBar>
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
                name="is_default"
                layout="horizontal"
                label="默认地址"
                childElementPosition="right"
              >
                <Switch />
              </Form.Item>
            </Form>
          </div>
        </Popup>

        {type === 'list' && (
          <footer className={styles['add-container']}>
            <Button block onClick={() => handleItemClick()}>
              新增
            </Button>
          </footer>
        )}
      </div>
    </Loading>
  );
};

export default memo(AddressSelect);
