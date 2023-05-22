const request = require('supertest');
const app = require('../src/app/app');

test('Scores area returned as json', async () =>{
     await request(app).get('/api/v1/scores').send()
     .expect(200)
     .expect('Content-Type', /application\/json/)
})