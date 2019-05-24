import express from 'express';
import Users from '../controllers/users';
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
export default router;
