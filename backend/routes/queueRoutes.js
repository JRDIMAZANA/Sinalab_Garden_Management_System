import * as queueController from '../controllers/queueController.js';
import express from "express"

const queueRoutes = express.Router();

queueRoutes.get('/all', queueController.fetchAllOrder);
queueRoutes.put('/:orderId', queueController.editOrder);

export default queueRoutes;