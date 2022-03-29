import React from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "../style/globalStyles";

const AppShell = ({ Component }) => {
  return (
    <>
      <globalStyles />
      <Component />
    </>
  );
};

export default AppShell;
