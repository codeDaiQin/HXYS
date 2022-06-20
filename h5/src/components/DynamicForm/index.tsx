import { SpecsType } from '@/interface/goods';
import React from 'react';

export type DynamicFormProps = {
  specs: SpecsType[]; // 规格
};

const DynamicForm: React.FC<DynamicFormProps> = (props) => {
  const { specs } = props;
  return <div>DynamicForm</div>;
};

export default React.memo(DynamicForm);
