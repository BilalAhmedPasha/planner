import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import appLogo from "../../assets/appLogo.png";

import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import Spinner from "../../components/Spinner";
import Loading from "../../components/Loading";
import { LOADER_SIZE } from "../../constants/app.constants";

const StyledDiv = styled.div`
  margin: 5rem auto;
  width: 22%;
  min-width: 22rem;
`;

const LoginCard = styled.div`
  height: ${(props) => (props.showSignIn ? "33rem" : "35rem")};
  overflow: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 3px 6px 0px;
  transition: 0.3s;
  :hover {
    box-shadow: rgba(100, 100, 111, 0.35) 0px 5px 10px 0px;
  }
`;

const LoginPage = () => {
  const history = useHistory();
  const { googleSignIn, user, loading } = UserAuth();

  useEffect(() => {
    if (user !== null) {
      history.push("/tasks/inbox");
    }
  }, [history, user]);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <StyledDiv>
      <img
        src={appLogo}
        alt="appLogo"
        style={{
          width: "90%",
          margin: "0.5rem 1rem",
        }}
      />
      <LoginCard showSignIn={showSignIn}>
        <Spinner spinning={loading} indicator={Loading(LOADER_SIZE)} delay={0}>
          {showSignIn ? (
            <SignInForm
              handleGoogleSignIn={handleGoogleSignIn}
              setShowSignIn={setShowSignIn}
            />
          ) : (
            <SignUpForm
              handleGoogleSignIn={handleGoogleSignIn}
              setShowSignIn={setShowSignIn}
            />
          )}
        </Spinner>
      </LoginCard>
    </StyledDiv>
  );
};

export default LoginPage;
