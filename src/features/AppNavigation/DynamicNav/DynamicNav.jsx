import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const DynamicNav = ({
  navigationConfig,
  title,
  tooltip,
  type,
  open,
  handleClickItem,
  handleOpenDialog,
  addDialogComponent: AddDialogComponent,
}) => {
  return (
    <>
      <ListItem
        onClick={handleClickItem}
        secondaryAction={
          <IconButton edge="end" aria-label={tooltip}>
            <Tooltip title={tooltip} placement="bottom">
              <AddIcon
                onClick={(event) => {
                  event.stopPropagation();
                  handleOpenDialog();
                }}
              />
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
            <ListItem
              disablePadding
              key={each.name}
              secondaryAction={
                <IconButton edge="end" aria-label={tooltip}>
                  <Tooltip title={"Edit"} placement="bottom">
                    <MoreVertIcon
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    />
                  </Tooltip>
                </IconButton>
              }
            >
              <ListItemButton
                component={Link}
                to={`/${type}${each.redirectUrl}`}
                aria-label={each.name}
                sx={{ pl: 5 }}
              >
                <ListItemText primary={each.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
      {AddDialogComponent}
    </>
  );
};

export default DynamicNav;
