import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { adminUser, nonAdminUser, userAdmin2, userAdmin2Login, userDifferentEmail, userNonAdmin2, userNonAdmin2Login } from "../../mocks";

let userAdminCreated 
let userNonAdminCreated


describe("/users", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test('sum', () => {
        expect(1+1).toBe(2)
    })

    test("POST /users -  Must be able to create a admin user",async () => {
        const response = await request(app).post('/users').send(adminUser)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("is_adm")
        expect(response.body).toHaveProperty("is_active")
        expect(response.body).toHaveProperty("created_at")
        expect(response.body).toHaveProperty("updated_at")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual("Ana")
        expect(response.body.email).toEqual("anavitoriacisn314@gmail.com")
        expect(response.body.is_adm).toEqual(true)
        expect(response.body.is_active).toEqual(true)
        expect(response.status).toBe(201)   
        
        userAdminCreated = response.body
    })

    test("POST /users -  Must be able to create a non admin user",async () => {
        const response = await request(app).post('/users').send(nonAdminUser)

        expect(response.body.is_adm).toEqual(false)
        expect(response.body.is_active).toEqual(true)
        expect(response.status).toBe(201) 
        
        userNonAdminCreated = response.body

    })

    test("POST /users -  should not be able to create a user that already exists",async () => {
        const response = await request(app).post('/users').send(adminUser)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
             
    })

    test("POST /users -  should be able to create a user with a different email",async () => {
        const response = await request(app).post('/users').send(userDifferentEmail)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
             
    })

    test("GET /users -  Must be able to list users with a non admin user",async () => {
        await request(app).post('/users').send(userNonAdmin2)
        const nonAdminLoginResponse = await request(app).post("/login").send(userNonAdmin2Login);
        const response = await request(app).get('/users').set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`)

        expect(response.body).toHaveLength(4)
     
    })

    test("GET /users -  Must be able to list users with an admin user",async () => {
        await request(app).post('/users').send(userAdmin2)
        const adminLoginResponse = await request(app).post("/login").send(userAdmin2Login);
        const response = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveLength(5)
     
    })

    test("GET /users -  should not be able to list users without authentication",async () => {
        const response = await request(app).get('/users')

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    /*test("POST /users -  should be able to create a user without img",async () => {
        const response = await request(app).post('/users').send(userSameEmail)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
             
    })*/





    /*

    

    

    test("GET /users -  should not be able to list users not being admin",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).get('/users').set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("DELETE /users/:id -  should not be able to delete user without authentication",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("DELETE /users/:id -  should not be able to delete user not being admin",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("DELETE /users/:id -  Must be able to soft delete user",async () => {
        await request(app).post('/users').send(mockedAdmin)

        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const findUser = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(204)
        expect(findUser.body[0].isActive).toBe(false)
     
    })

    test("DELETE /users/:id -  shouldn't be able to delete user with isActive = false",async () => {
        await request(app).post('/users').send(mockedAdmin)

        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
     
    })

    test("DELETE -  should not be able to delete user with invalid id",async () => {
        await request(app).post('/users').send(mockedAdmin)

        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        
        const response = await request(app).delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    })*/
})
