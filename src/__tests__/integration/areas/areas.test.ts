import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
  marketingArea,
  marketingAreaUnkown,
  marketingAreaUpdated,
} from "../../mocks/areas";
import {
  nonAdminUser,
  organizationToca,
  organizationUnknow,
  userOwner,
  userOwnerUnknow,
  userOwnerLogin,
} from "../../mocks/users";

describe("/areas", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    const orgToca = await request(app)
      .post("/organization")
      .send(organizationToca);
    const orgUnknow = await request(app)
      .post("/organization")
      .send(organizationUnknow);
    await request(app)
      .post(`/users/${orgToca.body.id}/${organizationToca.password}`)
      .send(userOwner);
    await request(app)
      .post(`/users/${orgUnknow.body.id}/${organizationUnknow.password}`)
      .send(userOwnerUnknow);
    await request(app)
      .post(`/users/${orgToca.body.id}/${organizationToca.password}`)
      .send(nonAdminUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /areas - Must be able to create a area", async () => {
    const onwerLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const response = await request(app)
      .post("/areas")
      .set("Authorization", `Bearer ${onwerLoginResponse.body.token}`)
      .send(marketingArea);
    marketingArea.id = response.body.id;

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("description");
  });

  test("POST /areas - Must be able to create a area to other organization", async () => {
    const userOwnerUnknowLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerUnknow);
    const response = await request(app)
      .post("/areas")
      .set("Authorization", `Bearer ${userOwnerUnknowLoginResponse.body.token}`)
      .send(marketingAreaUnkown);
    marketingAreaUnkown.id = response.body.id;

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("description");
  });

  test("POST /areas - Should not be able to create a area that already exists in same organization", async () => {
    const onwerLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const response = await request(app)
      .post("/areas")
      .set("Authorization", `Bearer ${onwerLoginResponse.body.token}`)
      .send(marketingArea);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /areas - Should not be able to create a area without authentication", async () => {
    const response = await request(app).post("/areas").send(marketingArea);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /areas - Should not be able to create a area not being owner", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(nonAdminUser);
    const response = await request(app)
      .post("/areas")
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`)
      .send(marketingArea);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /areas - Must be able list all areas from organization", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(nonAdminUser);
    const response = await request(app)
      .get("/areas")
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("description");
    expect(response.status).toBe(200);
  });

  test("GET /areas - Should not be able to list all areas from organization without authentication", async () => {
    const response = await request(app).get("/areas");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /areas/:area_id - Must be able list one area from organization", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(nonAdminUser);
    const response = await request(app)
      .get(`/areas/${marketingArea.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBe(marketingArea.name);
    expect(response.body).toHaveProperty("description");
    expect(response.status).toBe(200);
  });

  test("GET /areas/:area_id - Should not be able to list one areas from organization without authentication", async () => {
    const response = await request(app).get(`/areas/${marketingArea.id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /areas/:area_id - Must be able to update a area", async () => {
    const onwerLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const response = await request(app)
      .patch(`/areas/${marketingArea.id}`)
      .set("Authorization", `Bearer ${onwerLoginResponse.body.token}`)
      .send(marketingAreaUpdated);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBe(marketingAreaUpdated.name);
    expect(response.body).toHaveProperty("description");
  });

  test("PATCH /areas - Should not be able to update a area not being owner", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(nonAdminUser);
    const response = await request(app)
      .patch(`/areas/${marketingArea.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`)
      .send(marketingArea);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /areas - Should not be able to update a area being owner from other organizarion", async () => {
    const onwerLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const response = await request(app)
      .patch(`/areas/${marketingAreaUnkown.id}`)
      .set("Authorization", `Bearer ${onwerLoginResponse.body.token}`)
      .send(marketingAreaUnkown);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /areas - Should not be able to delete a area not being owner", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(nonAdminUser);
    const response = await request(app)
      .delete(`/areas/${marketingArea.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /areas/:area_id - Must be able to delete a area", async () => {
    const onwerLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const response = await request(app)
      .delete(`/areas/${marketingArea.id}`)
      .set("Authorization", `Bearer ${onwerLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /areas - Should not be able to delete a area being owner from other organization", async () => {
    const onwerLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const response = await request(app)
      .delete(`/areas/${marketingAreaUnkown.id}`)
      .set("Authorization", `Bearer ${onwerLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /areas/:area_id - Must be able to delete  area", async () => {
    const userOwnerUnknowLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerUnknow);
    const response = await request(app)
      .delete(`/areas/${marketingAreaUnkown.id}`)
      .set(
        "Authorization",
        `Bearer ${userOwnerUnknowLoginResponse.body.token}`
      );

    expect(response.status).toBe(204);
  });
});
