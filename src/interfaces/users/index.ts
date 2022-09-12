import { Image } from "../../entities/Image.entity";

export interface IUserRequest {
  name: string;
  nickname: string;
  email: string;
  age: number;
  password: string;
  year: number;
  course: string;
  phrase: string;
  url?: string;
}

export interface IUserTest extends IUserRequest {
  id?: string;
}

export interface IUserUpdate {
  name?: string;
  nickname?: string;
  email?: string;
  age?: number;
  updated_at?: Date;
  phrase?: string;
  img?: Image;
  course?: string;
  year?: number;
  password?: string;
  is_adm?: boolean;
  is_active?: boolean;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  nickname: string;
  age: number;
  year: number;
  course: string;
  phrase: string;
  is_adm: boolean;
  is_owner: boolean;
  is_active: boolean;
  img?: Image;
  created_at: Date;
  updated_at: Date;
  organization_id: string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}
