// const chai = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const db = require('../models');

const { User } = db;

const server = require('../server.js');

chai.use(chaiHttp);
describe('/GET users', () => {
  it('it should GET all the users', (done) => {
    chai
      .request('http://localhost:8088/api')
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});
