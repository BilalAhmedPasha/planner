import { Layout, Typography, theme, message } from "antd";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import TaskNav from "./TaskNav";
import { fetchListsAction } from "./state/userLists/userLists.actions";
import { fetchTagsAction } from "./state/userTags/userTags.actions";
import db from "../../firebase";
import { doc, setDoc } from "@firebase/firestore";
import TaskList from "./TaskList";
import { useParams } from "react-router-dom";

const TaskManager = ({ user, title, setCurrentTitle }) => {
  const { sectionId, documentId } = useParams();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();

  const getInitialUserData = useCallback(async () => {
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(
      userDocRef,
      {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      },
      { merge: true }
    );
    dispatch(fetchListsAction(user.uid));
    dispatch(fetchTagsAction(user.uid));
  }, [dispatch, user]);

  useEffect(() => {
    getInitialUserData();
  }, [getInitialUserData]);

  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Layout>
      <TaskNav
        user={user}
        messageApi={messageApi}
        setCurrentTitle={setCurrentTitle}
      />
      <TaskList user={user} title={title} />
      <Layout.Content
        style={{
          marginLeft: "0.1rem",
          padding: "1rem 3rem",
          background: colorBgContainer,
        }}
      >
        <Typography.Text
          style={{
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          {"Task details"}
        </Typography.Text>
      </Layout.Content>
      {contextHolder}
    </Layout>
  );
};
export default React.memo(TaskManager);
