export interface iOrganizationRequest {
  name: string;
  password: string;
}

export interface iOrganizationUpdateRequest {
  org_id: string;
  name?: string;
}
