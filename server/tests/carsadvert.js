import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();
const tokenadmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNfYWRtaW4iOiJ0cnVlIiwiaWF0IjoxNTU5MzE0Nzg3fQ.wM5wguPZqOuTujyal5oYYBYy4ONDsuwIy6HH9ODvnEA';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaXNfYWRtaW4iOiJmYWxzZSIsImlhdCI6MTU1OTMzMTU1Mn0.STABbXFpNhlIp1wvi_IaUg1lqMtScV_UK3zkKP6IqTE';
describe('get all cars advert', () => {
  it('get all cars advert', (done) => {
    chai.request(server).get('/api/v1/cars').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('all adverts retreived successfully');
      res.body.data.should.be.an('array');
      done();
    });
  });
});
describe('create car advert ', () => {
  it('should create car advert', (done) => {
    chai.request(server).post('/api/v1/car').set('x-auth-token', token).send({
      state: 'used',
      status: 'available',
      price: '9',
      manufacturer: 'mitsubish',
      model: 'vodka',
      body_type: 'truck',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/nshuti.jpg'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('Car advert is successfully created');
        res.body.data.should.be.an('object');
        done();
      });
  });
  it('should not create car advert', (done) => {
    chai.request(server).post('/api/v1/car').send({
      owner: '1',
      state: 'used',
      status: 'available',
      price: '9',
      manufacturer: 'mitsubish',
      model: 'vodka',
      body_type: 'truck',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/nshuti.jpg'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(402);
        res.body.should.have.property('message').eql('Access denied. no token provided');
        done();
      });
  });
  it('should not create car advert', (done) => {
    chai.request(server).post('/api/v1/car').set('x-auth-token', token).send({
      owner: '',
      state: 'used',
      status: 'available',
      price: '9',
      manufacturer: 'mitsubish',
      model: 'vodka',
      body_type: 'truck',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/nshuti.jpg'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Car advert is successfully created');
        done();
      });
  });
  it('should not create car advert', (done) => {
    chai.request(server).post('/api/v1/car').set('x-auth-token', token).send({
      owner: '1',
      state: '',
      status: 'available',
      price: '9',
      manufacturer: 'mitsubish',
      model: 'vodka',
      body_type: 'truck',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/nshuti.jpg'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('This Field state must not be empty');
        done();
      });
  });
  it('should not create car advert', (done) => {
    chai.request(server).post('/api/v1/car').set('x-auth-token', token).send({
      owner: '1',
      state: 'beauty',
      status: 'available',
      price: '9',
      manufacturer: 'mitsubish',
      model: 'vodka',
      body_type: 'truck',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/nshuti.jpg'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Field state must be new or used');
        done();
      });
  });
  it('should not create car advert', (done) => {
    chai.request(server).post('/api/v1/car').set('x-auth-token', token).send({
      owner: '1',
      state: 'new',
      status: '',
      price: '9',
      manufacturer: 'mitsubish',
      model: 'vodka',
      body_type: 'truck',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/nshuti.jpg'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('This Field status must not be empty');
        done();
      });
  });
  it('should not create car advert', (done) => {
    chai.request(server).post('/api/v1/car').set('x-auth-token', token).send({
      owner: '1',
      state: 'new',
      status: 'av',
      price: '9',
      manufacturer: 'mitsubish',
      model: 'vodka',
      body_type: 'truck',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/nshuti.jpg'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('this status field must be sold or available');
        done();
      });
  });
  it('should not create car advert', (done) => {
    chai.request(server).post('/api/v1/car').set('x-auth-token', token).send({
      owner: '1',
      state: 'new',
      status: 'available',
      price: '',
      manufacturer: 'mitsubish',
      model: 'vodka',
      body_type: 'truck',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/nshuti.jpg'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Price field must not be empty');
        done();
      });
  });
  it('should not create car advert', (done) => {
    chai.request(server).post('/api/v1/car').set('x-auth-token', token).send({
      owner: '1',
      state: 'new',
      status: 'available',
      price: '-30',
      manufacturer: 'mitsubish',
      model: 'vodka',
      body_type: 'truck',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/nshuti.jpg'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Price must be valid');
        done();
      });
  });
  it('should not create car advert', (done) => {
    chai.request(server).post('/api/v1/car').set('x-auth-token', token).send({
      owner: '1',
      state: 'new',
      status: 'available',
      price: '30',
      manufacturer: '',
      model: 'vodka',
      body_type: 'truck',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/nshuti.jpg'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('This field manufacturer must not be empty');
        done();
      });
  });
  it('should not create car advert', (done) => {
    chai.request(server).post('/api/v1/car').set('x-auth-token', token).send({
      owner: '1',
      state: 'new',
      status: 'available',
      price: '30',
      manufacturer: '900',
      model: 'vodka',
      body_type: 'truck',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/nshuti.jpg'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('This field manufacturer must be string');
        done();
      });
  });
  it('should not create car advert', (done) => {
    chai.request(server).post('/api/v1/car').set('x-auth-token', token).send({
      owner: '1',
      state: 'new',
      status: 'available',
      price: '30',
      manufacturer: 'toyota',
      model: '',
      body_type: 'truck',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/nshuti.jpg'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('This field model must not be empty');
        done();
      });
  });
  it('should not create car advert', (done) => {
    chai.request(server).post('/api/v1/car').set('x-auth-token', token).send({
      owner: '1',
      state: 'new',
      status: 'available',
      price: '30',
      manufacturer: 'toyota',
      model: '##$$$$n',
      body_type: 'truck',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/nshuti.jpg'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('This field model must be string');
        done();
      });
  });
  it('should not create car advert', (done) => {
    chai.request(server).post('/api/v1/car').set('x-auth-token', token).send({
      owner: '1',
      state: 'new',
      status: 'available',
      price: '30',
      manufacturer: 'toyota',
      model: 'v9toyotaa',
      body_type: '',
      photo: 'https://nshutijonathan.github.io/Auto-Mart/UI/assets/nshuti.jpg'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('This field body_type is required');
        done();
      });
  });
  it('should not create car advert', (done) => {
    chai.request(server).post('/api/v1/car').set('x-auth-token', token).send({
      owner: '1',
      state: 'new',
      status: 'available',
      price: '30',
      manufacturer: 'toyota',
      model: 'v9toyotaa',
      body_type: 'car',
      photo: ''
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Invalid URl');
        done();
      });
  });
});
describe('update car advert ', () => {
  it('should not update car advert', (done) => {
    chai.request(server).put('/api/v1/car/1').set('x-auth-token', token).send({
      price: '900',
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        done();
      });
  });
});
describe('get one car ', () => {
  it('should  get one car', (done) => {
    chai.request(server).get('/api/v1/car/1')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('car with id 1 retreived successfully');
        res.body.data.should.be.an('object');
        done();
      });
  });
  it('should not  get one car', (done) => {
    chai.request(server).get('/api/v1/car/10000')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('message').eql('car with id 10000 not found');
        done();
      });
  });
});
describe('get all available ', () => {
  it('should  get all available cars', (done) => {
    chai.request(server).get('/api/v1/cars/available')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('all available cars successfully retreived');
        res.body.data.should.be.an('object');
        done();
      });
  });
  it('should  not get all available cars', (done) => {
    chai.request(server).get('/api/v1/cars/available//')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        done();
      });
  });
});
describe('get all available and new  ', () => {
  it('should  get all available and new', (done) => {
    chai.request(server).get('/api/v1/cars/available&new')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('all available and new cars successfully retreived');
        done();
      });
  });
  it('should  not get all available and new ', (done) => {
    chai.request(server).get('/api/v1/cars/available&new//')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        done();
      });
  });
});
describe('get all available and used ', () => {
  it('should  get all available and used', (done) => {
    chai.request(server).get('/api/v1/cars/available&used')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('all available and used cars successfully retreived');
        res.body.data.should.be.an('array');
        done();
      });
  });
  it('should  not get all available and used', (done) => {
    chai.request(server).get('/api/v1/cars/available&used//')
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        done();
      });
  });
});
describe('delete a car ', () => {
  it('should delete a car ', (done) => {
    chai.request(server).delete('/api/v1/cars/1').set('x-auth-token', tokenadmin).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('car with id 1 is successfully deleted ');
      done();
    });
  });
  it('should not delete a car', (done) => {
    chai.request(server).delete('/api/v1/cars/1').set('x-auth-token', tokenadmin).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('message').eql('Car with id 1 not found');
      done();
    });
  });
  it('should not delete a car', (done) => {
    chai.request(server).delete('/api/v1/cars/1').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(402);
      res.body.should.have.property('message').eql('Access denied. no token provided');
      done();
    });
  });
});
