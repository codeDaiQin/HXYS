import React, { useRef, useState } from "react";
import { SideBar, SearchBar, Toast } from "antd-mobile";

import { useNavigate } from "react-router-dom";

export default React.memo(() => {
  const [activeKey, setActiveKey] = useState("key1");

  const navigate = useNavigate();
  // 需要后端返回
  const tabs = [
    {
      key: "key1",
      title: "选项一",
    },
    {
      key: "key2",
      title: "选项二",
    },
    {
      key: "key3",
      title: "选项三",
    },
  ];

  return (
    <>
      <SearchBar placeholder="请输入内容" onFocus={() => navigate("/search?fa=12")} />
      <SideBar activeKey={activeKey} onChange={setActiveKey}>
        {tabs.map((item) => (
          <SideBar.Item key={item.key} title={item.title} />
        ))}
      </SideBar>
    </>
  );
});
