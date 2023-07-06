/* eslint-disable import/prefer-default-export */
import { UPDATE_CONFIG } from "./globalConfig.reducer";
import { Action } from "redux";

export interface UpdateConfigAction extends Action<typeof UPDATE_CONFIG> {
  payload: any;
}
export const updateConfig = (payload: any): UpdateConfigAction => {
  return {
    type: UPDATE_CONFIG,
    payload,
  };
};
