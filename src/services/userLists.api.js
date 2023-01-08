export const fetchListsApi = () => {
  return Promise.resolve([
    {
      label: "List 1",
      color: "#D87C69",
      redirectUrl: "/list-1",
    },
    {
      label: "List 2",
      color: "#96CD6C",
      redirectUrl: "/list-2",
    },
  ]);
};
