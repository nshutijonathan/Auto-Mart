import express from 'express';
import UsersData from '../models/users';

class Users {
  static getallusers(req, res) {
    return res.status(200).send({
      status: 200,
      message: 'All users retrieved successfully',
      data: UsersData
    });
  }

  static getoneuser(req, res) {
    const selecteduser = UsersData.find(checkId => checkId.id === parseInt(req.params.id, 10));
    if (selecteduser) {
      return res.status(200).send({
        status: 200,
        message: `User with id ${req.params.id} retrieved successfully`,
        data: selecteduser
      });
    }
    return res.status(404).send({
	  status: 404,
      message: `User with id ${req.params.id} not found`

    });
  }

  static createuser(req, res) {
    const user = {
      id: UsersData.length + 1,
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      address: req.body.address,
      is_admin: req.body.is_admin
    };
    UsersData.push(user);
    return res.status(201).send({
      status: 201,
      message: 'User created successfully',
      data: {
        id: Object.values(user)[0], first_name: Object.values(user)[2], last_name: Object.values(user)[3], email: Object.values(user)[1]
      }
    });
  }

  static deleteuser(req, res) {
    const selecteduser = UsersData.find(checkId => checkId.id === parseInt(req.params.id, 10));
    if (!selecteduser) {
      return res.status(404).send({
        status: 404,
        message: `User with id ${req.params.id} not found`
      });
    }
    const index = UsersData.indexOf(selecteduser);
    UsersData.splice(index, 1);
    return res.status(200).send({
      status: 200,
      message: `User with id ${req.params.id} is successfully deleted `
    });
  }
}
export default Users;
