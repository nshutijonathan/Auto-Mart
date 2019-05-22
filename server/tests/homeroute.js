import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();

// home route test
describe('get welcome message', () => {
  it('should return welcome message', (done) => {
    chai.request(server).get('/').end((err, res) => {
      console.log(res.body);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('message').eql('Welcome to Auto mart');
      done();
    });
  });
});
