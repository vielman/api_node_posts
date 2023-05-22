const request = require('supertest');
const app = require('../src/app/app');

test('Roles area returned as json', async () =>{
     await request(app).get('/api/v1/roles').send()
     .expect(200)
     .expect('Content-Type', /application\/json/)
})