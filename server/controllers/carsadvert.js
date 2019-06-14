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
    const owner = req.user.id;
    const sellerEmail = req.user.email;
    try {
      if (Carsvalidations.createcarsad(req, res)) {}
      req.body.id = CarsData.length + 1;
      req.body.sellerEmail = req.user.email;
  	const {
  		id,
  		sellerEmail,
  		date,
  		state,
  		status,
  		price,
  		manufacturer,
  		model,
  		body_type,
        photo
  	} = req.body;
      CarsData.push(req.body);
      return res.status(201).send({
        status: 201,
        message: 'Car advert is successfully created',
        data: {
          id,
          sellerEmail, // sellerid.email,
          date,
          manufacturer,
          model,
          price,
          state,
          status,
          photo
        }
      });
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
      const Foundmail = checkcar.sellerEmail;
      const checkmail = UserData.filter(checkmail => checkmail.sellerEmail === parseInt(checkcar.owner));
      // const checkedmail = checkmail[0].email;
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
            email: Foundmail,
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
      if (error) {
        console.log(error);
      }
      return res.status(400).send({
        status: 400,
        message: error.message
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
    const carstatus = CarsData.filter(checkstatus => checkstatus.status == 'available');
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

  static availablemanufacturer(req, res) {
    console.log(req.query.manufacturer);
    const carstatus = CarsData.filter(checkstatus => checkstatus.status == 'available');
    const Carsmanufacturer = carstatus.filter(checkmanuf => checkmanuf.manufacturer == req.query.manufacturer);
    if (Carsmanufacturer.length) {
      return res.status(200).send({
        status: 200,
        message: `all available with ${req.query.manufacturer} manufacturer retreived successfully`,
        data: Carsmanufacturer
      });
    }
    if (Carsmanufacturer === undefined || Carsmanufacturer.length == 0) {
      return res.status(404).send({
        status: 404,
        message: `all available with ${req.query.manufacturer} manufacturer retreived successfully`,
      });
    }
  }

  static bodytype(req, res) {
    const carstatus = CarsData.filter(checkstatus => checkstatus.status == 'available');
    const carsbody_type = carstatus.filter(checktype => checktype.body_type == req.query.body_type);
    if (carsbody_type) {
      return res.status(200).send({
        status: 200,
        message: `Cars with ${req.query.body_type} body type retreived successfully`,
        data: carsbody_type
      });
    }
    if (carsbody_type === undefined || carsbody_type.length == 0) {
      return res.status(404).send({
        status: 404,
        message: `Cars with ${req.query.body_type} body type not retreived successfully`,
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

  static unsoldCarsWithinRange(req, res) {
    try {
      if (Carsvalidations.availablerange(req, res)) {}
      const {
        min_price,
        max_price
      } = req.query;
      const min = Math.min(min_price, max_price);
      const max = Math.max(min_price, max_price);

      const allunsoldCars = CarsData.filter(car => car.status === 'available');
      const RangePrice = allunsoldCars.filter(checkPrice => checkPrice.price >= min && checkPrice.price <= max);
      if (!RangePrice.length) {
        return res.status(200).send({
          status: 200,
          message: 'no cars within this range',
          data: RangePrice
        });
      }
      return res.status(200).send({
        status: 200,
        message: 'Cars within range retreived successfully',
        data: RangePrice
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: error.message
      });
    }
  }
}
export default Cars;
