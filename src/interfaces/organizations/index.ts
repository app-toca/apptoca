export interface IOrganizationRequest {
  name: string;
  password: string;
}

export interface IOrganizationResponse {
  id: string
  name: string
}

export interface IOrganizationUpdateRequest {
  org_id: string;
  name?: string;
}
