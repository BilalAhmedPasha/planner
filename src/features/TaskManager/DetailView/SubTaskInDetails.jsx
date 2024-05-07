import ItemContainer from "../ListView/Item/Item.container";

const SubTaskInDetails = ({ taskDetails }) => {
  return (
      <ItemContainer
        key={"1"}
        cardDetails={taskDetails}
        moveCard={(id, atIndex) => {}}
        findCard={(id) => {}}
        selectedCardId={""}
        setSelectedCardId={() => {}}
        setSelectedTaskDetails={() => {}}
        isInCollapse={false}
      />
  );
};

export default SubTaskInDetails;
