import React, { useEffect, useState } from "react";
import { Toast } from "antd-mobile";

export default React.memo(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  useEffect(() => {
    // 未获取到详情时 展示loading Skeleton 骨架屏
    Toast.show({
      icon: "loading",
      content: "加载中…",
    });
    // 获取详情

    // Toast.clear()
  }, []);

  return <div>details</div>;
});
