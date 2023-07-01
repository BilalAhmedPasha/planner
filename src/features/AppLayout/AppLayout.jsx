import React, { useCallback, useEffect, useState } from "react";
import { Layout, ConfigProvider, theme } from "antd";
import AppNav from "./AppNav";
import { useHistory } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { addUserSettingAction } from "./state/userSettings/userSettings.actions";
import db from "../../firebase";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import FullPageSpinner from "../../components/FullPageSpinner";
import Loading from "../../components/Loading";
import { oneDarkTheme } from "../../constants/onedarkTheme.constants";

const AppLayout = ({ setCurrentTitle, children }) => {
  const { user } = UserAuth();
  const [userTheme, setUserTheme] = useState(0);

  const getInitialUserData = useCallback(async () => {
    if (user && user.uid) {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(
          userDocRef,
          {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          },
          { merge: true }
        );
      }
    }
  }, [user]);

  const dispatch = useDispatch();
  useEffect(() => {
    getInitialUserData();
    if (user) {
      dispatch(
        addUserSettingAction({
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
    }
  }, [getInitialUserData, dispatch, user]);

  const history = useHistory();
  useEffect(() => {
    if (user === null) {
      return history.push("/login");
    }
  }, [user, history]);

  const { defaultAlgorithm } = theme;
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { setCurrentTitle, user, userTheme });
    }
    return child;
  });

  return (
    <ConfigProvider
      theme={
        userTheme
          ? {
              token: oneDarkTheme,
            }
          : {
              algorithm: defaultAlgorithm,
            }
      }
    >
      {user === null || JSON.stringify(user) === "{}" ? (
        <FullPageSpinner indicator={Loading(50)} />
      ) : (
        <Layout style={{ height: "100vh" }}>
          <AppNav
            setCurrentTitle={setCurrentTitle}
            userTheme={userTheme}
            setUserTheme={setUserTheme}
          />
          {childrenWithProps}
        </Layout>
      )}
    </ConfigProvider>
  );
};
export default AppLayout;
