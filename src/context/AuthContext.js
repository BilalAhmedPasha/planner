import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // Google auth
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      currentUser ? setUser(currentUser) : setUser(null);
      setError("");
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Email and password login
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  const registerUserWithEmailAndPassword = (name, email, password) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        return updateProfile(auth.currentUser, { displayName: name });
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signInUserWithEmailAndPassword = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        logOut,
        user,
        registerUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        forgotPassword,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
