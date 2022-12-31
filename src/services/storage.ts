import { DailyDetail, UserConfig } from "../types";
import DEFAULT_USER_CONFIG from "../data/defaultConfig";

export const saveDailyDetails = (data: DailyDetail[]): void => {};

export const geDailyDetails = (): DailyDetail[] => {
  return [];
};

export const saveUserConfig = (config: UserConfig): void => {};

export const getUserConfig = (): UserConfig => {
  return DEFAULT_USER_CONFIG;
};
