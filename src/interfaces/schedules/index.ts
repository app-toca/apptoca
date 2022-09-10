import { Schedules } from "../../entities/Schedules.entity"

export interface ISchedulesRequest {
    user_id?: string,
    area_id?: string,
    hour?: string,
    day?: string
}

export interface IReportSchedule {
    day?: number
    hour?: string
    qtt_users?: number
  }

export interface ISchedulesArray {
    schedules: Schedules[];
}