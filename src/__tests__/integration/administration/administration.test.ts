import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { IUserResponse } from "../../../interfaces/users";
import { IOrganizationResponse } from "../../../interfaces/organizations";
import { organizationToca, organizationUnknow } from "../../mocks/organization";
import {
  nonAdminUser,
  userNonAdminLogin,
  userOfUnknowOrg,
  userOwner,
  userOwnerLogin,
} from "../../mocks/users";
import { iAreaResponse } from "../../../interfaces/areas";
import { marketingArea } from "../../mocks/areas";

let userOwnerCreated: IUserResponse;
let organization: IOrganizationResponse;
let marketingAreaCreated: iAreaResponse;
let userNonAdminCreated: IUserResponse;
let organization2: IOrganizationResponse;
let userOfUnknowOrgCreated: IUserResponse;

describe("/administration/area", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  beforeAll(async () => {
    const response = await request(app)
      .post("/organizations")
      .send(organizationToca);

    organization = response.body;

    const responseUserOwner = await request(app)
      .post(`/users/${organization.id}/${organizationToca.password}`)
      .send(userOwner);

    userOwnerCreated = responseUserOwner.body;

    const responseUserNonAdmin = await request(app)
      .post(`/users/${organization.id}/${organizationToca.password}`)
      .send(nonAdminUser);

    userNonAdminCreated = responseUserNonAdmin.body;

    const loginAdmin = await request(app).post("/login").send(userOwnerLogin);

    const responseArea = await request(app)
      .post(`/areas`)
      .send(marketingArea)
      .set("Authorization", `Bearer ${loginAdmin.body.token}`);

    marketingAreaCreated = responseArea.body;

    const responseOrg2 = await request(app)
      .post("/organizations")
      .send(organizationUnknow);

    organization2 = responseOrg2.body;

    const responseUserOrg2 = await request(app)
      .post(`/users/${organization2.id}/${organizationUnknow.password}`)
      .send(userOfUnknowOrg);

    userOfUnknowOrgCreated = responseUserOrg2.body;
  });

  test("POST /administration/area/:user_id/:area_id -  Must be able to create the relation with user and area", async () => {
    const loginAdmin = await request(app).post("/login").send(userOwnerLogin);

    const body = {
      user_id: userNonAdminCreated.id,
      area_id: marketingAreaCreated.id,
    };
    const response = await request(app)
      .post(`/administration/area/${body.user_id}/${body.area_id}`)
      .set("Authorization", `Bearer ${loginAdmin.body.token}`);

    const responseAreasOfUser = await request(app)
      .get(`/users/${userNonAdminCreated.id}/areas`)
      .set("Authorization", `Bearer ${loginAdmin.body.token}`);

    expect(response.status).toBe(201);
    expect(responseAreasOfUser.body).toHaveLength(1);
  });

  test("POST /administration/area/:user_id/:area_id -  Should not be able to create the relation with user and area if not being an admin user", async () => {
    const loginNonAdmin = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const body = {
      user_id: userNonAdminCreated.id,
      area_id: marketingAreaCreated.id,
    };
    const response = await request(app)
      .post(`/administration/area/${body.user_id}/${body.area_id}`)
      .set("Authorization", `Bearer ${loginNonAdmin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /administration/area/:user_id/:area_id -  Should not be able to create the relation with user and area if pass an invalid user_id", async () => {
    const loginAdmin = await request(app).post("/login").send(userOwnerLogin);
    const body = { user_id: "54796665646", area_id: marketingAreaCreated.id };
    const response = await request(app)
      .post(`/administration/area/${body.user_id}/${body.area_id}`)
      .set("Authorization", `Bearer ${loginAdmin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("POST /administration/area/:user_id/:area_id -  Should not be able to create the relation with user and area if pass an invalid area_id", async () => {
    const loginAdmin = await request(app).post("/login").send(userOwnerLogin);
    const body = { user_id: userNonAdminCreated.id, area_id: "13242565" };
    const response = await request(app)
      .post(`/administration/area/${body.user_id}/${body.area_id}`)
      .set("Authorization", `Bearer ${loginAdmin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("POST /administration/area/:user_id/:area_id -  Should not be able to create the relation with user and area if the user is from another organization", async () => {
    const loginAdmin = await request(app).post("/login").send(userOwnerLogin);
    const body = {
      user_id: userOfUnknowOrgCreated.id,
      area_id: marketingAreaCreated.id,
    };
    const response = await request(app)
      .post(`/administration/area/${body.user_id}/${body.area_id}`)
      .set("Authorization", `Bearer ${loginAdmin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /administration/area/:user_id/:area_id -  Must be able to delete the relation with user and area", async () => {
    const loginAdmin = await request(app).post("/login").send(userOwnerLogin);
    const response = await request(app)
      .delete(
        `/administration/area/${userNonAdminCreated.id}/${marketingAreaCreated.id}`
      )
      .set("Authorization", `Bearer ${loginAdmin.body.token}`);

    const responseAreasOfUser = await request(app)
      .get(`/users/${userNonAdminCreated.id}/areas`)
      .set("Authorization", `Bearer ${loginAdmin.body.token}`);

    expect(response.status).toBe(204);
    expect(responseAreasOfUser.body).toHaveLength(0);
  });

  test("DELETE /administration/area/:user_id/:area_id -  Should not be able to delete the relation without authentication", async () => {
    const response = await request(app).delete(
      `/administration/area/${userNonAdminCreated.id}/${marketingAreaCreated.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
