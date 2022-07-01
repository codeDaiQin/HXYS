import React, { memo, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CheckList,
  Popup,
  SearchBar,
  Form
} from 'antd-mobile';
import DynamicForm from '@/components/DynamicForm';
import LineButton from '@/components/LineButton';
import styles from './index.module.scss';
import { AddressType } from '@/interface/address';
import AddressSelcet from '@/components/AddressSelcet';

type SpecificationsProps = {
  handleSubmit: () => void;
  addressList: AddressType[];
};

// specifications 商品规格选择模块
const Specifications: React.FC<SpecificationsProps> = (props) => {
  const { handleSubmit, addressList } = props;
  const [form] = Form.useForm();
  // const [addressList, setAddressList] = useState<AddressType[]>([]);
  const [showAddress, setShowAddress] = useState(false);

  return (
    <div>
      <header>
        <Avatar src="https://images.unsplash.com/photo-1601128533718-374ffcca299b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3128&q=80" />
        {/* <p>{detail?.goods_name}</p> */}
      </header>
      <Card bodyStyle={{ padding: 0 }}>
        <LineButton onClick={() => setShowAddress(true)}>选择地址</LineButton>
        <Popup
          getContainer={null}
          visible={showAddress}
          onMaskClick={() => {
            setShowAddress(false);
          }}
          destroyOnClose
        >
          <div className={styles['search-container']}>
            <SearchBar
              placeholder="输入文字过滤选项"
              // value={searchText}
              // onChange={(v) => {
              //   setSearchText(v);
              // }}
            />
          </div>
          <AddressSelcet type="check" />
          {/* <CheckList
            defaultValue={[
              `${addressList.find((item) => item.is_default)?.address_id}`
            ]}
          >
            {addressList.map((item) => (
              <CheckList.Item
                key={item.address_id}
                value={`${item.address_id}`}
              >
                {item.detailed}
              </CheckList.Item>
            ))}
          </CheckList> */}
        </Popup>
      </Card>

      <Card title="规格选择" style={{ marginTop: 8 }}>
        <DynamicForm specs={[]} />
      </Card>

      <footer>
        <Button block onClick={handleSubmit}>
          确认
        </Button>
      </footer>
    </div>
  );
};

export default memo(Specifications);
