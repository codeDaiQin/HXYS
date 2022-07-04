import React, { memo, useEffect, useMemo, useState } from 'react';
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
  CheckList,
  SearchBar
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
import styles from './index.module.scss';

type AddressSelectProps = {
  type?: 'check' | 'list';
  handleClick?: () => void;
  value?: AddressType | null;
  onChange?: (value: AddressType | null) => void;
};

const AddressSelect: React.FC<AddressSelectProps> = (props) => {
  const { type = 'list', handleClick, value = null, onChange } = props;
  const RenderList = type === 'list' ? List : CheckList;
  const [form] = Form.useForm();
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressList, setAddressList] = useState<AddressType[]>([]);
  const [selectValue, setSelectValue] = useState<AddressType | null>(value);
  const [searchText, setSearchText] = useState('');
  const filterList = useMemo(
    () =>
      searchText
        ? addressList.filter(
            ({ detailed, consignee, phone }) =>
              detailed.includes(searchText) ||
              consignee.includes(searchText) ||
              phone.includes(searchText)
          )
        : addressList,
    [addressList, searchText]
  ); // 过滤要查询的关键字

  const fetchAddressList = async () => {
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
  const handleItemClick = (item: AddressType) => {
    handleClick && handleClick();
    setSelectValue(item);
    onChange && onChange(item);
    // checkList时不做弹出编辑页面处理
    if (type === 'check') return;
    setPopupVisible(true);
  };

  // 新增地址
  const handleAdd = () => {
    setPopupVisible(true);
    setSelectValue(null);
  };

  const handleDelete = async () => {
    const { address_id } = selectValue ?? {};
    if (!address_id) return;
    setLoading(true);

    const [err] = await to(deleteAddress(address_id));
    if (err) {
      notice.error('操作失败, 请重试');
      setLoading(false);
      return;
    }

    fetchAddressList(); // 获取新列表
    setPopupVisible(false); // 关闭弹窗
    notice.success('操作成功');
  };

  const handleSubmit = async (values: AddressFormType) => {
    const { address_id } = selectValue ?? {};
    const [err] = await to(
      address_id ? updateAddress(address_id, values) : addAddress(values)
    );

    if (err) {
      notice.error('操作失败, 请重试');
      return;
    }

    fetchAddressList(); // 获取新列表
    setPopupVisible(false); // 关闭弹窗
    notice.success('操作成功');
  };

  useEffect(() => {
    // 数据同步到弹窗内
    selectValue ? form.setFieldsValue(selectValue) : form.resetFields();
  }, [selectValue, addressList]);

  useEffect(() => {
    fetchAddressList();
  }, []);

  return (
    <Loading loading={loading}>
      <div className={styles['address-container']}>
        <div className={styles['search-container']}>
          <SearchBar
            placeholder="输入文字过滤选项"
            value={searchText}
            onChange={setSearchText}
          />
        </div>
        <main>
          <RenderList defaultValue={[`${selectValue?.address_id}`]}>
            {filterList?.length ? (
              filterList.map((item) => (
                <RenderList.Item
                  value={`${item.address_id}`}
                  key={item.address_id}
                  onClick={() => handleItemClick(item)}
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
                selectValue && (
                  <Button size="mini" onClick={handleDelete}>
                    删除
                  </Button>
                )
              }
              onBack={() => setPopupVisible(false)}
            >
              {selectValue ? '编辑' : '新增'}收货地址
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
            <Button block onClick={handleAdd}>
              新增
            </Button>
          </footer>
        )}
      </div>
    </Loading>
  );
};

export default memo(AddressSelect);
