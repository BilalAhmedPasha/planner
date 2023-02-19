import { Collapse, Typography, theme, Space } from "antd";
import update from "immutability-helper";
import Card from "./Card";
import { useParams } from "react-router-dom";
import { COMPLETED, DELETED, WONT_DO } from "../../../constants/app.constants";
import {
  activePanel,
  MARKED,
  OVERDUE,
} from "../../../constants/section.constants";

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
        <Collapse
          ghost={true}
          bordered={false}
          style={{
            background: token.colorBgContainer,
          }}
          defaultActiveKey={activePanel}
        >
          {Object.keys(sectionalTasks).map((each) => {
            if (
              sectionalTasks[each].tasks.length > 0 &&
              (sectionCount > 1 || each === MARKED || each === OVERDUE)
            ) {
              return (
                <Collapse.Panel
                  header={
                    <Space size="small">
                      <Typography.Text
                        style={{
                          whiteSpace: "nowrap",
                          overflowX: "auto",
                          textOverflow: "ellipsis",
                        }}
                        strong
                      >{`${sectionalTasks[each].sectionTitle}`}</Typography.Text>
                      <Typography.Text type="secondary">{`${sectionalTasks[each].tasks.length}`}</Typography.Text>
                    </Space>
                  }
                  key={sectionalTasks[each].sectionKey}
                >
                  <div style={{ marginTop: "-1rem", marginBottom: "-1rem" }}>
                    {sectionalTasks[each].tasks.map((card) => (
                      <Card
                        user={user}
                        messageApi={messageApi}
                        key={card.id}
                        cardDetails={card}
                        moveCard={(id, atIndex) =>
                          moveSectionTask(
                            id,
                            atIndex,
                            sectionalTasks[each].tasks,
                            each
                          )
                        }
                        findCard={(id) =>
                          findSectionTask(id, sectionalTasks[each].tasks)
                        }
                        selectedTaskDetails={selectedTaskDetails}
                        setSelectedTaskDetails={setSelectedTaskDetails}
                        isInCollapse={true}
                      />
                    ))}
                  </div>
                </Collapse.Panel>
              );
            }
            return null;
          })}
        </Collapse>
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
