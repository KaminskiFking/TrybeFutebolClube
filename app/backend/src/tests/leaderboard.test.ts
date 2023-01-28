import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests Leaderboard', () => {
    beforeEach(sinon.restore);

  it('Test leaderboard findAll', async () => {
   const result = await chai.request(app).get('/leaderboard').send();
   expect(result.status).to.be.equal(200);
  });
});