import { stringify } from "qs";

const headers = {
  "Content-Type": "application/json",
};

const paramsSerializer = (params) =>
  stringify(params, { arrayFormat: "comma", skipNulls: true });

const { axiosCreate } = eureka.HttpWrapper;

function prepareParams(
  pageNumber,
  pageSize,
  filterCriteriaParam,
  searchName,
  sortField,
  descending
) {
  const params = new URLSearchParams();

  params.append("pageNo", pageNumber ? pageNumber : null);
  params.append("pageSize", pageSize);
  if (typeof sortField === "string" && typeof descending === "boolean") {
    params.append("sortField", sortField);
    params.append("descending", descending);
  }
  if (typeof searchName === "string" && searchName !== "") {
    params.append("searchName", searchName);
  }
  Object.keys(filterCriteriaParam).forEach((key) => {
    if (Array.isArray(filterCriteriaParam[key])) {
      filterCriteriaParam[key].forEach((item) => {
        if (typeof item === "object") {
          params.append(key, item["id"]);
        } else if (!isNaN(item) && key !== "articleHierarchyLevel") {
          params.append(key, parseInt(item));
        } else {
          params.append(key, item);
        }
      });
    } else if (typeof filterCriteriaParam[key] === "string") {
      params.append(key, filterCriteriaParam[key]);
    } else if (
      filterCriteriaParam[key] !== "" &&
      !isNaN(filterCriteriaParam[key])
    ) {
      params.append(key, parseInt(filterCriteriaParam[key]));
    }
  });
  return params;
}

export { headers, paramsSerializer, axiosCreate, prepareParams };
