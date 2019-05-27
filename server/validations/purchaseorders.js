import validator from 'validator';

class Ordersvalidations {
  static purchaseorder(req, res) {
    if (req.body.amount < 1) {
      throw Error('Invalid amount of money');
    }
    if (((req.body.status !== 'pending' && req.body.status !== 'accepted') && req.body.status !== 'rejected')) {
      throw Error('this status field must be pending,accepted,or rejected ');
    }
  }


  static statusupdate(req, res) {
  	if ((req.body.status !== 'sold' && req.body.status !== 'available')) {
      throw Error('this status field must be sold or available ');
    }
  }
}
export default Ordersvalidations;
