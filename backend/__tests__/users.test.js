const pool = require('../db/pool');
const { describe, expect, test, afterAll, beforeAll } = require('@jest/globals');
const request = require('supertest');

const app = require('../app');

// The Singin and Login tests
describe('Sing in and log in', () => {

  const loggedInUser = {
    email: '',
    password: ''
  };

  beforeAll(async () => {
    pool.query('DELETE FROM users WHERE email=?', ['tester4@domain.com'])

    const data = {
      name: 'Test Er4',
      email: 'tester4@domain.com',
      password: 'password123',
      admin: true
    }

    const response = await request(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .send(data);

    loggedInUser.email = response.body.email;
    loggedInUser.password = data.password;
  });

  test('should create a new user', async () => {
    pool.query('DELETE FROM users WHERE email=?', ['tester5@domain.com'])

    const data = {
      name: 'Test Er5',
      email: 'tester5@domain.com',
      password: 'password123',
      admin: true
    }

    const response = await request(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .send(data);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.email).toEqual('tester5@domain.com');
    expect(response.body.token).toBeTruthy();
  });

  test('should login', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .set('Accept', 'application/json')
      .send(loggedInUser);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.email).toEqual('tester4@domain.com');
    expect(response.body.token).toBeTruthy();
  });

});

// End and close the pool 
afterAll(async () => {
  const result = await pool.end();
});