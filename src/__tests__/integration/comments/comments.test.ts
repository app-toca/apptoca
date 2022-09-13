import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { marketingArea } from "../../mocks/areas";
import { comment, comment2, commentUpdate } from "../../mocks/comments";
import { organizationToca } from "../../mocks/organization";
import { postTest } from "../../mocks/posts";
import {
  adminUser,
  nonAdminUser,
  userAdminLogin,
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
    const nonAdmimRes = await request(app)
      .post(`/users/${orgToca.body.id}/${organizationToca.password}`)
      .send(nonAdminUser);
    nonAdminUser.id = nonAdmimRes.body.id;
    const admimRes = await request(app)
      .post(`/users/${orgToca.body.id}/${organizationToca.password}`)
      .send(adminUser);
    adminUser.id = admimRes.body.id;

    const ownerLogin = await request(app).post("/login").send(userOwnerLogin);
    const areaResponse = await request(app)
      .post("/areas")
      .set("Authorization", `Bearer ${ownerLogin.body.token}`)
      .send(marketingArea);

    marketingArea.id = areaResponse.body.id;

    const areaUser = await request(app)
      .post(`/administration/area/${adminUser.id}/${marketingArea.id}`)
      .set("Authorization", `Bearer ${ownerLogin.body.token}`);

    await request(app)
      .patch(`/users/${adminUser.id}`)
      .set("Authorization", `Bearer ${ownerLogin.body.token}`)
      .send({ is_adm: true });

    const adminLogin = await request(app).post("/login").send(userAdminLogin);
    const postResponse = await request(app)
      .post(`/posts/${marketingArea.id}`)
      .set("Authorization", `Bearer ${adminLogin.body.token}`)
      .send(postTest);
    postTest.id = postResponse.body.id;

    const areaUserNonAdmin = await request(app)
      .post(`/administration/area/${nonAdminUser.id}/${marketingArea.id}`)
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
      .post(`/comments/${postTest.id}`)
      .set("Authorization", `Bearer ${nonAdminLogin.body.token}`)
      .send(comment);
    comment.id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("content");
    expect(response.body).toHaveProperty("created_at");
  });

  test("POST /comments/:post_id - Must be able to create a new comment from same user", async () => {
    const nonAdminLogin = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .post(`/comments/${postTest.id}`)
      .set("Authorization", `Bearer ${nonAdminLogin.body.token}`)
      .send(comment2);
    comment2.id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("content");
    expect(response.body).toHaveProperty("created_at");
  });

  test("POST /comments/:post_id - Should not be able to create a comment from other area", async () => {
    const ownerLogin = await request(app).post("/login").send(userOwnerLogin);
    const response = await request(app)
      .post(`/comments/${postTest.id}`)
      .set("Authorization", `Bearer ${ownerLogin.body.token}`)
      .send(comment);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /comments/:user_id - Must be able to list comments from user", async () => {
    const nonAdminLogin = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .get(`/comments/${nonAdminUser.id}`)
      .set("Authorization", `Bearer ${nonAdminLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test("GET /comments/:user_id - Should not be able to list comments from user without authorization", async () => {
    const response = await request(app).get(`/comments/${nonAdminUser.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /comments/post/:post_id - Must be able to list comments from post", async () => {
    const nonAdminLogin = await request(app)
      .post("/login")
      .send(userNonAdminLogin);

    const response = await request(app)
      .get(`/comments/post/${postTest.id}`)
      .set("Authorization", `Bearer ${nonAdminLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test("GET /comments/:user_id - Should not be able to list comments from post without authorization", async () => {
    const response = await request(app).get(`/comments/${nonAdminUser.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /comments/:comment_id - Must be able to update a comment", async () => {
    const nonAdminLogin = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .patch(`/comments/${comment.id}`)
      .set("Authorization", `Bearer ${nonAdminLogin.body.token}`)
      .send(commentUpdate);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("content");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body.content).toBe(commentUpdate.content);
  });

  test("PATCH /comments/:comment_id - Should not be able to update a comment from other user", async () => {
    const ownerLogin = await request(app).post("/login").send(userOwnerLogin);
    const response = await request(app)
      .patch(`/comments/${comment.id}`)
      .set("Authorization", `Bearer ${ownerLogin.body.token}`)
      .send(commentUpdate);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /comments/:comment_id - Should not be able to update a comment without authorization", async () => {
    const response = await request(app)
      .patch(`/comments/${comment.id}`)
      .send(commentUpdate);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /comments/:comment_id - Should not be able to delete a comment from other user not being a admin", async () => {
    const ownerLogin = await request(app).post("/login").send(userOwnerLogin);
    await request(app)
      .patch(`/users/${adminUser.id}`)
      .set("Authorization", `Bearer ${ownerLogin.body.token}`)
      .send({ is_adm: false });
    const adminLogin = await request(app).post("/login").send(userAdminLogin);
    const response = await request(app)
      .delete(`/comments/${comment.id}`)
      .set("Authorization", `Bearer ${adminLogin.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /comments/:comment_id - Should not be able to delete a comment without authorization", async () => {
    const response = await request(app).delete(`/comments/${comment.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /comments/:comment_id - Must be able to delete a comment", async () => {
    const nonAdminLogin = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .delete(`/comments/${comment.id}`)
      .set("Authorization", `Bearer ${nonAdminLogin.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /comments/:comment_id - Must be able to delete a comment from other user being a admin", async () => {
    const ownerLogin = await request(app).post("/login").send(userOwnerLogin);
    const response = await request(app)
      .delete(`/comments/${comment2.id}`)
      .set("Authorization", `Bearer ${ownerLogin.body.token}`);

    expect(response.status).toBe(204);
  });
});
