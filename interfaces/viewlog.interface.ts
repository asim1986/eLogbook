import { StudLog } from "./comp.interface";

export interface IViewLogbook {
  show: boolean;
  isAdmin?: boolean;
  data: StudLog;
}
