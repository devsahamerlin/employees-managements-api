import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index.js';
import Employee from '../src/models/employee.js';
import Department from '../src/models/department.js';
import prepare from './it-helper.js'

chai.use(chaiHttp);

describe('/Test Employees Collection', () => {
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

    it('test default API welcome route...', (done) => {

        chai.request(app)
        .get('/api/v1')
        .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            const actualVal = res.body.message;
            expect(actualVal).to.be.equal('Server is up!');        
            done();
        });
    });


    it('should POST a valid department and employee', (done) => {
        
        let department = {
            name: "Test department",
        }
        chai.request(app)
        .post('/api/v1/departments')
        .send(department)
        .end((err, depres) => {
            departmentId = depres._body._id
            let employee = {
                name: "Test employee",
                surname: "Test employee surname",
                departmentId: depres._body._id
            }
            chai.request(app)
            .post('/api/v1/employees')
            .send(employee)
            .end((err, empres) => {
              employeeId = empres._body._id;
              expect(empres.statusCode).to.be.equal(201);
              expect(empres._body.name).to.be.equal(employee.name);
              expect(empres._body.departmentId).to.be.equal(employee.departmentId);
              done();
            });

        });
        
    }).timeout(5000);

    it('should verify that we have 1 employee in the DB', (done) => {
        chai.request(app)
        .get('/api/v1/employees')
        .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            expect( res.body.data).to.be.a('array');
            expect(res.body.data.length).to.be.equal(1);
            done();
        });
    }).timeout(5000);

    it('should verify that we have employee with id '+employeeId+' in the DB', (done) => {
      chai.request(app)
      .get('/api/v1/employees/'+employeeId)
      .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res._body.data._id).to.be.equal(employeeId);
          expect(res._body.data.name).to.be.equal("Test employee");
          expect(res._body.data.surname).to.be.equal("Test employee surname");
          done();
      });
  }).timeout(5000);

  it('should update and employee with id '+employeeId+' in the DB', (done) => {
    let employee = {
      name: "Test employee update",
      surname: "Test employee surname update",
      departmentId: departmentId
  }
    chai.request(app)
    .put('/api/v1/employees/'+employeeId)
    .send(employee)
    .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res._body._id).to.be.equal(employeeId);
        expect(res._body.name).to.be.equal(employee.name);
        expect(res._body.surname).to.be.equal(employee.surname);
        done();
    });
}).timeout(5000);

it('should clear data in DB after test', (done) => {
  Employee.deleteMany({}, function(err) {});
  Department.deleteMany({}, function(err) {});
  done();
}).timeout(5000);
    
})