import express from 'express';
import CarsData from '../models/carsadvert';
import UserData from '../models/users';
import Carsvalidations from '../validations/carsadvert';

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
    try {
      if (Carsvalidations.createcarsad(req, res)) {}
  	const car = {
  		id: CarsData.length + 1,
  		owner: req.body.owner,
  		created_on: date,
  		state: req.body.state,
  		status: req.body.status,
  		price: req.body.price,
  		manufacturer: req.body.manufacturer,
  		model: req.body.model,
  		body_type: req.body.body_type,
        photo: req.body.photo
  	};


  	const sellerid = UserData.find(checkid => checkid.id == req.body.owner);
  	/* const selleremail = sellerid[0].email; */
  	console.log(sellerid);
  	if (!sellerid) {
  		res.status(404).send({
  			status: 404,
  			message: `The seller with id ${req.body.owner} not found`
  		});
  	}
      if (sellerid) {
        CarsData.push(car);
        return res.status(201).send({
          status: 201,
          message: 'Car advert is successfully created',
          data: {
            id: car.id,
            email: sellerid.email,
            created_on: car.created_on,
            manufacturer: car.manufacturer,
            model: car.model,
            price: car.price,
            state: car.state,
            status: car.status,
            photo: car.photo
          }
        });
      }
    } catch (error) {
      return res.status(400).send({
        message: error.message
      });
    }
  }

  static updatecarprice(req, res) {
    try {
      if (req.params.id < 1) {
        res.status(404).send({
          status: 404,
          message: `Car with id ${req.params.id} not found`
        });
      }
      if (!(req.body.price > 0)) {
        res.status(422).send({
          status: 422,
          message: 'Invalid price inputs'
        });
      }
      const checkcar = CarsData.find(checkid => checkid.id === parseInt(req.params.id));
      const checkmail = UserData.filter(checkmail => checkmail.id === parseInt(checkcar.owner));
      const checkedmail = checkmail[0].email;
      if (!checkcar) {
        return res.status(404).send({
          status: 404,
          message: `car with id ${req.params.id} not found`
        });
      }
      if (checkcar) {
        checkcar.price = req.body.price;
        return res.status(200).send({
          status: 200,
          message: 'Car price is updated successfully',
          data: {
            id: checkcar.id,
            email: checkedmail,
            created_on: date,
            manufacturer: checkcar.manufacturer,
            model: checkcar.model,
            price: checkcar.price,
            state: checkcar.state,
            status: checkcar.status,
            photo: checkcar.photo

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

  static getonecar(req, res) {
    const checkcar = CarsData.find(checkid => checkid.id === parseInt(req.params.id));
    if (!(req.params.id) > 0) {
      return res.status(404).send({
        status: 404,
        message: `car with id ${req.params.id} not found`
      });
    }
    if (!checkcar) {
      res.status(404).send({
        status: 404,
        message: `car with id ${req.params.id} not found`
      });
    }
    if (checkcar) {
      return res.status(200).send({
        status: 200,
        message: `car with id ${req.params.id} retreived successfully`,
        data: checkcar
      });
    }
  }

  static getallavailable(req, res) {
    const checkcar = CarsData.find(checkid => checkid.id === parseInt(req.params.id));
    const carstatus = CarsData.find(checkstatus => checkstatus.status == 'available');
    if (carstatus) {
      return res.status(200).send({
        status: 200,
        message: 'all available cars successfully retreived',
        data: carstatus
      });
    }
    if (carstatus === undefined || carstatus.length == 0) {
      return res.status(404).send({
        status: 404,
        message: 'available  cars not found',
      });
    }
  }

  static availablenew(req, res) {
    const carstatus = CarsData.filter(checkstatus => checkstatus.status == 'available' && checkstatus.state == 'new');
    if (carstatus) {
      return res.status(200).send({
        status: 200,
        message: 'all available and new cars successfully retreived',
        data: carstatus
      });
    }
    if (carstatus === undefined || carstatus.length == 0) {
      return res.status(404).send({
        status: 404,
        message: 'available and new  cars not found',
      });
    }
  }

  static availableused(req, res) {
    const carstatus = CarsData.filter(checkstatus => checkstatus.status == 'available' && checkstatus.state == 'used');
    if (carstatus) {
      return res.status(200).send({
        status: 200,
        message: 'all available and used cars successfully retreived',
        data: carstatus
      });
    }
    if (carstatus === undefined || carstatus.length == 0) {
      return res.status(404).send({
        status: 404,
        message: 'available and used cars not found',
      });
    }
  }

  static deletecar(req, res) {
    const checkcar = CarsData.find(checkId => checkId.id === parseInt(req.params.id, 10));
    if (!checkcar) {
      return res.status(404).send({
        status: 404,
        message: `Car with id ${req.params.id} not found`,
      });
    }
    if (checkcar) {
      const index = CarsData.indexOf(checkcar);
      CarsData.splice(index, 1);
      return res.status(200).send({
        status: 200,
        message: `car with id ${req.params.id} is successfully deleted `
      });
    }
  }
}


export default Cars;
