import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledLoadingOutlined = styled(LoadingOutlined)`
    font-size: ${({ size }) => size};
`;

const circularLoading = (size) => {
    return <StyledLoadingOutlined size={size} spin />;
};
export default circularLoading;
