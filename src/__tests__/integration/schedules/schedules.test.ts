import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { IUserResponse } from "../../../interfaces/users";
import { IOrganizationResponse } from "../../../interfaces/organizations";
import { organizationToca } from "../../mocks/organization";
import {
  nonAdminUser,
  userNonAdminLogin,
  userOwner,
  userOwnerLogin,
} from "../../mocks/users";
import { iAreaResponse } from "../../../interfaces/areas";
import { marketingArea } from "../../mocks/areas";

let userOwnerCreated: IUserResponse;
let organization: IOrganizationResponse;
let marketingAreaCreated: iAreaResponse;
let userNonAdminCreated: IUserResponse;

describe("/schedules", () => {
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

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);

    const responseArea = await request(app).post(`/areas`).send(marketingArea).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    marketingAreaCreated = responseArea.body;
  });

  const scheduleNonAdminUser = [
    { day: 1, hour: "20:00" },
    { day: 0, hour: "21:00" },
  ];
  const scheduleAdminUser = [
    { day: 1, hour: "20:00" },
    { day: 2, hour: "17:00" },
  ];

  test("POST /schedules -  Must be able to add a schedule", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const response = await request(app)
      .post(`/schedules`)
      .send(scheduleNonAdminUser)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);
    const response2 = await request(app)
      .post(`/schedules`)
      .send(scheduleAdminUser)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(2);
    expect(response.status).toBe(201);
    expect(response.body[0]).not.toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("day");
    expect(response.body[0]).toHaveProperty("hour");
    expect(response2.status).toBe(201);
  });

  test("POST /schedules -  should not be able to add a schedule without authentication", async () => {
    const response = await request(app)
      .post(`/schedules`)
      .send(scheduleNonAdminUser);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /schedules/users/:user_id -  Must be able to list your own schedule", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .get(`/schedules/users/${userNonAdminCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(2);
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("day");
    expect(response.body[0]).toHaveProperty("hour");
  });

  test("GET /schedules/users/:user_id -  should not be able to list a user's schedule without authentication", async () => {
    const response = await request(app).get(
      `/schedules/users/${userNonAdminCreated.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /schedules/users/:user_id -  should not be able to list another user's schedule if being non admin", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .get(`/schedules/users/${userOwnerCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /schedules/users/:user_id -  Must be able to list another user's schedule if being admin", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const response = await request(app)
      .get(`/schedules/users/${userNonAdminCreated.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(2);
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("day");
    expect(response.body[0]).toHaveProperty("hour");
  });

  test("GET /schedules -  Must be able to list all schedules if being admin", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const response = await request(app)
      .get(`/schedules`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(2);
    expect(response.status).toBe(200);
    expect(response.body[0].schedules[0]).toHaveProperty("id");
    expect(response.body[0].schedules[0]).toHaveProperty("day");
    expect(response.body[0].schedules[0]).toHaveProperty("hour");
    expect(response.body[0].schedules).toHaveLength(2);

  });

  test("GET /schedules -  Should not be able to list all schedules if being non admin", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .get(`/schedules`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /schedules/areas/:area_id-  Must be able to list schedules of users in some area if being admin", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const responseAreaUser = await request(app)
      .post(`/administration/area/${userNonAdminCreated.id}/${marketingAreaCreated.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app)
      .get(`/schedules/areas/${marketingAreaCreated.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("day");
    expect(response.body[0]).toHaveProperty("hour");
  });

  test("GET /schedules/areas/:area_id - Should not be able to list schedules of users in some area if not being admin", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const responseAreaUser = await request(app)
      .post("/administration/area")
      .send({ user_id: userOwnerCreated.id, area_id: marketingAreaCreated.id })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app)
      .get(`/schedules/areas/${marketingAreaCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /schedules/hours/days/areas/:day[0-6]/:hour/:area_id -  Must be able to list users in some area that have some schedule if being admin", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const response = await request(app)
      .get(`/schedules/hours/days/areas/0/21:00/${marketingAreaCreated.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("user");
  });

  test("GET /schedules/hours/days/areas/:day[0-6]/:hour/:area_id - Should not be able to list users in some area that have some schedule if not being admin", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .get(`/schedules/hours/days/areas/0/20:00/${marketingAreaCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /schedules/:area_id/report -  Must be able to get the report of hours by quantity of users if being admin", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const response = await request(app)
      .get(`/schedules/${marketingAreaCreated.id}/report`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);


    expect(response.body).toHaveLength(2);
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("day");
    expect(response.body[0]).toHaveProperty("hour");
    expect(response.body[0]).toHaveProperty("qtt_users");
    expect(response.body[0].qtt_users).toBe(1);
  });

  test("GET /schedules/:area_id/report - Should not be able to to get the report of hours by quantity of users if not being admin", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .get(`/schedules/${marketingAreaCreated.id}/report`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  const scheduleNonAdminUserChanged = [
    { day: 4, hour: "21:00" },
    { day: 5, hour: "16:00" },
    { day: 3, hour: "18:00" },
  ];

  test("PATCH /schedules -  Must be able to change a schedule", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .patch(`/schedules`)
      .send(scheduleNonAdminUserChanged)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(3);
    expect(response.status).toBe(201);
    expect(response.body[0]).toHaveProperty("day");
    expect(response.body[0]).toHaveProperty("hour");
  });

  test("DELETE /schedules -  Must be able to delete all schedule", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .delete(`/schedules`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);
    const responseSchedulesByThisUser = await request(app)
      .get(`/schedules/users/${userNonAdminCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(responseSchedulesByThisUser.body).toHaveLength(0);
    expect(response.status).toBe(204);
  });
});
