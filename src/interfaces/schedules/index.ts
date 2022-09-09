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