export interface IOneMeetingRequest {
  meeting_id: string;
}

export interface IMeetingRequest {
  description: string;
  duration: string;
  ata: string;
  date_time: Date;
  area_id: string;
  id: string;
}

export interface IMeetingTest {
  id?: string;
  description: string;
  duration: string;
  date_time: string;
  ata: string;
}

export interface IMeetingUpdateRequest {
  description?: string;
  date_time?: string;
  duration?: string;
  ata?: string;
  meeting_id: string;
}
