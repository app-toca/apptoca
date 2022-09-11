import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { marketingArea } from "../../mocks/areas";
import { areaUser } from "../../mocks/areas_users";
import { meeting, meetingUpdate } from "../../mocks/meetings";
import { organizationToca } from "../../mocks/organization";
import {
  adminUser,
  nonAdminUser,
  userAdminLogin,
  userNonAdminLogin,
  userOwner,
  userOwnerLogin,
} from "../../mocks/users";

describe("/meetings", () => {
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
      .post("/organizations")
      .send(organizationToca);
    organizationToca.id = orgToca.body.id;
    await request(app)
      .post(`/users/${orgToca.body.id}/${organizationToca.password}`)
      .send(userOwner);
    const adminUserRes = await request(app)
      .post(`/users/${orgToca.body.id}/${organizationToca.password}`)
      .send(adminUser);
    const nonAdminRes = await request(app)
      .post(`/users/${orgToca.body.id}/${organizationToca.password}`)
      .send(nonAdminUser);
    areaUser.user_id = nonAdminRes.body.id;

    const ownerLogin = await request(app).post("/login").send(userOwnerLogin);
    await request(app)
      .patch(`/users/${adminUserRes.body.id}`)
      .set("Authorization", `Bearer ${ownerLogin.body.token}`);

    const areaResponse = await request(app)
      .post("/areas")
      .set("Authorization", `Bearer ${ownerLogin.body.token}`)
      .send(marketingArea);
    marketingArea.id = areaResponse.body.id;
    areaUser.area_id = areaResponse.body.id;

    await request(app)
      .post("/administration/area")
      .send(areaUser)
      .set("Authorization", `Bearer ${ownerLogin.body.token}`);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /meetings/:area_id - Must be able to create a meeting", async () => {
    const adminLogin = await request(app).post("/Login").send(userAdminLogin);
    const response = await request(app)
      .post(`/mettings/${marketingArea.id}`)
      .set("Authorization", `Bearer ${adminLogin.body.token}`)
      .send(meeting);
    meeting.id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("duration");
    expect(response.body).toHaveProperty("ata");
    expect(response.body).toHaveProperty("date_time");
  });

  test("POST /meetings/:area_id - Should not be able to create a meeting not being adm", async () => {
    const nonAdminLogin = await request(app)
      .post("/Login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .post(`/mettings/${marketingArea.id}`)
      .set("Authorization", `Bearer ${nonAdminLogin.body.token}`)
      .send(meeting);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /meetings/:area_id - Should not be able to create a meeting without authorization", async () => {
    const response = await request(app)
      .post(`/mettings/${marketingArea.id}`)
      .send(meeting);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /meetings/:area_id - Must be able list all meetings being a owner", async () => {
    const ownerLogin = await request(app).post("/login").send(userOwnerLogin);
    const response = await request(app)
      .get(`/mettings`)
      .set("Authorization", `Bearer ${ownerLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("GET /meetings/:area_id - Should not be able list all meetings being a adm", async () => {
    const adminLogin = await request(app).post("/Login").send(userAdminLogin);
    const response = await request(app)
      .get(`/mettings`)
      .set("Authorization", `Bearer ${adminLogin.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /meetings/:area_id - Should not be able list all meetings without authorizaton", async () => {
    const response = await request(app).get(`/mettings`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /meetings/:meeting_id - Must be able show one meetings", async () => {
    const nonAdminLogin = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .get(`/mettings/${meeting.id}`)
      .set("Authorization", `Bearer ${nonAdminLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("duration");
    expect(response.body).toHaveProperty("ata");
    expect(response.body).toHaveProperty("date_time");
  });

  test("GET /meetings/:meeting_id - Should not be able show one meetings not being from area", async () => {
    const adminLogin = await request(app).post("/Login").send(userAdminLogin);
    const response = await request(app)
      .get(`/mettings/${meeting.id}`)
      .set("Authorization", `Bearer ${adminLogin.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /meetings/:meeting_id - Should not be able show one meetings without authorization", async () => {
    const response = await request(app).get(`/mettings/${meeting.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /meetings/areas/:area_id - Must be able list all meetings from area", async () => {
    const nonAdminLogin = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .get(`/mettings/areas/${marketingArea.id}`)
      .set("Authorization", `Bearer ${nonAdminLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("GET /meetings/areas/:area_id - Should not be able list all meetings from area not being from area", async () => {
    const adminLogin = await request(app).post("/Login").send(userAdminLogin);
    const response = await request(app)
      .get(`/mettings/areas/${marketingArea.id}`)
      .set("Authorization", `Bearer ${adminLogin.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /meetings/:meeting_id - Should not be able list all meetings from area without authorization", async () => {
    const response = await request(app).get(`/mettings/${meeting.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /meetings/:meeting_id - Must be able to update a meeting", async () => {
    const adminLogin = await request(app).post("/Login").send(userAdminLogin);
    const response = await request(app)
      .patch(`/mettings/${meeting.id}`)
      .set("Authorization", `Bearer ${adminLogin.body.token}`)
      .send(meetingUpdate);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("duration");
    expect(response.body).toHaveProperty("ata");
    expect(response.body).toHaveProperty("date_time");
  });

  test("PATCH /meetings/:meeting_id - Should not be able to update a meeting not being adm", async () => {
    const nonAdminLogin = await request(app)
      .post("/Login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .patch(`/mettings/${meeting.id}`)
      .set("Authorization", `Bearer ${nonAdminLogin.body.token}`)
      .send(meetingUpdate);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /meetings/:meeting_id - Should not be able to create a meeting without authorization", async () => {
    const response = await request(app)
      .patch(`/mettings/${meeting.id}`)
      .send(meetingUpdate);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /meetings/:meeting_id - Should not be able to update a meeting not being adm", async () => {
    const nonAdminLogin = await request(app)
      .post("/Login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .delete(`/mettings/${meeting.id}`)
      .set("Authorization", `Bearer ${nonAdminLogin.body.token}`)
      .send(meetingUpdate);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /meetings/:meeting_id - Should not be able to create a meeting without authorization", async () => {
    const response = await request(app)
      .delete(`/mettings/${meeting.id}`)
      .send(meetingUpdate);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /meetings/:meeting_id - Must be able to delete a meeting", async () => {
    const adminLogin = await request(app).post("/Login").send(userAdminLogin);
    const response = await request(app)
      .delete(`/mettings/${meeting.id}`)
      .set("Authorization", `Bearer ${adminLogin.body.token}`)
      .send(meetingUpdate);

    expect(response.status).toBe(204);
  });
});
