import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests Login', () => {
    beforeEach(sinon.restore);

  it('Test login with the wrong values', async () => {
   const result = await chai.request(app).post('/login').send({
      "email": "",
      "password": ""
   })
   expect(result.status).to.be.equal(400);
  });

  it('Test login with wrong email or password', async () => {
    const result = await chai.request(app).post('/login').send({
       "email": "teste@teste.com",
       "password": "senhafalsa"
    })
    expect(result.status).to.be.equal(401);
   });

   it('Test login with wrong password', async () => {
    const result = await chai.request(app).post('/login').send({
       "email": "admin@admin.com",
       "password": "senhafalsa"
    })
    expect(result.status).to.be.equal(401);
   });

   it('Test login without passing password', async () => {
    const result = await chai.request(app).post('/login').send({
       "email": "teste@teste.com",
    })
    expect(result.status).to.be.equal(400);
   });

   it('Test login without passing email', async () => {
    const result = await chai.request(app).post('/login').send({
      "password": "senhafalsa"
    })
    expect(result.status).to.be.equal(400);
   });

   it('Test login with right values', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    })
    expect(result.status).to.be.equal(200);
   });

   it('Test login Token Validate', async () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0'
    const result = await chai.request(app).get('/login/validate').set('Authorization', token).send()
    expect(result.status).to.be.equal(200);
   });
});
