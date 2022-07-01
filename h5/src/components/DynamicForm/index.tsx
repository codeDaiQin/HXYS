import React from 'react';
import { Form } from 'antd-mobile';
import { SpecsType } from '@/interface/goods';

export type DynamicFormProps = {
  specs: SpecsType[]; // 规格
};

const DynamicForm: React.FC<DynamicFormProps> = (props) => {
  const { specs } = props;
  return (
    <div>
      <Form>
        {specs.map((item) => (
          <Form.Item></Form.Item>
        ))}
      </Form>
    </div>
  );
};

export default React.memo(DynamicForm);
