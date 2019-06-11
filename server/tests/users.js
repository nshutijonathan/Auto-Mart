import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';


const tokenadmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNfYWRtaW4iOiJ0cnVlIiwiaWF0IjoxNTU5MzE0Nzg3fQ.wM5wguPZqOuTujyal5oYYBYy4ONDsuwIy6HH9ODvnEA';
chai.use(chaiHttp);
chai.should();
// test users routes

describe('get all users', () => {
  it('should return all users', (done) => {
    chai.request(server).get('/api/v1/users').set('x-auth-token', tokenadmin).end((err, res) => {
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
    chai.request(server).get('/api/v1/users/1').set('x-auth-token', tokenadmin).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('User with id 1 retrieved successfully');
      res.body.data.should.be.an('object');
      done();
    });
  });
  it('should not return single user', (done) => {
    chai.request(server).get('/api/v1/users/7').set('x-auth-token', tokenadmin)
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
describe('create a user account', () => {
  it('should register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'chris@gmail.com',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'chris@gmail.com',
      address: 'kigali',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(201);
      res.body.should.have.property('message').eql('User created successfully');
      res.body.data.should.be.an('object');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'nshuti@gmail.com',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(409);
      res.body.should.have.property('message').eql('this email already exist');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: '',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('email is required');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'alice.com',
      first_name: 'nshuti',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('your email must look like  this ex:andela@gmail.com');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: '',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('first_name is required');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: '12345',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('first_name must be string');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: '12345',
      last_name: 'jonathan',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('first_name must be string');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: '',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('last_name is required');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: '12345',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('last_name must be string');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: '##**nn',
      last_name: 'bebe',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('first_name must not contain special characters');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: '#$%*nnn',
      password: 'nshuti@gmail.com',
      address: 'kigali',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('last_name must not contain special characters');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: '',
      address: 'kigali',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('password is required');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'aa',
      address: 'kigali',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('password is too short');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: '',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('address is required');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: '##$@#$nn',
      is_admin: 'false'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('address must not contail special characters');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: 'kigali',
      is_admin: ''
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('the is_admin field is required');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: 'kigali',
      is_admin: 'no'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('this is_admin field must be true of false');
      done();
    });
  });
  it('should not register new user ', (done) => {
    chai.request(server).post('/api/v1/auth/signup').send({
      email: 'alice@gmail.com',
      first_name: 'alice',
      last_name: 'alice',
      password: 'alice@gmail.com',
      address: 'kigali',
      is_admin: 'true'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('is_admin field must be set to false');
      done();
    });
  });
});
describe('user sign in ', () => {
  it('shouldsign in  user ', (done) => {
    chai.request(server).post('/api/v1/auth/signin').send({
      email: 'nshuti@gmail.com',
      password: 'jonathan'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('successfully logged in');
      res.body.data.should.be.an('object');
      done();
    });
  });

  it('should not sign in  user ', (done) => {
    chai.request(server).post('/api/v1/auth/signin').send({
      email: 'nnshuti@gmail.com',
      password: 'jonathan'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(401);
      res.body.should.have.property('message').eql('Incorect email or password');
      done();
    });
  });
  it('should not sign in  user ', (done) => {
    chai.request(server).post('/api/v1/auth/signin').send({
      email: 'nshuti@gmail.com',
      password: 'jonathann'
    }).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(401);
      res.body.should.have.property('message').eql('Incorect email or password');
      done();
    });
  });
});
describe('delete a user', () => {
  it('should delete a user ', (done) => {
    chai.request(server).delete('/api/v1/users/2').set('x-auth-token', tokenadmin).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('User with id 2 is successfully deleted ');
      done();
    });
  });
  it('should not delete a user ', (done) => {
    chai.request(server).delete('/api/v1/users/200').set('x-auth-token', tokenadmin).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('User with id 200 not found');
      done();
    });
  });
  it('should not delete a user ', (done) => {
    chai.request(server).delete('/api/v1/users/200').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(402);
      res.body.should.have.property('message').eql('Access denied. no token provided');
      done();
    });
  });
});
