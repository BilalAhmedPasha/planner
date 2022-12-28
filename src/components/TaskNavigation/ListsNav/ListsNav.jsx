import { useState } from "react";
import DynamicNav from "../DynamicNav/DynamicNav";
import customLists from "./ListNavigation.config";

const ListNav = () => {
  const [open, setOpen] = useState(false);
  const handleClickItem = () => {
    setOpen(!open);
  };

  return (
    <DynamicNav
      navigationConfig={customLists}
      title={"Lists"}
      tooltip={"Add list"}
      type={"lists"}
      open={open}
      handleClickItem={handleClickItem}
    />
  );
};

export default ListNav;
