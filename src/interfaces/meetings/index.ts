export interface IOneMeetingRequest {
    id: string
}

export interface IMeetingRequest {
    description: string
    duration: string
    ata: string
    date_time: Date
    area_id: string
    user_id: string
    
}

export interface IMeetingUpdateRequest {
    description?: string
    meeting_id: string
}
