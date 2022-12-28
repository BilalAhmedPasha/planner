import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const taskNavConfigFooter = [
  {
    name: "Completed",
    icon: CheckBoxIcon,
    redirectUrl: "/completed",
  },
  {
    name: "Won't Do",
    icon: DisabledByDefaultIcon,
    redirectUrl: "/wont-do",
  },
  {
    name: "Deleted",
    icon: DeleteIcon,
    redirectUrl: "/deleted",
  },
];

export default taskNavConfigFooter;
