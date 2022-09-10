import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { IUserResponse } from "../../../interfaces/users";
import { IOrganizationResponse } from "../../../interfaces/organizations";
import { organizationToca } from "../../mocks/organization";
import { userOwner, userOwnerLogin } from "../../mocks/users";

let userOwnerCreated: IUserResponse;
let organization: IOrganizationResponse;

describe("/posts", () => {
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
  });

  test("POST /login -  Must be able to login", async () => {
    const response = await request(app).post("/login").send(userOwnerLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });
});
