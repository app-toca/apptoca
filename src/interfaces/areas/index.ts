export interface iAreaRequest {
  name: string;
  description: string;
  organization: string;
}

export interface iAreaResponse extends iAreaRequest {
  id: string;
}

export interface iAreaUpdateRequest {
  area_id: string;
  name?: string;
  description?: string;
}
