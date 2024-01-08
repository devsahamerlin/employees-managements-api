import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index.js';
import Employee from '../src/models/employee.js';
import Department from '../src/models/department.js';
import prepare from './it-helper.js'

chai.use(chaiHttp);

describe('/Test Assignments', () => {
    let employeeId = "";
    let departmentId = "";

    it('should verify that we have 0 employee in the DB', (done) => {
        chai.request(app)
            .get('/api/v1/employees')
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

    
    it('should POST a valid employee', (done) => {

        let employee = {
            "name": "Alfred Christensen",
            "surname": "a.christensen",
            "birthDate": "11/23/1988"
        }
        chai.request(app)
          .post('/api/v1/employees')
          .send(employee)
          .end((err, res) => {
            employeeId = res._body._id
            expect(res.statusCode).to.be.equal(201);
            done();
          });
    }).timeout(5000);


    it('should assign employee to department', (done) => {

        let data = {
            "employeeId": employeeId,
            "departmentId": departmentId
        }

        chai.request(app)
          .post('/api/v1/assignments')
          .send(data)
          .end((err, res) => {
            expect(res._body.message).to.be.equal("Empployee added successfully.");
            expect(res.statusCode).to.be.equal(201);
            done();
          });
    }).timeout(5000);

    it('should get employee by department', (done) => {

        chai.request(app)
          .get('/api/v1/assignments/'+departmentId+'/employees')
          .end((err, res) => {
            expect(res._body.data.employees[0].departments[0]).to.be.equal(departmentId);
            expect(res.statusCode).to.be.equal(200);
            done();
          });
    }).timeout(5000);

    it('should get employee departments', (done) => {

        chai.request(app)
          .get('/api/v1/assignments/'+employeeId+'/departments')
          .end((err, res) => {
            expect(res._body.data.departments[0].employees[0]).to.be.equal(employeeId);
            expect(res.statusCode).to.be.equal(200);
            done();
          });
    }).timeout(5000);

    it('should remove employee from department', (done) => {

        let data = {
            "employeeId": employeeId,
            "departmentId": departmentId
        }

        chai.request(app)
          .delete('/api/v1/assignments')
          .send(data)
          .end((err, res) => {
            expect(res._body.message).to.be.equal("Empployee removed successfully.");
            expect(res.statusCode).to.be.equal(200);
            done();
          });
    }).timeout(5000);

    it('should clear data in DB after test', (done) => {
        Employee.deleteMany({}, function (err) { });
        Department.deleteMany({}, function (err) { });
        done();
    }).timeout(5000);

})