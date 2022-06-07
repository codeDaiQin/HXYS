import React from 'react';
// import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import Layout from '@/layouts';
import './index.scss';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      {/* store */}
      <Router>
        <Layout />
      </Router>
    </ConfigProvider>
  );
};

export default App;
