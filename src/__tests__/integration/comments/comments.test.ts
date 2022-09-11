import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { comment } from "../../mocks/comments";
import { organizationToca } from "../../mocks/organization";
import { postTest } from "../../mocks/posts";
import {
  nonAdminUser,
  userNonAdminLogin,
  userOwner,
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
      .post("/organizations")
      .send(organizationToca);
    await request(app)
      .post(`/users/${orgToca.body.id}/${organizationToca.password}`)
      .send(userOwner);
    await request(app)
      .post(`/users/${orgToca.body.id}/${organizationToca.password}`)
      .send(nonAdminUser);

    const ownerLogin = await request(app).post("/login").send(userOwnerLogin);
    const response = await request(app)
      .post(`/posts/$`)
      .send(postTest)
      .set("Authorization", `Bearer ${ownerLogin.body.token}`);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /comments/:post_id - Must be able to create a comment", async () => {
    const nonAdminLogin = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${nonAdminLogin.body.token}`)
      .send(comment);
    comment.id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("content");
    expect(response.body).toHaveProperty("create_at");
  });
});
