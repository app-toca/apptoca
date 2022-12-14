import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { organizationToca, organizationUnknow } from "../../mocks/organization";
import {
  adminUser,
  nonAdminUser,
  userAdminLogin,
  userDifferentEmail,
  userDifferentEmailLogin,
  userNonAdminLogin,
  userOfUnknowOrg,
  userOwner,
  userOwnerLogin,
  userToBeDeteleted,
} from "../../mocks/users";
import { IUserResponse } from "../../../interfaces/users";
import { IOrganizationResponse } from "../../../interfaces/organizations";

let userAdminCreated: IUserResponse;
let userNonAdminCreated: IUserResponse;
let organization: IOrganizationResponse;
let organization2: IOrganizationResponse;
let userOwnerCreated: IUserResponse;
let userOfUnknowOrgCreated: IUserResponse;

describe("/users", () => {
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

  /*----------------*/

  beforeAll(async () => {
    const response = await request(app)
      .post("/organizations")
      .send(organizationToca);

    organization = response.body;

    const response2 = await request(app)
      .post("/organizations")
      .send(organizationUnknow);

    organization2 = response2.body;
  });

  test("POST /users -  Must be able to create a owner user", async () => {
    const response = await request(app)
      .post(`/users/${organization.id}/${organizationToca.password}`)
      .send(userOwner);

    expect(response.body.is_adm).toEqual(true);
    expect(response.body.is_active).toEqual(true);
    expect(response.body.is_owner).toEqual(true);
    expect(response.body.organization.id).toEqual(organization.id);
    expect(response.body.email).toEqual("anavitoriacisn@gmail.com");
    expect(response.status).toBe(201);

    userOwnerCreated = response.body;
  });

  test("POST /users -  Must be able to create a admin user", async () => {
    const response = await request(app)
      .post(`/users/${organization.id}/${organizationToca.password}`)
      .send(adminUser);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("is_adm");
    expect(response.body).toHaveProperty("is_owner");
    expect(response.body).toHaveProperty("is_active");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Ana");
    expect(response.body.email).toEqual("anavitoriacisn314@gmail.com");
    expect(response.body.is_adm).toEqual(false);
    expect(response.body.organization.id).toEqual(organization.id);
    expect(response.body.is_owner).toEqual(false);
    expect(response.body.is_active).toEqual(true);
    expect(response.status).toBe(201);

    userAdminCreated = response.body;
  });

  test("POST /users -  Must be able to create a non admin user", async () => {
    const response = await request(app)
      .post(`/users/${organization.id}/${organizationToca.password}`)
      .send(nonAdminUser);

    expect(response.body.is_adm).toEqual(false);
    expect(response.body.is_active).toEqual(true);
    expect(response.body.is_owner).toEqual(false);
    expect(response.body.organization.id).toEqual(organization.id);
    expect(response.body.email).toEqual("joao.porto.ismart@gmail.com");
    expect(response.status).toBe(201);

    userNonAdminCreated = response.body;
  });

  test("POST /users -  should not be able to create a user that already exists", async () => {
    const response = await request(app)
      .post(`/users/${organization.id}/${organizationToca.password}`)
      .send(adminUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /users -  should be able to create a user with a different email", async () => {
    const response = await request(app)
      .post(`/users/${organization.id}/${organizationToca.password}`)
      .send(userDifferentEmail);

    expect(response.body).toHaveProperty("id");
    expect(response.body.organization.id).toEqual(organization.id);
    expect(response.status).toBe(201);
  });

  test("POST /users -  should be able to create an user on other organization", async () => {
    const response = await request(app)
      .post(`/users/${organization2.id}/${organizationUnknow.password}`)
      .send(userOfUnknowOrg);

    expect(response.body).toHaveProperty("id");
    expect(response.body.organization.id).toEqual(organization2.id);
    expect(response.status).toBe(201);

    userOfUnknowOrgCreated = response.body;
  });

  test("POST /users -  should not be able to create a user with wrong password's organization", async () => {
    const response = await request(app)
      .post(`/users/${organization.id}/1234556757`)
      .send(userToBeDeteleted);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /users -  should not be able to create a user with wrong id organization", async () => {
    const response = await request(app)
      .post(`/users/234354647/${organizationUnknow.password}`)
      .send(userToBeDeteleted);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  /*------------*/

  test("PATCH users/:user_id -  should be able to change the property is_adm if is an owner", async () => {
    const ownerLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const response = await request(app)
      .patch(`/users/${userAdminCreated.id}`)
      .send({ is_adm: true })
      .set("Authorization", `Bearer ${ownerLoginResponse.body.token}`);
    const findUser = await request(app)
      .get(`/users/${userAdminCreated.id}`)
      .set("Authorization", `Bearer ${ownerLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.is_adm).toBe(true);
    expect(findUser.body.is_adm).toBe(true);
  });

  test("PATCH users/:user_id -  should not be able to change the property is_active", async () => {
    const ownerLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const response = await request(app)
      .patch(`/users/${userAdminCreated.id}`)
      .send({ is_active: false, name: "Renata ingrata" })
      .set("Authorization", `Bearer ${ownerLoginResponse.body.token}`);
    const findUser = await request(app)
      .get(`/users/${userAdminCreated.id}`)
      .set("Authorization", `Bearer ${ownerLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
    expect(findUser.body.is_active).toBe(true);
    expect(findUser.body.name).toBe(userAdminCreated.name);
  });

  test("PATCH users/:user_id -  should not be able to change the property is_adm if is not an owner even if you're an admin ", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminLogin);
    const response = await request(app)
      .patch(`/users/${userNonAdminCreated.id}`)
      .send({ is_adm: true })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const findUser = await request(app)
      .get(`/users/${userNonAdminCreated.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
    expect(findUser.body.is_adm).toBe(false);
  });

  test("PATCH users/:user_id -  should not be able to change the property is_adm of yourself if you aren't an owner", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .patch(`/users/${userNonAdminCreated.id}`)
      .send({ is_adm: true })
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);
    const findUser = await request(app)
      .get(`/users/${userNonAdminCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
    expect(findUser.body.is_adm).toBe(false);
  });

  test("PATCH users/:user_id -  should not be able to update another user if not being owner", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .patch(`/users/${userAdminCreated.id}`)
      .send({ name: "Teste" })
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);
    const findUser = await request(app)
      .get(`/users/${userAdminCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
    expect(findUser.body.name).toBe(userAdminCreated.name);
  });

  test("PATCH users/:user_id -  Should no be able to update another property of an user even being owner, only the property is_adm", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userOwnerLogin);
    const response = await request(app)
      .patch(`/users/${userNonAdminCreated.id}`)
      .send({ age: 24 })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const findUser = await request(app)
      .get(`/users/${userNonAdminCreated.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
    expect(findUser.body.age).toBe(userNonAdminCreated.age);
    expect(findUser.body.is_adm).toBe(false);
  });

  test("PATCH users/:user_id -  Must be able to update your own user", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .patch(`/users/${userNonAdminCreated.id}`)
      .send({ course: "TST", nickname: "elitepj" })
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);
    const findUser = await request(app)
      .get(`/users/${userNonAdminCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.course).toBe("TST");
    expect(response.body.user.nickname).toBe("elitepj");
    expect(findUser.body.is_adm).toBe(false);

    expect(findUser.body.is_adm).toBe(false);
    expect(response.body.user.nickname).toBe("elitepj");
    expect(findUser.body.course).toBe("TST");
  });

  test("PATCH users/:user_id -  should not be able to update user with invalid id", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminLogin);
    const response = await request(app)
      .patch(`/users/1242435`)
      .send({ age: 22 })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH users/:user_id -  should not be able to update user of another organization", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminLogin);
    const response = await request(app)
      .patch(`/users/${userOfUnknowOrgCreated.id}`)
      .send({ age: 22 })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  /*------------*/

  test("GET /users -  Must be able to list users with a non admin user", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(4);
  });

  test("GET /users/:user_id -  Must be able to list one user", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminLogin);
    const response = await request(app)
      .get(`/users/${userNonAdminCreated.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toEqual(userNonAdminCreated.id);
    expect(response.body.email).toEqual(userNonAdminCreated.email);
  });

  test("GET /users/:user_id/areas -  Must be able to list areas of another user if is admin", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminLogin);
    const response = await request(app)
      .get(`/users/${userNonAdminCreated.id}/areas`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  test("GET /users/:user_id/areas -  should be able to list areas of your own user", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminLogin);
    const response = await request(app)
      .get(`/users/${userNonAdminCreated.id}/areas`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  test("GET /users/:user_id/areas -  should not be able to list areas of another user if isn't admin", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const response = await request(app)
      .get(`/users/${userAdminCreated.id}/areas`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /users -  should not be able to list users without authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /users/:user_id -  should not be able to delete another user if not being admin", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);
    const response = await request(app)
      .delete(`/users/${users.body[3].id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /users/:user_id -  Must be able to soft delete your own user", async () => {
    const nonAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNonAdminLogin);
    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);
    const response = await request(app)
      .delete(`/users/${userNonAdminCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    const findUser = await request(app)
      .get(`/users/${userNonAdminCreated.id}`)
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(findUser.body.is_active).toBe(false);
  });

  test("DELETE /users/:user_id -  should be able to soft delete another user if being admin", async () => {
    const userToDelete = await request(app)
      .post(`/users/${organization.id}/${organizationToca.password}`)
      .send(userToBeDeteleted);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminLogin);
    const response = await request(app)
      .delete(`/users/${userToDelete.body.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const findUser = await request(app)
      .get(`/users/${userToDelete.body.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(findUser.body.is_active).toBe(false);
  });

  /*test("DELETE /users/:id -  shouldn't be able to delete user with is_active = false",async () => {
    await request(app).post('/users').send(mockedAdmin)
    const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
    const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message")
 
})*/

  test("DELETE users/:user_id -  should not be able to delete user with invalid id", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminLogin);
    const response = await request(app)
      .delete(`/users/1242435`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE users/:user_id -  should not be able to delete user of another organization", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminLogin);
    const response = await request(app)
      .delete(`/users/${userOfUnknowOrgCreated.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
