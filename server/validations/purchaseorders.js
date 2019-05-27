import validator from 'validator';

class Ordersvalidations {
  static purchaseorder(req, res) {
    if (req.body.amount < 1) {
      throw Error('Invalid amount of money');
    }
    if (((req.body.status != 'pending' || req.body.status != 'accepted') || req.body.status != 'rejected')) {
      throw Error('Invalid status');
    }
  }
}
export default Ordersvalidations;
