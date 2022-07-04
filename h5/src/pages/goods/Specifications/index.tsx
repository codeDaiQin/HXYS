import React, { memo, useState } from 'react';
import { Avatar, Button, Card, Popup, SearchBar } from 'antd-mobile';
import DynamicForm from '@/components/DynamicForm';
import LineButton from '@/components/LineButton';
import styles from './index.module.scss';
import AddressSelcet from '@/components/AddressSelcet';
import { AddressType } from '@/interface/address';

type SpecificationsProps = {
  handleSubmit: () => void;
};

// specifications 商品规格选择模块
const Specifications: React.FC<SpecificationsProps> = (props) => {
  const { handleSubmit } = props;
  const [showAddress, setShowAddress] = useState(false);
  const [addressValue, setAddressValue] = useState<AddressType | null>(null);

  return (
    <div>
      <header>
        <Avatar src="https://images.unsplash.com/photo-1601128533718-374ffcca299b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3128&q=80" />
        {/* <p>{detail?.goods_name}</p> */}
      </header>
      <Card bodyStyle={{ padding: 0 }}>
        <LineButton onClick={() => setShowAddress(true)}>
          {addressValue?.detailed ?? '选择地址'}
        </LineButton>
        <Popup
          getContainer={null}
          visible={showAddress}
          onMaskClick={() => {
            setShowAddress(false);
          }}
          destroyOnClose
        >
          <AddressSelcet
            value={addressValue}
            onChange={(v) => {
              console.log(v);

              setAddressValue(v);
              setShowAddress(false);
            }}
            type="check"
          />
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
