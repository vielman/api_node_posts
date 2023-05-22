const request = require('supertest');
const app = require('../src/app/app');

test('Audits area returned as json', async () =>{
     await request(app).get('/api/v1/audits').send()
     .expect(200)
     .expect('Content-Type', /application\/json/)
})