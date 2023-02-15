import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import appLogo from "../../assets/appLogo.png";

import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const StyledDiv = styled.div`
  margin: 5rem auto;
  width: 22%;
  min-width: 22rem;
`;

const LoginCard = styled.div`
  height: ${(props) => (props.showSignIn ? "28rem" : "30rem")};
  overflow: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 3px 6px 0px;
  transition: 0.3s;
  :hover {
    box-shadow: rgba(100, 100, 111, 0.35) 0px 5px 10px 0px;
  }
`;

const LoginPage = () => {
  const history = useHistory();
  const { googleSignIn, user } = UserAuth();
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
      </LoginCard>
    </StyledDiv>
  );
};

export default LoginPage;
