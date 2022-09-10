import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
  organizationToca,
  organizationUnknow,
  organizationToca2,
  organizationUnknowUpdate,
} from "../../mocks/organization";
import { userOfUnknowOrg, userOfUnknowOrgLogin } from "../../mocks/users";

describe("/organizations", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    const orgUnknow = await request(app)
      .post("/organizations")
      .send(organizationUnknow);
    organizationUnknow.id = orgUnknow.body.id;
    await request(app)
      .post(`/users/${orgUnknow.body.id}/${organizationUnknow.password}`)
      .send(userOfUnknowOrg);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /organizations - Must be able to create a organization", async () => {
    const response = await request(app)
      .post("/organizations")
      .send(organizationToca);
    organizationToca.id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("password");
  });

  test("POST /organizations - Should not be able to create a organization with the same name", async () => {
    const response = await request(app)
      .post("/organizations")
      .send(organizationToca);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /organizations - Must be able to create a organization with different name, but same password", async () => {
    const response = await request(app)
      .post("/organizations")
      .send(organizationToca2);
    organizationToca2.id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("password");
  });

  test("GET /organizations - Must be able to list all organizations", async () => {
    const response = await request(app).get("/organizatins");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).not.toHaveProperty("password");
  });

  test("GET /Organizations/:org_id - Must be able to list one organization", async () => {
    const userOfUnknowOrgLoginResponse = await request(app)
      .post("/login")
      .send(userOfUnknowOrgLogin);
    const response = await request(app)
      .get(`/organizations/${organizationUnknow.id}`)
      .set(
        "Authorization",
        `Bearer ${userOfUnknowOrgLoginResponse.body.token}`
      );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("password");
  });

  test("GET /Organizations/:org_id - Should not be able to list one organization without Authorization", async () => {
    const response = await request(app).get(
      `/organizations/${organizationUnknow.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /Organizations/:org_id - Should not be able to list one organization not being a member", async () => {
    const userOfUnknowOrgLoginResponse = await request(app)
      .post("/login")
      .send(userOfUnknowOrgLogin);
    const response = await request(app)
      .get(`/organizations/${organizationToca.id}`)
      .set(
        "Authorization",
        `Bearer ${userOfUnknowOrgLoginResponse.body.token}`
      );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /organizations/:org_idd - Must be able to update a organization", async () => {
    const userOfUnknowOrgLoginResponse = await request(app)
      .post("/login")
      .send(userOfUnknowOrgLogin);
    const response = await request(app)
      .patch(`/organizations/${organizationUnknow.id}`)
      .set("Authorization", `Bearer ${userOfUnknowOrgLoginResponse.body.token}`)
      .send(organizationUnknowUpdate);
    organizationUnknowUpdate.id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBe(organizationUnknowUpdate.name);
    expect(response.body).toHaveProperty("password");
  });

  test("PATCH /organizations/:org_idd - Should not be able to update a organization with the same name od other", async () => {
    const userOfUnknowOrgLoginResponse = await request(app)
      .post("/login")
      .send(userOfUnknowOrgLogin);
    const response = await request(app)
      .patch(`/organizations/${organizationUnknow.id}`)
      .set("Authorization", `Bearer ${userOfUnknowOrgLoginResponse.body.token}`)
      .send(organizationToca);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /organizations/:org_idd - Should not be able to update a organization without authorization", async () => {
    const response = await request(app)
      .patch(`/organizations/${organizationUnknow.id}`)
      .send(organizationToca);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
