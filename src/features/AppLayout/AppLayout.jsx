import React, { useCallback, useEffect, useState } from "react";
import { Layout, ConfigProvider, theme } from "antd";
import AppNav from "./AppNav";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import {
  addUserSettingAction,
  updateUserSettingAction,
} from "./state/userSettings/userSettings.actions";
import db from "../../firebase";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import FullPageSpinner from "../../components/FullPageSpinner";
import Loading from "../../components/Loading";
import { oneDarkTheme } from "../../constants/onedarkTheme.constants";

const AppLayout = ({ setCurrentTitle, children }) => {
  const { user } = UserAuth();

  const [userTheme, setUserTheme] = useState(0);
  const dispatch = useDispatch();

  const getInitialUserData = useCallback(async () => {
    if (user && user.uid) {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      setUserTheme(parseInt(userDoc.data()?.userTheme) || 0);
      // Create redux state
      dispatch(
        addUserSettingAction({
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          userTheme: parseInt(userDoc.data()?.userTheme) || 0,
        })
      );

      // Create new user doc if logging for the first time
      if (!userDoc.exists()) {
        await setDoc(
          userDocRef,
          {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            userTheme: parseInt(userDoc.data()?.userTheme) || 0,
          },
          { merge: true }
        );
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    getInitialUserData();
  }, [getInitialUserData]);

  const updateUserThemeCallback = useCallback(
    async (themeId) => {
      if (user && user.uid) {
        const userDocRef = doc(db, "users", user.uid);
        // Update redux state
        dispatch(
          updateUserSettingAction({
            userTheme: parseInt(themeId),
          })
        );
        
        // Update firestore document
        await setDoc(
          userDocRef,
          {
            userTheme: parseInt(themeId),
          },
          { merge: true }
        );
      }
    },
    [user, dispatch]
  );

  const updateTheme = () => {
    setUserTheme((prevState) => {
      if (prevState === 1) {
        updateUserThemeCallback(0);
        return 0;
      } else {
        updateUserThemeCallback(1);
        return 1;
      }
    });
  };

  const navigateTo = useNavigate();
  useEffect(() => {
      if (user === null) {
          return navigateTo("/login");
      }
  }, [user, navigateTo]);

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
                      updateTheme={updateTheme}
                  />
                  {childrenWithProps}
              </Layout>
          )}
      </ConfigProvider>
  );
};
export default AppLayout;
