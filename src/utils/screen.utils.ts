export const taskNavToDrawer = ({
  currentWidth,
}: {
  currentWidth: number;
}): boolean => {
  return currentWidth < 800 ? true : false;
};

export const taskDetailsToDrawer = ({
  currentWidth,
}: {
  currentWidth: number;
}): boolean => {
  return currentWidth < 1200 ? true : false;
};

export const disableWeekView = ({
  currentWidth,
}: {
  currentWidth: number;
}): boolean => {
  return currentWidth < 700 ? true : false;
};

export const isOnVerySmallScreen = ({
  currentWidth,
}: {
  currentWidth: number;
}): boolean => {
  return currentWidth < 500 ? true : false;
};
