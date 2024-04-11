import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import appLogo from "../../assets/appLogo.png";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import Spinner from "../../components/Spinner";
import Loading from "../../components/Loading";
import { LOADER_SIZE } from "../../constants/app.constants";
import { errorMessagesMap } from "../../constants/error.constants";

const StyledDiv = styled.div`
    margin: 5rem auto;
    width: 22%;
    min-width: 22rem;
`;

const LoginCard = styled.div`
    height: ${(props) => (props.$showsignin ? "38rem" : "40rem")};
    overflow: auto;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 3px 6px 0px;
    transition: 0.3s;
    &:hover {
        box-shadow: rgba(100, 100, 111, 0.35) 0px 5px 10px 0px;
    }
`;

const Image = styled.img`
    width: 90%;
    margin: 0.5rem 1rem;
`;

const LoginPage = () => {
    const navigateTo = useNavigate();
    const { user, loading, error } = UserAuth();

    useEffect(() => {
        if (user !== null && JSON.stringify(user) !== "{}") {
            navigateTo("/tasks/all");
        }
    }, [navigateTo, user]);

    const [showsignin, setShowsignin] = useState("true");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setErrorMessage("");
    }, [showsignin]);

    useEffect(() => {
        if (error) {
            setErrorMessage(errorMessagesMap[error.code]);
        }
    }, [error]);

    return (
        <StyledDiv>
            <Image src={appLogo} alt="appLogo" />
            <LoginCard $showsignin={showsignin}>
                <Spinner
                    spinning={loading}
                    indicator={Loading(LOADER_SIZE)}
                    delay={0}
                >
                    {showsignin ? (
                        <SignInForm
                            setShowSignIn={setShowsignin}
                            showsignin={showsignin}
                            errorMessage={errorMessage}
                            setErrorMessage={setErrorMessage}
                        />
                    ) : (
                        <SignUpForm
                            setShowSignIn={setShowsignin}
                            showsignin={showsignin}
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
