export interface IOneMeetingRequest {
  id: string;
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
  meeting_id: string;
}
