import * as queueModel from '../models/queueModel.js';
import ValidationError from '../utils/ValidationError.js';

export const fetchAllOrder = async(orderqueue) =>{
    const orders = await queueModel.fetchAllOrder(orderqueue);
    return orders;
}

const doesOrderExist = async (orderqueue) =>{
    let existing;
    if(Object.hasOwn(orderqueue, "orderId")){
        existing = await queueModel.findOrderById(orderqueue.orderId)
    }else{
        existing = await queueModel.findOrderByOrderNumber(orderqueue.orderNum);
    }
    
    if(existing.length > 0){
        return true;
    }

    return false;
}

export const updateOrder = async(orderqueue) => {
    if(!orderqueue.status){
        throw new ValidationError(404, 'status is required!');
    }
    
    const existing = await doesOrderExist(orderqueue);

    if(!existing){
        throw new ValidationError(404, 'Order does not exist!');
    }

    const updatedOrder = await queueModel.update(orderqueue);
    return updatedOrder;
}