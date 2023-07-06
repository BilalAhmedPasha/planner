import {
  useContext,
  createContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

interface User {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  providerData: any[];
  uid: string;
}

interface AuthContextType {
  googleSignIn: () => void;
  githubSignIn: () => void;
  logOut: () => void;
  user: User | null;
  registerUserWithEmailAndPassword: (
    name: string,
    email: string,
    password: string
  ) => void;
  signInUserWithEmailAndPassword: (email: string, password: string) => void;
  forgotPassword: (email: string) => Promise<void>;
  loading: boolean;
  error: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Google auth
  const googleSignIn = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Github auth
  const githubSignIn = () => {
    setLoading(true);
    const provider = new GithubAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
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

  const registerUserWithEmailAndPassword = (
    name: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        if (auth.currentUser != null) {
          return updateProfile(auth.currentUser, { displayName: name });
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signInUserWithEmailAndPassword = (email: string, password: string) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const forgotPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const contextValue = useMemo<AuthContextType>(() => {
    return {
      googleSignIn,
      logOut,
      user,
      registerUserWithEmailAndPassword,
      signInUserWithEmailAndPassword,
      forgotPassword,
      loading,
      error,
      githubSignIn,
    };
  }, [error, loading, user]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
