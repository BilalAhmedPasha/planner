import { useState } from "react";
import DynamicNav from "../DynamicNav/DynamicNav";
import customTags from "./TagNavigation.config";

const TagsNav = () => {
  const [open, setOpen] = useState(false);
  const handleClickItem = () => {
    setOpen(!open);
  };

  return (
    <DynamicNav
      navigationConfig={customTags}
      title={"Tags"}
      tooltip={"Add tag"}
      type={"tags"}
      open={open}
      handleClickItem={handleClickItem}
    />
  );
};

export default TagsNav;
