import React, { useEffect } from "react";
import { Layout, message } from "antd";
import { useDispatch } from "react-redux";
import { fetchListsAction } from "./state/userLists/userLists.actions";
import { fetchTagsAction } from "./state/userTags/userTags.actions";
import Header from "./Header/Header";
import Sider from "./Sider/Sider";
import { UserAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

const AppLayout = ({ setCurrentTitle, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListsAction());
    dispatch(fetchTagsAction());
  }, [dispatch]);

  const [messageApi, contextHolder] = message.useMessage();

  const { user } = UserAuth();
  const history = useHistory();
  if (user === null) {
    return history.push("/login");
  }
  
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider messageApi={messageApi} setCurrentTitle={setCurrentTitle} />
        {children}
        {contextHolder}
      </Layout>
    </Layout>
  );
};
export default AppLayout;
