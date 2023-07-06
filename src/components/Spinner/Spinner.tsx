import { Spin } from "antd";
import React, { ReactNode } from "react";
import styled from "styled-components";

interface SpinnerProps {
  spinning?: boolean;
  indicator: React.ReactElement;
  children: ReactNode;
}

const Spinner: React.ComponentType<SpinnerProps> = styled(Spin)`
  .vertical-center {
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
`;

export default Spinner;
