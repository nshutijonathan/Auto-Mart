import express from 'express';
import Users from '../controllers/users';
import Cars from '../controllers/carsadvert';
import Orders from '../controllers/purchaseorders';
import { imageUploader } from '../middlewares/claudinary';
import Usershelpers from '../middlewares/users.js';
import auth from '../middlewares/auth';
// creating middleware
const router = express.Router();
// Users routes
router.post('/api/v1/auth/signup', Users.createuser);
router.post('/api/v1/auth/signin', Users.signinuser);
router.get('/api/v1/users/:id', Users.getoneuser);
router.get('/api/v1/users', Users.getallusers);
router.delete('/api/v1/users/:id', Users.deleteuser);
// cars advert routes
router.get('/api/v1/cars', Cars.getallcarsad);
router.post('/api/v1/car', imageUploader, Cars.createadvert);
router.put('/api/v1/car/:id/price', Cars.updatecarprice);
router.get('/api/v1/car/:id', Cars.getonecar);
router.get('/api/v1/cars/available', Cars.getallavailable);
router.get('/api/v1/cars/available&new', Cars.availablenew);
router.get('/api/v1/cars/available&used', Cars.availableused);
router.delete('/api/v1/cars/:id', auth, Cars.deletecar);
// Purchase orders routes
router.get('/api/v1/orders', Orders.getallorders);
router.post('/api/v1/order', Orders.createorder);
router.put('/api/v1/order/:id/price', Orders.updateorder);
router.put('/api/v1/car/:id/status', Orders.updatestatus);
export default router;
