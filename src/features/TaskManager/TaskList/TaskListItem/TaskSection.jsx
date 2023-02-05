import { Collapse, Typography, theme } from "antd";
import { useCallback } from "react";
import update from "immutability-helper";
import Card from "./Card";

const TaskListSection = ({
  sectionTitle,
  sectionTasks,
  isOpen = false,
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
      setSectionTasks(
        update(sectionTasks, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findSectionTask, sectionTasks, setSectionTasks]
  );

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={isOpen ? ["1"] : []}
      style={{
        background: token.colorBgContainer,
      }}
    >
      <Collapse.Panel
        header={<Typography.Text strong>{sectionTitle}</Typography.Text>}
        key="1"
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
          />
        ))}
      </Collapse.Panel>
    </Collapse>
  );
};

export default TaskListSection;
