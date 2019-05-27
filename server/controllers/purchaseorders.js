import express from 'express';
import Ordersmodel from '../models/purchaseorders';
class Orders{
	static getallorders(req,res){
		return res.status(200).send({
			status:200,
			message:"All orders retrieved successfully"
			data:Ordersmodel
		})
	}

}
export default Orders;


