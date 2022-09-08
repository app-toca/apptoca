export interface IOneMeetingRequest {
    id: string
}

export interface IMeetingRequest {
    description: string, 
    duration: number, 
    id: string,
    area_id: string
}

export interface IMeetingUpdateRequest {
    description?: string,
    meeting_id: string
}
