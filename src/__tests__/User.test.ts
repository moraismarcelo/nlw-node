import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
        
    });
    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            email : "teste@teste.com",
            name: "Teste User"
        });
        expect(response.status).toBe(201);
    });

    it("Should not be able to create user when emails already exists", async () =>{

        const response = await request(app).post("/users").send({
            email : "teste@teste.com",
            name: "Teste User"
        });
        expect(response.status).toBe(400);
    });
});