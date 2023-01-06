import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const taskNavConfigFooter = [
  {
    name: "Completed",
    icon: CheckBoxIcon,
    redirectUrl: "/tasks/completed",
  },
  {
    name: "Won't Do",
    icon: DisabledByDefaultIcon,
    redirectUrl: "/tasks/wont-do",
  },
  {
    name: "Deleted",
    icon: DeleteIcon,
    redirectUrl: "/tasks/deleted",
  },
];

export default taskNavConfigFooter;
