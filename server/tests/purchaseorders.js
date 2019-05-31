import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();
const tokenadmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNfYWRtaW4iOiJ0cnVlIiwiaWF0IjoxNTU5MzE0Nzg3fQ.wM5wguPZqOuTujyal5oYYBYy4ONDsuwIy6HH9ODvnEA';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaXNfYWRtaW4iOiJmYWxzZSIsImlhdCI6MTU1OTMzMTU1Mn0.STABbXFpNhlIp1wvi_IaUg1lqMtScV_UK3zkKP6IqTE';
describe('get all orders', () => {
  it('get all orders', (done) => {
    chai.request(server).get('/api/v1/orders').set('x-auth-token', tokenadmin).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('All orders retrieved successfully');
      res.body.data.should.be.an('array');
      done();
    });
  });
});
describe('create purchasing order', () => {
  it('should create purchasing order', (done) => {
    chai.request(server).post('/api/v1/orders').set('x-auth-token', tokenadmin).end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      done();
    });
  });
  it('should not create purchasing order', (done) => {
    chai.request(server).post('/api/v1/orders').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      done();
    });
  });
});
describe('update purchasing order', () => {
  it('should not update purchasing order', (done) => {
    chai.request(server).put('/api/v1/order/1/price').set('x-auth-token', tokenadmin).send({
      price: '40000'
    })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('The order with id 1 not found');
        done();
      });
  });
});
