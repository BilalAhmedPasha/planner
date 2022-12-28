import { Box } from "@mui/material";
import AppNavigation from "../components/AppNavigation/AppNavigation";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppNavigation />
      <main className={classes.main}>{props.children}</main>
    </Box>
  );
};
export default Layout;
