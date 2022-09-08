export interface IUserRequest {
  name: string;
  nickname: string;
  email: string;
  age: number;
  password: string;
  year: number;
  course: string;
  phrase: string;
  isAdm: boolean;
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
}
