import { DailyDetail, UserConfig } from "../types";
import DEFAULT_USER_CONFIG from "../data/defaultConfig";
import { formattedDate } from "../utilities/dateFormating";
import printWithColor from "../utilities/printWithColor";

export const saveDailyDetails = (
  date: Date,
  dailyDetails: DailyDetail[]
): void => {
  const year = formattedDate(date).year;
  try {
    localStorage.setItem(year.toString(), JSON.stringify(dailyDetails));
    printWithColor("DailyDetails guardados");
  } catch (error) {
    console.error(error);
    printWithColor("no se pudo guardar");
  }
};

export const getDailyDetails = (date: Date): DailyDetail[] => {
  const year = formattedDate(date).year.toString();
  try {
    const data = localStorage.getItem(year);
    if (data !== null) {
      let dailyDetails: Array<DailyDetail> = JSON.parse(data);
      for (let i = 0; i < dailyDetails?.length; i++) {
        dailyDetails[i].date = new Date(dailyDetails[i].date);
      }

      printWithColor("datos obtenidos", "blue");
      console.log(dailyDetails);
      return dailyDetails ? dailyDetails : [];
    }
  } catch (error) {
    console.error(error);
  }
  printWithColor("sin datos", "blue");
  return [];
};

export const saveUserConfig = (config: UserConfig): void => {};

export const getUserConfig = (): UserConfig => {
  return DEFAULT_USER_CONFIG;
};
