import React from "react";
import { Layout, ConfigProvider, theme } from "antd";
import AppNav from "./AppNav";
import { useHistory } from "react-router-dom";

const AppLayout = ({ user, setCurrentTitle, children }) => {
  const history = useHistory();
  if (user === null) {
    return history.push("/login");
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { setCurrentTitle, user });
    }
    return child;
  });

  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        algorithm: false ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Layout>
        <AppNav setCurrentTitle={setCurrentTitle} />
        {childrenWithProps}
      </Layout>
    </ConfigProvider>
  );
};
export default AppLayout;
