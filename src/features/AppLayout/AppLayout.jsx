import React, { useCallback, useEffect } from "react";
import { Layout, ConfigProvider, theme } from "antd";
import AppNav from "./AppNav";
import { useHistory } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { addUserSettingAction } from "./state/userSettings/userSettings.actions";
import db from "../../firebase";
import { doc, setDoc, getDoc } from "@firebase/firestore";

const AppLayout = ({ setCurrentTitle, children }) => {
  const { user } = UserAuth();
  const history = useHistory();

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
        algorithm: true ? darkAlgorithm : defaultAlgorithm,
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
