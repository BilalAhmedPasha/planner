import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const StaticNav = ({ navigationConfig }) => {
  return (
    <List>
      {navigationConfig.map((each, index) => (
        <ListItem disablePadding key={each.name}>
          <ListItemButton
            component={Link}
            to={`${each.redirectUrl}`}
            aria-label={each.name}
            variant="contained"
          >
            <ListItemIcon>
              <each.icon style={{ height: "1.5em", width: "1.5rem" }} />
            </ListItemIcon>
            <ListItemText primary={each.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default StaticNav;
