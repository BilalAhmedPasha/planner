export const taskNavToDrawer = () => {
  return window.innerWidth < 800 ? true : false;
};

export const taskDetailsToDrawer = () => {
  return window.innerWidth < 1200 ? true : false;
};

export const disableWeekView = () => {
  return window.innerWidth < 700 ? true : false;
};
