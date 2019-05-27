import express from 'express';
import Ordersmodel from '../models/purchaseorders';
import UserData from '../models/users';
import CarsData from '../models/carsadvert';

const date = new Date();
class Orders {
  static getallorders(req, res) {
    return res.status(200).send({
      status: 200,
      message: 'All orders retrieved successfully',
      data: Ordersmodel
    });
  }

  static createorder(req, res) {
  	const order = {
  		id: Ordersmodel.length + 1,
  		buyer: req.body.buyer,
  		car_id: req.body.car_id,
  		amount: req.body.amount,
  		status: req.body.status
  	};
  	const carid = CarsData.find(checkid => checkid.id == req.body.car_id);

    const buyerid = UserData.find(checkid => checkid.id == req.body.buyer);
    if (!carid) {
  	return res.status(404).send({
  		status: 404,
  		message: `The car with id ${req.body.car_id} not found`

  	});
    }
  	if (!buyerid) {
  		return res.status(404).send({
  			status: 404,
  			message: `The buyer with id ${req.body.buyer} not found`,

  		});
  	}
  	if ((buyerid) && (carid)) {
  		Ordersmodel.push(order);
  		return res.status(201).send({
  			status: 201,
  			message: ' Purchase Order successfully created',
  			data: {
  				id: order.id,
  				car_id: order.car_id,
  				created_on: date,
  				status: order.status,
  				price: carid.price,
  				price_offered: order.amount,
  			}
  		});
  	}
  }
}
export default Orders;
