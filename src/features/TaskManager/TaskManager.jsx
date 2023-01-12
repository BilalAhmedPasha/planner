import { Layout, Typography, theme, Button, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import TaskNav from "./TaskNav";
import { fetchListsAction } from "./state/userLists/userLists.actions";
import { fetchTagsAction } from "./state/userTags/userTags.actions";
import db from "../../firebase";
import { doc, setDoc } from "@firebase/firestore";

const TaskManager = ({ user, title, setCurrentTitle }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.uid) {
      const userDocRef = doc(db, "users", user.uid);
      async function getInitialUserData() {
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
      }
      getInitialUserData();
    }
  }, [dispatch, user]);

  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Layout>
      <TaskNav
        user={user}
        messageApi={messageApi}
        setCurrentTitle={setCurrentTitle}
      />
      <Layout.Content
        style={{
          marginRight: "0.1rem",
          padding: "1rem 3rem",
          background: colorBgContainer,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography.Text
            style={{
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            {title}
          </Typography.Text>
          <Button type="primary">Add Task</Button>
        </div>
      </Layout.Content>
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
export default TaskManager;
