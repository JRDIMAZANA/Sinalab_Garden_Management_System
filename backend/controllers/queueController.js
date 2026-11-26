import * as queueService from '../services/queueService.js';

export const fetchAllOrder = async (req, res) =>{
    const orders = await queueService.fetchAllOrder();
    res.status(200).json(orders);
}

export const editOrder = async (req, res) => {
    const {status} = req.body;
    const { orderId } = req.params;
    const order = {orderId: parseInt(orderId), status};

    try{
        const updatedOrder = await queueService.updateOrder(order);
        res.status(200).json({
            success: true,
            message: updatedOrder
        });
    }catch(e){
        console.log(e);
        res.status(e.statusCode || 500).json({
            error: e.message
        });
    }
}