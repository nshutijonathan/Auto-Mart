import express from 'express';
import Ordersmodel from '../models/purchaseorders';
import UserData from '../models/users';
import CarsData from '../models/carsadvert';
import Ordersvalidations from '../validations/purchaseorders';

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
    const buyerId = req.user.id;
  	try {
      if (Ordersvalidations.purchaseorder(req, res)) {}
      req.body.id = Ordersmodel.length + 1;
  	const {
  		id,
  		buyerId,
  		car_id,
  		amount,
  		status,
  	} = req.body;
  	const carid = CarsData.find(checkid => checkid.id == req.body.car_id);
      const buyerid = UserData.find(checkid => checkid.id == req.body.buyer);
      if (!carid) {
  	return res.status(404).send({
  		status: 404,
  		message: `The car with id ${req.body.car_id} not found`

  	});
      }
      if (carid.status !== 'available') {
        return res.status(400).send({
          status: 400,
          message: `The car with id ${req.body.car_id} is not available`
        });
      }

  	if (carid.status === 'available') {
  		Ordersmodel.push(req.body);
  		return res.status(201).send({
  			status: 201,
  			message: ' Purchase Order successfully created',
  			data: {
  				id,
  				car_id,
  				date,
  				status,
  				price: carid.price,
  				price_offered: amount,
  			}
  		});
  	}
    } catch (error) {
  	return res.status(400).send({
  		status: 400,
  		message: error.message
  	});
    }
  }

  static updateorder(req, res) {
  	try {
  	if (req.params.id < 1) {
  		return res.status(404).send({
  			status: 404,
  			message: `the order with id ${req.params.id} not found`,
  		});
  	}
      if (req.body.amount < 1) {
   	return res.status(404).send({
  			status: 404,
  			message: 'invalid  amount ',
  		});
  	}

  	const checkorder = Ordersmodel.find(checkid => checkid.id === parseInt(req.params.id));
  	const oldprice = Ordersmodel.find(checkid => checkid.id === parseInt(req.params.id));
      const old_price_offered = oldprice.amount;
      const check_status = oldprice.status;
  	if (!checkorder) {
  		return res.status(404).send({
  			status: 404,
  			message: `Order with id ${req.params.id} not found`
  		});
  	}
  	if (check_status != 'pending') {
  		res.status(405).send({
  			status: 405,
  			message: `Not allowed order ${req.params.id} is not still pending`
  		});
  	}
  	if (!(check_status == 'pending' || checkorder)) {
  	return res.status(500).send({
  		message: 'server erro'
  	});
  	}
  	if ((check_status == 'pending' && checkorder)) {
  		console.log(check_status);
  	console.log(oldprice.amount);
  	checkorder.amount = req.body.amount;
  	console.log(checkorder.amount);
  	return res.status(200).send({
          status: 200,
          message: `Purchasing order ${req.params.id} is successfully updated`,
  		data: {
            id: checkorder.id, car_id: checkorder.car_id, status: checkorder.status, old_price_offered, new_price_offered: checkorder.amount
          }
        });
  	}
    } catch (error) {
  	return res.status(400).send({
  		status: 400,
  		message: `The order with id ${req.params.id} not found`
  	});
    }
  }


  	static updatestatus(req, res) {
  		try {
      if (Ordersvalidations.statusupdate(req, res)) {}
  		if (req.params.id < 1) {
  			res.status(404).send({
  				status: 404,
  				message: `Car with id ${req.params.id} not found`
  			});
  		}
      const useremail = req.user.email;
  		const checkcar = CarsData.find(checkid => checkid.id === parseInt(req.params.id));
  		// const checkmail = UserData.filter(checkmail => checkmail.id ===useremail);
  		// const checkedmail = checkmail[0].email;
  			if (!checkcar) {
  		return res.status(404).send({
  			status: 404,
  			message: `car with id ${req.params.id} not found`
  		});
  	}
  	if (checkcar) {
  		checkcar.status = req.body.status;
  		return res.status(200).send({
  			status: 200,
  			message: 'Car status is updated successfully',
  			data: {
  				id: checkcar.id,
  				email: useremail,
  				created_on: date,
  				manufacturer: checkcar.manufacturer,
  				model: checkcar.model,
  				price: checkcar.price,
  				state: checkcar.state,
  				status: checkcar.status

  			}
  		});
  	}
  	} catch (error) {
  	return res.status(400).send({
  		status: 400,
  		message: error.message
  	});
    }
  }
}
export default Orders;
