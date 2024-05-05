const pool = require('../db/pool');
const { describe, expect, test, afterAll, beforeAll } = require('@jest/globals');
const request = require('supertest');

const app = require('../app');

// Describe the test set
describe('GET items endpoint', () => {

  // The test that is being done
  test('should return 200', (done) => {
    request(app)
      .get('/api/items')   // Endpoint that is being tested
      .expect(200)          // Verify the expected result
      .end(done);           // Informing that the test is done
  },);
});




describe('GET item by id endpoint', () => {
  test('should return 200 if found', (done) => {
    request(app)
      .get('/api/items/1')
      .expect(200)
      .end(done)
  });


  test('should return 200 and json if found', async () => {
    const response = await request(app)
      .get('/api/items/1')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        name: 'Mac & Cheese',
        price: "8.99",
      }),
    );
  });


  test('should return 404 and Not Found', async () => {
    const response = await request(app)
      .get('/api/items/101')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(404);
    expect(response.text).toContain('Not Found');
  });
});



describe('POST item endpoint', () => {

  const loggedInUser = {
    userId: '',
    email: '',
    token: ''
  };

  beforeAll(async () => {
    pool.query('DELETE FROM users WHERE email=?', ['tester1@domain.com'])

    const data = {
      name: 'Test Er1',
      email: 'tester1@domain.com',
      password: 'password123',
      admin: true
    }

    const response = await request(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .send(data)
    loggedInUser.userId = response.body.userId
    loggedInUser.email = response.body.email
    loggedInUser.token = response.body.token
  });

  test('should create a new item', async () => {
    const item = {
      name: 'Test food',
      price: '9000.00',
      description: 'Testscription haha',
      image: 'Testimage',
    };

    const response = await request(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .set('Content', 'application/json')
      .send(item);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toEqual('Test food');
    expect(response.body.price).toEqual('9000.00');
  });


  test('should not allow only price', async () => {
    const item = {
      price: '9000.00',
    };
    const response = await request(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .send(item);
    expect(response.status).toEqual(400);
  });

  test('should not allow only name', async () => {
    const item = {
      name: 'Test food',
    };
    const response = await request(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .send(item);
    expect(response.status).toEqual(400);
  });





  test('should not allow empty name', async () => {
    const item = {
      name: '',
      price: '9000.00',
      description: 'Testscription haha',
      image: 'Testimage',
    };
    const response = await request(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .send(item);
    expect(response.status).toEqual(400);
    expect(response.text).toContain('{\"message\":\"\\\"name\\\" is not allowed to be empty\"}');
  });

  test('should not allow empty price', async () => {
    const item = {
      name: 'Test food',
      price: '',
      description: 'Testscription haha',
      image: 'Testimage',
    };
    const response = await request(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .send(item);
    expect(response.status).toEqual(400);
    expect(response.text).toContain('{\"message\":\"\\\"price\\\" is not allowed to be empty\"}');
  });


  test('should not allow too short name', async () => {
    const item = {
      name: 'T',
      price: '9000.00',
      description: 'Testscription haha',
      image: 'Testimage',
    };
    const response = await request(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .send(item);
    expect(response.status).toEqual(400);
    expect(response.text).toContain('{\"message\":\"\\\"name\\\" length must be at least 2 characters long\"}');
  });

  test('should not allow too short price', async () => {
    const item = {
      name: 'Test food',
      price: '9.0',
      description: 'Testscription haha',
      image: 'Testimage',
    };
    const response = await request(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .send(item);
    expect(response.status).toEqual(400);
    console.log(response.body);
    expect(response.text).toContain('{\"message\":\"\\\"price\\\" length must be at least 4 characters long\"}');
  });


  test('should not allow a duplicate item', async () => {
    const item = {
      name: 'Test food',
      price: '9000.00',
      description: 'Testscription haha',
      image: 'Testimage',
    };
    const response = await request(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .send(item);
    expect(response.status).toEqual(400);
    expect(response.text).toContain('Item exist');
  });


  const connection = require('../db/pool');
  afterAll(async () => {
    const deleteQuery = `DELETE FROM items WHERE name LIKE '%Test%';`;
    await connection.query(deleteQuery)
      .then(([rows]) => {
        console.log("Response: ", rows);
      })
      .catch(error => {
        throw error;
      });
  });
},);

// The PUT /api/items endpoint tests
describe('PUT items endpoint', () => {

  const loggedInUser = {
    userId: '',
    email: '',
    token: ''
  };

  beforeAll(async () => {
    pool.query('DELETE FROM users WHERE email=?', ['tester2@domain.com'])

    const data = {
      name: 'Test Er2',
      email: 'tester2@domain.com',
      password: 'password123',
      admin: true
    }

    const response = await request(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .send(data)
    loggedInUser.userId = response.body.userId
    loggedInUser.email = response.body.email
    loggedInUser.token = response.body.token
  });


  test('should update an existing item', async () => {
    const item = {
      id: 3,
      name: "souuup",
      price: "3.99",
      description: "Testscription haha",
      image: "Testimage"
    };

    const response = await request(app)
      .put('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .set('Content', 'appliction/json')
      .send(item);

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toEqual(3);
    expect(response.body.name).toEqual('souuup');
    expect(response.body.description).toEqual('Testscription haha');
  });

  test('should not update a item that doesnt exist', async () => {
    const item = {
      id: 1003,
      name: "souuup",
      price: "3.99",
      description: "Testscription haha",
      image: "Testimage"
    };

    const response = await request(app)
      .put('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .set('Content', 'appliction/json')
      .send(item);

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('Not Found');
  });

  test('should fail with string id', async () => {
    const item = {
      id: "One",
      name: "souuup",
      price: "3.99",
      description: "Testscription haha",
      image: "Testimage"
    };

    const response = await request(app)
      .put('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .set('Content', 'appliction/json')
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ "message": "\"id\" must be a number" });
  });

  test('should fail if id not an integer', async () => {
    const item = {
      id: 101.2,
      name: "souuup",
      price: "3.99",
      description: "Testscription haha",
      image: "Testimage"
    };

    const response = await request(app)
      .put('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .set('Content', 'appliction/json')
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ "message": "\"id\" must be an integer" });
  });

  test('should fail if id not an integer', async () => {
    const item = {
      name: "souuup",
      price: "3.99",
      description: "Testscription haha",
      image: "Testimage"
    };

    const response = await request(app)
      .put('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .set('Content', 'appliction/json')
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ "message": "\"id\" is required" });
  });

  test('should fail if with empty name', async () => {
    const item = {
      id: 3,
      name: "",
      price: "3.99",
      description: "Testscription haha",
      image: "Testimage"
    };

    const response = await request(app)
      .put('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .set('Content', 'appliction/json')
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ "message": "\"name\" is not allowed to be empty" });
  });

  test('should fail if no name', async () => {
    const item = {
      id: 3,
      price: "3.99",
      description: "Testscription haha",
      image: "Testimage"
    };

    const response = await request(app)
      .put('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .set('Content', 'appliction/json')
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ "message": "\"name\" is required" });
  });

  test('should fail if with empty price', async () => {
    const item = {
      id: 3,
      name: "souuup",
      price: "",
      description: "Testscription haha",
      image: "Testimage"
    };

    const response = await request(app)
      .put('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .set('Content', 'appliction/json')
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ "message": "\"price\" is not allowed to be empty" });
  });

  test('should fail if no price', async () => {
    const item = {
      id: 3,
      name: "souuup",
      description: "Testscription haha",
      image: "Testimage"
    };

    const response = await request(app)
      .put('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .set('Content', 'appliction/json')
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ "message": "\"price\" is required" });
  });

});

describe('DELETE items endpoint', () => {

  const loggedInUser = {
    userId: '',
    email: '',
    token: ''
  };

  beforeAll(async () => {
    pool.query('DELETE FROM users WHERE email=?', ['tester3@domain.com'])

    const data = {
      name: 'Test Er3',
      email: 'tester3@domain.com',
      password: 'password123',
      admin: true
    }

    const response = await request(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .send(data)
    loggedInUser.userId = response.body.userId
    loggedInUser.email = response.body.email
    loggedInUser.token = response.body.token
  });


  test('should delete the item by id', async () => {
    const item = {
      name: 'Test foods',
      price: '999.00',
      description: 'Testscription hahas',
      image: 'Testimages',
    };
    const postResponse = await request(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token)
      .send(item);
    const postId = postResponse.body.id;
    const response = await request(app)
      .delete(`/api/items/${postId}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token);
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Item deleted');
  });


  test('should check that item with id exists', async () => {
    const response = await request(app)
      .delete('/api/items/100001')
      .set('Accept', 'application/json')
      .set('Authorization', 'BEARER ' + loggedInUser.token);

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('Not Found');
  });
});

// End and close the pool 
afterAll(async () => {
  const result = await pool.end();
});