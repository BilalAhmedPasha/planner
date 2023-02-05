import { Collapse, Typography, theme, Space } from "antd";
import { useCallback } from "react";
import update from "immutability-helper";
import Card from "./Card";

const TaskListSection = ({
  sectionTitle,
  sectionId,
  sectionTasks,
  isOpen = false,
  showInCollapse,
  setSectionTasks,
  selectedCardId,
  setSelectedCardId,
  setSelectedTaskDetails,
  messageApi,
  user,
}) => {
  const { token } = theme.useToken();
  const findSectionTask = useCallback(
    (id) => {
      const card = sectionTasks.filter((c) => `${c.id}` === id)[0];
      return {
        card,
        index: sectionTasks.indexOf(card),
      };
    },
    [sectionTasks]
  );

  const moveSectionTask = useCallback(
    (id, atIndex) => {
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
    },
    [findSectionTask, sectionTasks, sectionId, setSectionTasks]
  );

  return (
    <>
      {showInCollapse ? (
        <Collapse
          bordered={false}
          defaultActiveKey={isOpen ? [sectionTitle] : []}
          style={{
            background: token.colorBgContainer,
          }}
        >
          <Collapse.Panel
            header={
              <Space size="small">
                <Typography.Text strong>{`${sectionTitle}`}</Typography.Text>
                <Typography.Text type="secondary">{`${sectionTasks.length}`}</Typography.Text>
              </Space>
            }
            key={sectionTitle}
          >
            {sectionTasks.map((card) => (
              <Card
                user={user}
                messageApi={messageApi}
                key={card.id}
                cardDetails={card}
                moveCard={moveSectionTask}
                findCard={findSectionTask}
                selectedCardId={selectedCardId}
                setSelectedCardId={setSelectedCardId}
                setSelectedTaskDetails={setSelectedTaskDetails}
                isInCollapse={showInCollapse}
              />
            ))}
          </Collapse.Panel>
        </Collapse>
      ) : (
        sectionTasks.map((card) => (
          <Card
            user={user}
            messageApi={messageApi}
            key={card.id}
            cardDetails={card}
            moveCard={moveSectionTask}
            findCard={findSectionTask}
            selectedCardId={selectedCardId}
            setSelectedCardId={setSelectedCardId}
            setSelectedTaskDetails={setSelectedTaskDetails}
            isInCollapse={showInCollapse}
          />
        ))
      )}
    </>
  );
};

export default TaskListSection;
