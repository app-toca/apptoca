import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { marketingArea } from "../../mocks/areas";
import { IOrganizationResponse } from "../../../interfaces/organizations";
import { postTest } from "../../mocks/posts";
import { IUserResponse } from "../../../interfaces/users";
import { iAreaResponse } from "../../../interfaces/areas";
import { organizationToca } from "../../mocks/organization";
import {
  nonAdminUser,
  userAdminLogin,
  userNonAdminLogin,
  userOwner,
} from "../../mocks/users";
import { IPostResponse } from "../../../interfaces/posts";
import { Schedules } from "../../../entities/Schedules.entity";

let organization: IOrganizationResponse;
let userNonAdminCreated: IUserResponse;
let userOwnerCreated: IUserResponse;
let marketingAreaCreated: iAreaResponse;
let postCreated: IPostResponse;

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

    const responseUserNonAdmin = await request(app)
      .post(`/users/${organization.id}/${organizationToca.password}`)
      .send(nonAdminUser);

    userNonAdminCreated = responseUserNonAdmin.body;

    const responseArea = await request(app).post(`/areas`).send(marketingArea);

    marketingAreaCreated = responseArea.body;
  });

  test("POST /posts -  Must be able to create a post with an admin user", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminLogin);
    const response = await request(app)
      .post("/posts")
      .send(postTest)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.body).toHaveProperty("content");
    expect(response.body.content).toEqual(postTest.content);
    expect(response.status).toBe(201);
  });

  test("POST /posts -  should not be able to create a post if not being admin", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .post("/posts")
      .send(postTest)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  /*-------------*/

  test("PATCH /posts/:post_id -  should not be able to update a post if not being admin", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .patch(`/posts/${postCreated.id}`)
      .send({ content: "Teste" })
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);
    const findPost = await request(app)
      .get(`/posts/${postCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(findPost.body.content).toBe(postCreated.content);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /posts/:post_id -  should not be able to update a post if you're admin but not the owner of the post", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .patch(`/posts/${postCreated.id}`)
      .send({ content: "Teste" })
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);
    const findPost = await request(app)
      .get(`/posts/${postCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(findPost.body.content).toBe(postCreated.content);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /posts/:post_id -  Must be able to update a post", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminLogin);
    const response = await request(app)
      .patch(`/posts/${postCreated.id}`)
      .send({ content: "Testando patch do meu post" })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const findPost = await request(app)
      .get(`/posts/${postCreated.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(findPost.body.content).toBe("Testando patch do meu post");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("post");
    expect(response.body.content).toBe("Testando patch do meu post");
  });

  test("PATCH - /posts/:post_id  should not be able to update post with invalid id", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminLogin);
    const response = await request(app)
      .patch(`/posts/1242435`)
      .send({ content: "Nothing" })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  /*--------------*/

  test("GET /posts -  Must be able to list all posts", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
  });

  test("GET /posts -  should not be able to list posts without authentication", async () => {
    const response = await request(app).get("/posts");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /posts/:post_id -  Must be able to get one post", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .get(`/posts/${postCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBe(postCreated.id);
  });

  test("GET /posts/areas/:area_id -  Must be able to list posts by area", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .get(`/posts/areas/${marketingAreaCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe(postCreated.id);
  });

  /*-------------*/

  test("DELETE /posts/:post_id -  should not be able to delete a post if not being admin", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .delete(`/posts/${postCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);
    const findPost = await request(app)
      .get(`/posts/${postCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(findPost.body.content).toBe(postCreated.content);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /posts/:post_id -  should not be able to delete a post if you're admin but not the owner of the post", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .delete(`/posts/${postCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);
    const findPost = await request(app)
      .get(`/posts/${postCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(findPost.body.content).toBe(postCreated.content);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /posts/:post_id -  Must be able to delete a post", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminLogin);
    const response = await request(app)
      .delete(`/posts/${postCreated.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const findPost = await request(app)
      .get(`/posts/${postCreated.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(findPost.body.status).toBe(404);
  });

  test("DELETE - /posts/:post_id  should not be able to delete post with invalid id", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminLogin);
    const response = await request(app)
      .delete(`/posts/1242435`)
      .send({ content: "Nothing" })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
