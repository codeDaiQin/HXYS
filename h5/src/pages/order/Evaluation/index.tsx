import React from 'react';
import { Button, Form, ImageUploader, Rate, TextArea } from 'antd-mobile';

type EvaluationForm = {
  service_attitude: number; // 服务态度
  goods_quality: number; // 商品质量
  evaluate: string; // 评价
  show_imgs: File[]; // 买家秀图片
};

type EvaluationProps = {
  onSubmit: (values: EvaluationForm) => void;
};

// Evaluation 订单完成时的评价模块
export default React.memo((props: EvaluationProps) => {
  const { onSubmit } = props;
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const values: EvaluationForm = form.getFieldsValue();
    onSubmit(values);
  };

  return (
    <Form
      mode="card"
      form={form}
      footer={
        <Button block color="primary" onClick={handleSubmit} size="mini">
          提交
        </Button>
      }
    >
      <Form.Item label="服务态度" name="service_attitude">
        <Rate />
      </Form.Item>

      <Form.Item label="商品质量" name="goods_quality">
        <Rate />
      </Form.Item>

      <Form.Item label="评价" name="evaluate">
        <TextArea
          placeholder="从多个角度评价，可以帮助更多想买的人"
          maxLength={100}
          rows={2}
          showCount
        />
      </Form.Item>

      <Form.Item label="买家秀" name="show_imgs">
        {/* <ImageUploader
          // upload={mockUpload}
          multiple
          maxCount={3}
          // showUpload={fileList.length < maxCount}
          onCountExceed={(exceed) => {
            Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`);
          }}
        /> */}
      </Form.Item>
    </Form>
  );
});
