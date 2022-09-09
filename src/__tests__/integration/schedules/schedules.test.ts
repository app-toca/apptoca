/*

GET - /schedules/areas/:area_id => all schedules by area
acesso : admin

GET - /schedules/days/:day[0-6] => schedule by day
acesso : admin
return array of users

GET - /schedules/hours/days/:day[0-6]/:hour => schedule by day and hour
acesso : admin
return array of users

GET - /schedules/:area_id/report => report of hours by quantity of users
[ 
{day: 0, hour:'20:00', qttUsers: 3},
{day: 2, hour:'21:00', qttUsers: 2}
]

acesso : admin
!!retornar em ordem decrescente por qttUsers

PATCH - /schedules => update all schedules of user
acesso : todo usuario logado
!!busca pelo id do usuário

DELETE - /schedules/:schedule_id => delete an schedule
acesso : proprio usuario
!!busca pelo id do usuário

*/

import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { IUserResponse } from "../../../interfaces/users";
import { IOrganizationResponse } from "../../../interfaces/organizations";
import { nonAdminUser, organizationToca, userNonAdminLogin, userOwner, userOwnerLogin } from "../../mocks/users";
import { iAreaResponse } from "../../../interfaces/areas";
import { marketingArea } from "../../mocks/areas";


let userOwnerCreated: IUserResponse
let organization: IOrganizationResponse
let marketingAreaCreated: iAreaResponse
let userNonAdminCreated : IUserResponse

describe("/schedules", () => {
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

    beforeAll(async() => {
        const response = await request(app)
        .post("/organizations")
        .send(organizationToca);

        organization = response.body


        const responseUserOwner = await request(app)
          .post(`/users/${organization.id}/${organizationToca.password}`)
          .send(userOwner);

        userOwnerCreated = responseUserOwner.body

        const responseUserNonAdmin = await request(app)
          .post(`/users/${organization.id}/${organizationToca.password}`)
          .send(nonAdminUser);

        userNonAdminCreated = responseUserNonAdmin.body

        const responseArea  = await request(app)
        .post(`/areas`)
        .send(marketingArea);

        marketingAreaCreated = responseArea.body   

    })

    const scheduleNonAdminUser = [{name: 1, hour:'20:00'}, {name: 0, hour:'21:00'}]
    const scheduleAdminUser = [{name: 1, hour:'19:00'}, {name: 2, hour:'17:00'}]

    test("POST /schedules -  Must be able to add a schedule",async () => {
    
        const nonAdminLoginResponse = await request(app).post("/login").send(userNonAdminLogin);
        const adminLoginResponse = await request(app).post("/login").send(userOwnerLogin);
        const response = await request(app).post(`/schedules`).send(scheduleNonAdminUser).set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`)
        const response2 = await request(app).post(`/schedules`).send(scheduleAdminUser).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    
        expect(response.body).toHaveLength(2)
        expect(response.status).toBe(201)
        expect(response.body[0]).toHaveProperty("id")
        expect(response.body[0]).toHaveProperty("user_id") 
        expect(response.body[0].user_id).toBe(userNonAdminCreated.id)    
        expect(response.body[0]).toHaveProperty("day_id")    
        expect(response.body[0]).toHaveProperty("hour_id")  
        expect(response2.status).toBe(201)

    })

    test("POST /schedules -  should not be able to add a schedule without authentication",async () => {
    
        const response = await request(app).post(`/schedules`).send(scheduleNonAdminUser)
    
        expect(response.status).toBe(401)
        expect(response.body[0]).toHaveProperty("message")

    })

    test("GET /schedules/users/:user_id -  Must be able to list your own schedule",async () => {
    
        const nonAdminLoginResponse = await request(app).post("/login").send(userNonAdminLogin);
        const response = await request(app).get(`/schedules/users/${userNonAdminCreated.id}`).set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`)
    
        expect(response.body).toHaveLength(2)
        expect(response.status).toBe(200)
        expect(response.body[0]).toHaveProperty("id")
        expect(response.body[0]).toHaveProperty("user_id") 
        expect(response.body[0].user_id).toBe(userNonAdminCreated.id)    
        expect(response.body[0]).toHaveProperty("day_id")    
        expect(response.body[0]).toHaveProperty("hour_id")    
    
    })

    test("GET /schedules/users/:user_id -  should not be able to list a user's schedule without authentication",async () => {
    
        const response = await request(app).get(`/schedules/users/${userNonAdminCreated.id}`)
 
        expect(response.status).toBe(401)  
        expect(response.body).toHaveProperty("message")    
    
    })

    test("GET /schedules/users/:user_id -  should not be able to list another user's schedule if being non admin",async () => {
    
        const nonAdminLoginResponse = await request(app).post("/login").send(userNonAdminLogin);
        const response = await request(app).get(`/schedules/users/${userOwnerCreated.id}`).set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`)
 
        expect(response.status).toBe(401)  
        expect(response.body).toHaveProperty("message")    
    
    })

    test("GET /schedules/users/:user_id -  Must be able to list another user's schedule if being admin",async () => {
    
        const adminLoginResponse = await request(app).post("/login").send(userOwnerLogin);
        const response = await request(app).get(`/schedules/users/${userNonAdminCreated.id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    
        expect(response.body).toHaveLength(2)
        expect(response.status).toBe(200)
        expect(response.body[0]).toHaveProperty("id")
        expect(response.body[0]).toHaveProperty("user_id") 
        expect(response.body[0].user_id).toBe(userNonAdminCreated.id)    
        expect(response.body[0]).toHaveProperty("day_id")    
        expect(response.body[0]).toHaveProperty("hour_id")    
    
    })

    test("GET /schedules -  Must be able to list all schedules if being admin",async () => {
    
        const adminLoginResponse = await request(app).post("/login").send(userOwnerLogin);
        const response = await request(app).get(`/schedules`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    
        expect(response.body).toHaveLength(3)
        expect(response.status).toBe(200)
        expect(response.body[0]).toHaveProperty("id")
        expect(response.body[0]).toHaveProperty("user_id") 
        expect(response.body[0].user_id).toBe(userNonAdminCreated.id)    
        expect(response.body[0]).toHaveProperty("day_id")    
        expect(response.body[0]).toHaveProperty("hour_id")    
    
    })

    test("GET /schedules -  should not be able to list all schedules if being non admin",async () => {
    
        const nonAdminLoginResponse = await request(app).post("/login").send(userNonAdminLogin);
        const response = await request(app).get(`/schedules`).set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`)
 
        expect(response.status).toBe(401)  
        expect(response.body).toHaveProperty("message")    
    
    })
    





})