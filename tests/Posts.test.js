const request = require('supertest');
const app = require('../src/app/app');

test('Posts area returned as json', async () =>{
     await request(app).get('/api/v1/posts').send()
     .expect(200)
     .expect('Content-Type', /application\/json/)
})