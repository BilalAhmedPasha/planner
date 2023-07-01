import Card from "../TaskListView/TaskListItem/Card";

const SubTaskInDetails = ({ taskDetails }) => {
  
  return (
    <div>
      <Card
        // user={user}
        // messageApi={messageApi}
        key={"1"}
        cardDetails={taskDetails}
        moveCard={(id, atIndex) => {}}
        findCard={(id) => {}}
        selectedCardId={""}
        setSelectedCardId={() => {}}
        setSelectedTaskDetails={() => {}}
        isInCollapse={false}
      />
    </div>
  );
};

export default SubTaskInDetails;
