import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import model from '../database/models/User';

import { Response } from 'superagent';
import UserMock from './helpers/UserMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes Login', () => {
  beforeEach(async () => {
    sinon
      .stub(model, "findOne")
      .resolves(UserMock as model);
  });

  afterEach(()=>{
    (model.findOne as sinon.SinonStub).restore();
  })

  it('Testando Erro Sem nadaa', async () => {
   const result = await chai.request(app).post('/login').send({
      "email": "",
      "password": ""
   })

   expect(result.status).to.be.equal(400);
  });
});
