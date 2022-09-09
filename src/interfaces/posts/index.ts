export interface IPostRequest {
    content: string
}

export interface IPostResponse extends IPostRequest {
    id: string
    created_at: Date
    update_at: Date
}