import express from 'express';
import CarsData from '../models/carsadvert';
import UserData from '../models/users';

const date = new Date();
class Cars {
  static getallcarsad(req, res) {
    return res.status(200).send({
      status: 200,
      message: 'all adverts retreived successfully',
      data: CarsData
    });
  }

  static createadvert(req, res) {
  	const car = {
  		id: CarsData.length + 1,
  		owner: req.body.owner,
  		created_on: date,
  		state: req.body.state,
  		status: req.body.status,
  		price: req.body.price,
  		manufacturer: req.body.manufacturer,
  		model: req.body.model,
  		body_type: req.body.body_type
  	};
  	if (req.body.price < 1) {
  		return res.status(405).send({
  			status: 405,
  			message: 'please the price must be valid'
  		});
  	}
  	CarsData.push(car);
  	const sellerid = UserData.filter(checkid => checkid.id == req.body.owner);
  	const selleremail = sellerid[0].email;
  	console.log(selleremail);
  	return res.status(201).send({
  		status: 201,
  		message: 'Car advert is successfully created',
  		data: {
        id: car.id,
        email: selleremail,
        created_on: car.created_on,
        manufacturer: car.manufacturer,
  		model: car.model,
        price: car.price,
        state: car.state,
        status: car.status
      }
  	});
  }
}
export default Cars;
