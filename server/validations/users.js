import validator from 'validator';

class Usersvalidations {
  static validatesignup(req, res) {
    if (typeof req.body.email === 'number') {
      throw Error('your email must look like  this ex:andela@gmail.com');
    }
    if (validator.isEmpty(req.body.email)) {
      throw Error('email is required');
    }
    if (!validator.isEmail(req.body.email)) {
      throw Error('your email must look like  this ex:andela@gmail.com');
    }
    if (validator.isEmpty(req.body.first_name)) {
      throw Error('first_name is required');
    }
    if (!typeof req.body.first_name === 'string') {
      throw Error('first_name must be string');
    }
    if (validator.isNumeric(req.body.first_name)) {
      throw Error('first_name must be string');
    }
    if (validator.isEmpty(req.body.last_name)) {
      throw Error('last_name is required');
    }
    if (validator.isNumeric(req.body.last_name)) {
      throw Error('last_name must be string');
    }
    if (!validator.isAlphanumeric(req.body.first_name)) {
      throw Error('first_name must not contain special characters');
    }
    if (!validator.isAlphanumeric(req.body.last_name)) {
      throw Error('last_name must not contain special characters');
    }
    if (validator.isEmpty(req.body.password)) {
      throw Error('password is required');
    }
    if (!validator.isLength(req.body.password, { min: 6, max: 250 })) {
      throw Error('password is too short');
    }
    if (validator.isEmpty(req.body.address)) {
      throw Error('address is required');
    }
    if (!validator.isAlphanumeric(req.body.address)) {
      throw Error('address must not contail special characters');
    }
    if (validator.isEmpty(req.body.is_admin)) {
      throw Error('the field is required');
    }
    if (typeof req.body.is_admin !== 'true' && req.body.is_admin !== 'false') {
      throw Error('this field must be boolean');
    } else {


    }
    return true;
  }

  static validatesignin(req, res) {
    if (typeof req.body.email === 'number') {
      throw Error('your email must look like  this ex:andela@gmail.com');
    }
    if (validator.isEmpty(req.body.email)) {
      throw Error('email is required');
    }
    if (!validator.isEmail(req.body.email)) {
      throw Error('your email must look like  this ex:andela@gmail.com');
    }
    if (validator.isEmpty(req.body.password)) {
      throw Error('password is required');
    } else {

    }
    return true;
  }
}
export default Usersvalidations;