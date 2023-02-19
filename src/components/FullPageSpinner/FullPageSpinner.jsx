import { Spin } from "antd";
import styled from "styled-components";

const FullPageSpinner = styled(Spin)`
  margin: 0;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;
export default FullPageSpinner;
