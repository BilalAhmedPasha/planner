import React from "react";
import { Layout, ConfigProvider, theme } from "antd";
import Header from "./Header/Header";
import AppNav from "./AppNav";
import { UserAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

const AppLayout = ({ setCurrentTitle, children }) => {
  const { user } = UserAuth();
  const history = useHistory();
  if (user === null) {
    return history.push("/login");
  }

  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        algorithm: false ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Layout>
        <Header/>
        <AppNav setCurrentTitle={setCurrentTitle} />
        {children}
      </Layout>
    </ConfigProvider>
  );
};
export default AppLayout;
