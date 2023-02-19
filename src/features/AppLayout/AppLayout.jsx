import React, { useCallback, useEffect } from "react";
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

const AppLayout = ({ setCurrentTitle, children }) => {
  const { user } = UserAuth();

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
      {user === null || JSON.stringify(user) === "{}" ? (
        <FullPageSpinner indicator={Loading(50)} />
      ) : (
        <Layout style={{ height: "100vh" }}>
          <AppNav setCurrentTitle={setCurrentTitle} />
          {childrenWithProps}
        </Layout>
      )}
    </ConfigProvider>
  );
};
export default AppLayout;
