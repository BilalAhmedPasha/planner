/* eslint-disable import/prefer-default-export */
import { UPDATE_CONFIG } from './globalConfig.reducer';

export const updateConfig = (payload) => {
  return {
    type: UPDATE_CONFIG,
    payload,
  };
};
