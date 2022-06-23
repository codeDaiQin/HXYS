import { Toast } from 'antd-mobile';

const success = (message: string) => {
  Toast.show({
    icon: 'success',
    content: message
  });
};

const error = (message: string) => {
  Toast.show({
    icon: 'fail',
    content: message
  });
};

export default {
  success,
  error
};
