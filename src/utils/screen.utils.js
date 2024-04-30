export const navToDrawer = ({ currentWidth }) => {
  return currentWidth < 800 ? true : false;
};

export const detailsToDrawer = ({ currentWidth }) => {
  return currentWidth < 1200 ? true : false;
};

export const disableWeekView = ({ currentWidth }) => {
  return currentWidth < 700 ? true : false;
};

export const isOnVerySmallScreen = ({ currentWidth }) => {
  return currentWidth < 500 ? true : false;
};
