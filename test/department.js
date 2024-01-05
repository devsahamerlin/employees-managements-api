import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index.js';
import Department from '../src/models/department.js';
import prepare from './it-helper.js'

chai.use(chaiHttp);

describe('/Test Department Collection', () => {
  let departmentId = "";

  it('should verify that we have 0 department in the DB', (done) => {
    chai.request(app)
      .get('/api/v1/departments')
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.data.length).to.be.equal(0);
        done();
      });
  }).timeout(5000);

  it('should POST a valid department', (done) => {

    let department = {
      name: "General Dentistry",
    }
    chai.request(app)
      .post('/api/v1/departments')
      .send(department)
      .end((err, res) => {
        departmentId = res._body._id
        expect(res.statusCode).to.be.equal(201);
        done();
      });
  }).timeout(5000);

  it('should verify that we have 1 department in the DB', (done) => {
    chai.request(app)
      .get('/api/v1/departments')
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.data).to.be.a('array');
        expect(res.body.data.length).to.be.equal(1);
        done();
      });
  }).timeout(5000);

  it('should verify that we have department with id ' + departmentId + ' in the DB', (done) => {
    chai.request(app)
      .get('/api/v1/departments/' + departmentId)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res._body.data._id).to.be.equal(departmentId);
        expect(res._body.data.name).to.be.equal("General Dentistry");
        done();
      });
  }).timeout(5000);

  it('should update and department with id ' + departmentId + ' in the DB', (done) => {
    let department = {
      name: "Test department update",
    }
    chai.request(app)
      .put('/api/v1/departments/' + departmentId)
      .send(department)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res._body._id).to.be.equal(departmentId);
        expect(res._body.name).to.be.equal(department.name);
        done();
      });
  }).timeout(5000);

  it('should clear data in DB after test', (done) => {
    Department.deleteMany({}, function (err) { });
    done();
  }).timeout(5000);

})