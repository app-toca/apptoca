export interface IUserRequest {
  name: string;
  nickname: string;
  email: string;
  age: number;
  password: string;
  year: number;
  course: string;
  phrase: string;
  img: string;
}

export interface IUserUpdate {
  name?: string;
  nickname?: string;
  email?: string;
  age?: number;
  updated_at?: Date;
  phrase?: string;
  img?: string;
  course?: string;
  year?: number;
  password?: string
}

export interface IUserResponse {
    id: string
    name: string
    email: string
    nickname: string
    age: number
    year: number
    course: string
    phrase: string
    is_adm: boolean
    is_owner: boolean
    is_active: boolean
    img?: string
    created_at: Date
    updated_at: Date
    organization_id: string
}

export interface IUserLoginRequest {
    email: string
    password: string
}