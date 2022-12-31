import { UserConfig } from "../types";
import { serviceGroups } from "./services";

const DEFAULT_USER_CONFIG: UserConfig = {
  place: "anywhere",
  admin: "admin",
  serviceGroups: serviceGroups,
};

export default DEFAULT_USER_CONFIG;
