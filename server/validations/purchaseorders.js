import validator from 'validator';

class Ordersvalidations {
  static purchaseorder(req, res) {
    if (!(req.body.car_id)) {
      throw Error('car id  is required');
    }
    if (req.body.amount < 1) {
      throw Error('Invalid amount of money');
    }
    if (!(req.body.amount)) {
      throw Error('amount field is required');
    }
    if (validator.isEmpty(req.body.amount)) {
      throw Error('amount field must not be empty');
    }
    if (!validator.isAlphanumeric(req.body.amount)) {
      throw Error('amount must not contain special characters');
    }
    if (!(req.body.status)) {
      throw Error('the field status is required');
    }
    if (((req.body.status !== 'pending' && req.body.status !== 'accepted') && req.body.status !== 'rejected')) {
      throw Error('this status field must be pending,accepted,or rejected ');
    }
    if (!validator.isAlphanumeric(req.body.status)) {
      throw Error('status must not contain special characters');
    }
  }


  static statusupdate(req, res) {
  	if ((req.body.status !== 'sold' && req.body.status !== 'available')) {
      throw Error('this status field must be sold or available ');
    }
  }
}
export default Ordersvalidations;
