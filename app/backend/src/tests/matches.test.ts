import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests Matches', () => {
    beforeEach(sinon.restore);

  it('Test Matches Find All', async () => {
   const result = await chai.request(app).get('/matches').send();
   expect(result.status).to.be.equal(200);
  });

  it('Test Matches FindAll With Query False', async () => {
    const result = await chai.request(app).get('/matches?inProgress=False').send();
    expect(result.status).to.be.equal(200);
   });
 

  it('Test Matches Create', async () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0'
    const result = await chai.request(app).post('/matches').set('Authorization', token).send({
      "homeTeamId": 11,
      "awayTeamId": 13,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    });
    expect(result.status).to.be.equal(201);
   });

   it('Test Matches you create with a nonexistent id', async () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0'
    const result = await chai.request(app).post('/matches').set('Authorization', token).send({
      "homeTeamId": 11,
      "awayTeamId": 121,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    });
    expect(result.status).to.be.equal(404);
   });

   it('Test matches you create with the same ids', async () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0'
    const result = await chai.request(app).post('/matches').set('Authorization', token).send({
      "homeTeamId": 11,
      "awayTeamId": 11,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    });
    expect(result.status).to.be.equal(422);
   });

   it('Test Progress Finish', async () => {
    const result = await chai.request(app).patch('/matches/1/finish').send();
    expect(result.status).to.be.equal(200);
   });

   it('Test Change ScoreBoard', async () => {
    const result = await chai.request(app).patch('/matches/1').send({
      "homeTeamGoals": 10,
      "awayTeamGoals": 1
    });
    expect(result.status).to.be.equal(200);
   });
});