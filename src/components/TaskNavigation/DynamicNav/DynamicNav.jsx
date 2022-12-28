import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";

const DynamicNav = ({
  navigationConfig,
  title,
  tooltip,
  type,
  open,
  handleClickItem,
}) => {
  return (
    <>
      <ListItem
        onClick={handleClickItem}
        secondaryAction={
          <IconButton edge="end" aria-label={tooltip}>
            <Tooltip title={tooltip} placement="bottom">
              <AddIcon onClick={(event) => event.stopPropagation()} />
            </Tooltip>
          </IconButton>
        }
      >
        {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
        <ListItemText primary={title} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {navigationConfig.map((each, index) => (
            <ListItem disablePadding key={each.name}>
              <ListItemButton
                component={Link}
                to={`/tasks/${type}${each.redirectUrl}`}
                aria-label={each.name}
                sx={{ pl: 2 }}
              >
                <ListItemIcon>
                  <each.icon style={{ height: "1.25em", width: "1.5rem" }} />
                </ListItemIcon>
                <ListItemText primary={each.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default DynamicNav;
