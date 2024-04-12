import { Collapse, Typography, theme, Space } from "antd";
import update from "immutability-helper";
import Card from "./Card";
import { useParams } from "react-router-dom";
import { COMPLETED, DELETED, WONT_DO } from "../../../../constants/app.constants";
import {
  activePanel,
  MARKED,
  OVERDUE,
} from "../../../../constants/section.constants";
import styled from "styled-components";

const StyledText = styled(Typography.Text)`
  whitespace: nowrap;
  overflow-x: auto;
`;

const StyledCollapse = styled(Collapse)`
    background: ${({ color }) => color};
`;

const StyledDiv = styled.div`
  margin-top: -1rem;
  margin-bottom: -1rem;
`;

const renderCardOutsideCollapse = ({
  tasks,
  user,
  messageApi,
  selectedTaskDetails,
  setSelectedTaskDetails,
  sectionId,
  moveSectionTask,
  findSectionTask,
}) => {
  return (
    <div>
      {tasks.map((card) => (
        <Card
          user={user}
          messageApi={messageApi}
          key={card.id}
          cardDetails={card}
          moveCard={(id, atIndex) =>
            moveSectionTask(id, atIndex, tasks, sectionId)
          }
          findCard={(id) => findSectionTask(id, tasks)}
          selectedTaskDetails={selectedTaskDetails}
          setSelectedTaskDetails={setSelectedTaskDetails}
          isInCollapse={false}
        />
      ))}
    </div>
  );
};

const TaskListSection = ({
  sectionalTasks,
  setSectionTasks,
  selectedTaskDetails,
  setSelectedTaskDetails,
  messageApi,
  user,
  sectionCount,
}) => {
  const { token } = theme.useToken();

  const findSectionTask = (id, sectionTasks) => {
    const card = sectionTasks.filter((c) => `${c.id}` === id)[0];
    return {
      card,
      index: sectionTasks.indexOf(card),
    };
  };

  const moveSectionTask = (id, atIndex, sectionTasks, sectionId) => {
    const { card, index } = findSectionTask(id);
    setSectionTasks((prevSectionTasks) => {
      return {
        ...prevSectionTasks,
        [sectionId]: {
          ...prevSectionTasks[sectionId],
          tasks: update(sectionTasks, {
            $splice: [
              [index, 1],
              [atIndex, 0, card],
            ],
          }),
        },
      };
    });
  };

  const { sectionId } = useParams();

  return (
      <>
          {sectionCount === 1 &&
              sectionId !== DELETED &&
              sectionId !== COMPLETED &&
              sectionId !== WONT_DO &&
              Object.keys(sectionalTasks).map((each) => {
                  if (each !== MARKED && each !== OVERDUE) {
                      return (
                          <div key={each}>
                              {renderCardOutsideCollapse({
                                  tasks: sectionalTasks[each].tasks,
                                  user,
                                  messageApi,
                                  selectedTaskDetails,
                                  setSelectedTaskDetails,
                                  sectionId: each,
                                  moveSectionTask,
                                  findSectionTask,
                              })}
                          </div>
                      );
                  }
                  return null;
              })}
          {sectionId !== DELETED &&
          sectionId !== COMPLETED &&
          sectionId !== WONT_DO ? (
              <StyledCollapse
                  ghost={true}
                  variant="borderless"
                  color={token.colorBgContainer}
                  defaultActiveKey={activePanel}
              >
                  {Object.keys(sectionalTasks).map((each) => {
                      if (
                          sectionalTasks[each].tasks.length > 0 &&
                          (sectionCount > 1 ||
                              each === MARKED ||
                              each === OVERDUE)
                      ) {
                          return (
                              <Collapse.Panel
                                  header={
                                      <Space size="small">
                                          <StyledText
                                              strong
                                          >{`${sectionalTasks[each].sectionTitle}`}</StyledText>
                                          <StyledText type="secondary">{`${sectionalTasks[each].tasks.length}`}</StyledText>
                                      </Space>
                                  }
                                  key={sectionalTasks[each].sectionKey}
                              >
                                  <StyledDiv>
                                      {sectionalTasks[each].tasks.map(
                                          (card) => (
                                              <Card
                                                  user={user}
                                                  messageApi={messageApi}
                                                  key={card.id}
                                                  cardDetails={card}
                                                  moveCard={(id, atIndex) =>
                                                      moveSectionTask(
                                                          id,
                                                          atIndex,
                                                          sectionalTasks[each]
                                                              .tasks,
                                                          each
                                                      )
                                                  }
                                                  findCard={(id) =>
                                                      findSectionTask(
                                                          id,
                                                          sectionalTasks[each]
                                                              .tasks
                                                      )
                                                  }
                                                  selectedTaskDetails={
                                                      selectedTaskDetails
                                                  }
                                                  setSelectedTaskDetails={
                                                      setSelectedTaskDetails
                                                  }
                                                  isInCollapse={true}
                                              />
                                          )
                                      )}
                                  </StyledDiv>
                              </Collapse.Panel>
                          );
                      }
                      return null;
                  })}
              </StyledCollapse>
          ) : (
              Object.keys(sectionalTasks).map((each) => {
                  return renderCardOutsideCollapse({
                      tasks: sectionalTasks[each].tasks,
                      user,
                      messageApi,
                      selectedTaskDetails,
                      setSelectedTaskDetails,
                      sectionId: each,
                      moveSectionTask,
                      findSectionTask,
                  });
              })
          )}
      </>
  );
};

export default TaskListSection;
