import { Collapse, Typography, theme, Space } from "antd";
import update from "immutability-helper";
import ItemContainer from "../Item/Item.container";
import { useParams } from "react-router-dom";
import {
  COMPLETED,
  DELETED,
  WONT_DO,
} from "../../../../constants/app.constants";
import {
  activePanel,
  MARKED,
  OVERDUE,
} from "../../../../constants/section.constants";

const renderItemContainerOutsideCollapse = ({
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
      {tasks.map((task) => (
        <ItemContainer
          user={user}
          messageApi={messageApi}
          key={task.id}
          taskDetails={task}
          moveItemContainer={(id, atIndex) =>
            moveSectionTask(id, atIndex, tasks, sectionId)
          }
          findItemContainer={(id) => findSectionTask(id, tasks)}
          selectedTaskDetails={selectedTaskDetails}
          setSelectedTaskDetails={setSelectedTaskDetails}
          isInCollapse={false}
        />
      ))}
    </div>
  );
};

const Section = ({
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
    const task = sectionTasks.filter((c) => `${c.id}` === id)[0];
    return {
      task,
      index: sectionTasks.indexOf(task),
    };
  };

  const moveSectionTask = (id, atIndex, sectionTasks, sectionId) => {
    const { task, index } = findSectionTask(id);
    setSectionTasks((prevSectionTasks) => {
      return {
        ...prevSectionTasks,
        [sectionId]: {
          ...prevSectionTasks[sectionId],
          tasks: update(sectionTasks, {
            $splice: [
              [index, 1],
              [atIndex, 0, task],
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
                {renderItemContainerOutsideCollapse({
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
          variant="borderless"
          defaultActiveKey={activePanel}
          style={{
            background: token.colorBgContainer,
          }}
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
                        }}
                        strong
                      >{`${sectionalTasks[each].sectionTitle}`}</Typography.Text>
                      <Typography.Text
                        type="secondary"
                        style={{
                          whiteSpace: "nowrap",
                          overflowX: "auto",
                        }}
                      >{`${sectionalTasks[each].tasks.length}`}</Typography.Text>
                    </Space>
                  }
                  key={sectionalTasks[each].sectionKey}
                >
                  <div
                    style={{
                      marginTop: "-1rem",
                      marginBottom: "-1rem",
                    }}
                  >
                    {sectionalTasks[each].tasks.map((task) => (
                      <ItemContainer
                        user={user}
                        messageApi={messageApi}
                        key={task.id}
                        taskDetails={task}
                        moveItemContainer={(id, atIndex) =>
                          moveSectionTask(
                            id,
                            atIndex,
                            sectionalTasks[each].tasks,
                            each
                          )
                        }
                        findItemContainer={(id) =>
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
          return renderItemContainerOutsideCollapse({
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

export default Section;
