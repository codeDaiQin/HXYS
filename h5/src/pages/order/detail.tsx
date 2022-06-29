import React, { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { querystring } from '@/utils';
import notice from '@/utils/notice';
import { Card, Steps } from 'antd-mobile';
import { OrderDetailInfo, OrderStepEnum } from '@/interface/order';
const { Step } = Steps;

export default React.memo(() => {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<OrderDetailInfo>();
  const steps = [
    {
      step_id: 13,
      content: '出生',
      time: '2022-06-29 20:05:14',
      status: OrderStepEnum.finish
    },
    {
      step_id: 132,
      content: '学代码猝死了',
      time: '2022-06-29 20:06:14',
      status: OrderStepEnum.error
    }
  ];

  // 获取订单详情
  const getOrderDetail = async (order_id: string) => {
    setLoading(true);
    console.log('getOrderDetail', order_id);

    setLoading(false);
  };

  useEffect(() => {
    const { order_id } = querystring(window.location.search);
    if (!order_id) {
      notice.error('没有id 跳转到列表页面');
      setLoading(false);
      return;
    }
    getOrderDetail(order_id);
  }, []);

  return (
    <Loading loading={loading}>
      {!!steps?.length && (
        <Card
          title="订单状态"
          onClick={() => {
            console.log('go to address');
          }}
        >
          <Steps direction="vertical">
            {steps?.map(({ step_id, content, time, status }) => (
              <Step
                key={step_id}
                title={content}
                description={time}
                status={OrderStepEnum[status] as keyof typeof OrderStepEnum}
              />
            ))}
          </Steps>
        </Card>
      )}
    </Loading>
  );
});
