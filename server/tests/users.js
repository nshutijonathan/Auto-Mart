import chai from 'chai';
import chaiHttp from 'chai-Http';
import server from '../server';
import UserData from '../models/users';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNfYWRtaW4iOiJ0cnVlIiwiaWF0IjoxNTU5MzE0Nzg3fQ.wM5wguPZqOuTujyal5oYYBYy4ONDsuwIy6HH9ODvnEA';
chai.use(chaiHttp);
chai.should();
// test users routes

describe('get all users', () => {
  it('should return all users', (done) => {
    chai.request(server).get('/api/v1/users').set('x-auth-token', token).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('All users retrieved successfully');
      res.body.data.should.be.an('array');
      done();
    });
  });

  it('should not return all users', (done) => {
    chai.request(server).get('/api/v1/users').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(402);
      res.body.should.have.property('message').eql('Access denied. no token provided');
      done();
    });
  });
});
describe('get one single user', () => {
  it('should return single user', (done) => {
    chai.request(server).get('/api/v1/users/1').set('x-auth-token', token).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('User with id 1 retrieved successfully');
      res.body.data.should.be.an('object');
      done();
    });
  });
  it('should not return single user', (done) => {
    chai.request(server).get('/api/v1/users/7').set('x-auth-token', token)
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('message').eql('User with id 7 not found');
        done();
      });
  });
  it('should not return single user', (done) => {
    chai.request(server).get('/api/v1/users/7')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(402);
        res.body.should.have.property('message').eql('Access denied. no token provided');
        done();
      });
  });
});
