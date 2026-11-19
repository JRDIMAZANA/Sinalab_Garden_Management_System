import * as cashierController from "../controllers/cashierController.js";
import express from 'express';

const cashierRoutes = express.Router();

cashierRoutes.get('/all', cashierController.fetchAllMenu);

export default cashierRoutes;