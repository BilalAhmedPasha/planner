export const fetchTagsApi = () => {
  return Promise.resolve([
    {
      label: "Tag 1",
      color: "#6CBBCD",
      redirectUrl: "/tag1",
    },
    {
      label: "Tag 2",
      color: "#966CCD",
      redirectUrl: "/tag2",
    },
  ]);
};
