const request = require('supertest');
const app = require('../src/app/app');
const Users = require('../src/models/Users');
const user = {
    email:"admin@mail.com",
    password:"123456"
}

test('Should login user', async () =>{
    const response = await request(app).post('/api/v1/login').send({
        email: user.email,
        password: user.password
    }).expect(200);
    
    expect(response.body.body).toBe("Success welcome");
})

test('should not login user', async () =>{
    const response = await request(app).post('/api/v1/login').send({
        email: user.email,
        password: "sdhfsdhas"
    }).expect(400);
})


