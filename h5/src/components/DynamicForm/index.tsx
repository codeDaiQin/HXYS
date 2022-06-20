import React from 'react';

export type DynamicFormProps = {
  specs: any[]; // 规格
};

const DynamicForm: React.FC<DynamicFormProps> = (props) => {
  const { specs } = props;
  return <div>DynamicForm</div>;
};

export default React.memo(DynamicForm);
