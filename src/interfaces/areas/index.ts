import { Image } from "../../entities/Image.entity";

export interface iAreaRequest {
  name: string;
  description: string;
}

export interface iAreaResponse extends iAreaRequest {
  id: string;
}

export interface iAreaUpdateRequest {
  area_id: string;
  name?: string;
  description?: string;
  organization: string;
}

export interface IAreaTest {
  id?: string;
  name: string;
  description: string;
}

export interface IUsersInArea {
  id: string;
  nickname: string;
  is_adm: boolean;
  img: Image;
}
