import classes from "./Layout.module.css";
import SideNavigation from "../components/SideNavigation/SideNavigation";

const Layout = (props) => {
  return (
    <>
      <SideNavigation />
      <main className={classes.main}>{props.children}</main>
    </>
  );
};
export default Layout;
