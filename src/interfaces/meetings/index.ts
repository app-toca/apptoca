export interface IOneMeetingRequest {
    id: string
}

export interface IMeetingRequest {
    description: string
    duration: string
    ata: string
    date_time: Date
    
}

export interface IMeetingUpdateRequest {
    description?: string
    meeting_id: string
}
