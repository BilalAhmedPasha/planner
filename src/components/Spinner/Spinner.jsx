import { Spin } from "antd";
import styled from "styled-components";

const Spinner = styled(Spin)`
  .vertical-center {
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
`;

export default Spinner;
