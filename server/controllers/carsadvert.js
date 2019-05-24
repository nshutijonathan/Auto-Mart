import express from 'express';
import CarsData from '../models/carsadvert';

class Cars {
  static getallcarsad(req, res) {
    return res.status(200).send({
      status: 200,
      message: 'all car ads retreived successfully',
      data: CarsData
    });
  }
}
export default Cars;
