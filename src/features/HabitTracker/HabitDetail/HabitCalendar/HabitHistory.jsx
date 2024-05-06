import { Tooltip, Typography, theme } from "antd";
import {
  MdOutlineCheckCircle,
  MdOutlineCancel,
  MdOutlinePending,
} from "react-icons/md";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`;

const GridItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const HabitHistory = ({ habitHistory, colorSuccess, colorError }) => {
  const {
    token: { colorBgContainer, colorTextBase, colorTextSecondary },
  } = theme.useToken();
  return (
    <FlexContainer>
      <GridItem>
        <MdOutlineCheckCircle
          style={{ fontSize: "1.25rem", color: colorSuccess }}
        />
        <Typography.Text
          style={{
            fontSize: "1rem",
          }}
          ellipsis={true}
        >
          {`Achieved ${habitHistory.achieved}`}
        </Typography.Text>
        <Tooltip
          title="Records on invalid days are not considered"
          zIndex={2}
          color={colorBgContainer}
          overlayInnerStyle={{
            color: colorTextBase,
          }}
        >
          <HiOutlineQuestionMarkCircle style={{ color: colorTextSecondary }} />
        </Tooltip>
      </GridItem>
      <GridItem>
        <MdOutlineCancel style={{ fontSize: "1.25rem", color: colorError }} />
        <Typography.Text
          style={{
            fontSize: "1rem",
          }}
          ellipsis={true}
        >
          {`Unachieved ${habitHistory.unachieved}`}
        </Typography.Text>
        <Tooltip
          title="Records on invalid days are not considered"
          zIndex={2}
          color={colorBgContainer}
          overlayInnerStyle={{
            color: colorTextBase,
          }}
        >
          <HiOutlineQuestionMarkCircle style={{ color: colorTextSecondary }} />
        </Tooltip>
      </GridItem>
      <GridItem>
        <MdOutlinePending
          style={{ fontSize: "1.25rem", color: colorTextBase }}
        />
        <Typography.Text
          style={{
            fontSize: "1rem",
          }}
          ellipsis={true}
        >
          {`Pending ${habitHistory.pending}`}
        </Typography.Text>
      </GridItem>
    </FlexContainer>
  );
};

export default HabitHistory;
