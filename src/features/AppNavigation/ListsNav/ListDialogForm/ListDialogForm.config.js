import * as yup from "yup";

export const DEFAULT_VALUES = () => {
  return {
    name: null,
    color: null,
  };
};

export const VALIDATION_SCHEMA = () => {
  return yup.object({
    name: yup.string().required("Name is required").nullable(),
    color: yup.string().required("Color is required").nullable(),
  });
};
