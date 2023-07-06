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
import { errorMessagesMap } from "../../constants/errorMessages.constants";

interface StyledDivProps {}

const StyledDiv = styled.div<StyledDivProps>`
  margin: 5rem auto;
  width: 22%;
  min-width: 22rem;
`;

interface LoginCardProps {
  showSignIn: boolean;
}

const LoginCard = styled.div<LoginCardProps>`
  height: ${(props: { showSignIn: boolean }) =>
    props.showSignIn ? "38rem" : "40rem"};
  overflow: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 3px 6px 0px;
  transition: 0.3s;
  :hover {
    box-shadow: rgba(100, 100, 111, 0.35) 0px 5px 10px 0px;
  }
`;

const LoginPage: React.FC = () => {
  const history = useHistory<History>();

  const { user, loading, error } = UserAuth();

  useEffect(() => {
    if (user !== null && JSON.stringify(user) !== "{}") {
      history.push("/tasks/all");
    }
  }, [history, user]);

  const [showSignIn, setShowSignIn] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setErrorMessage("");
  }, [showSignIn]);

  useEffect(() => {
    if (error) {
      setErrorMessage(errorMessagesMap[error.code]);
    }
  }, [error]);

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
              setShowSignIn={setShowSignIn}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          ) : (
            <SignUpForm
              setShowSignIn={setShowSignIn}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
        </Spinner>
      </LoginCard>
    </StyledDiv>
  );
};

export default LoginPage;
