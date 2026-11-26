import pool from '../config/db.js';


export const fetchAllOrder = async() => {
    const [rows] = await pool.query("SELECT * FROM orderqueue");
    return rows;
};

export const findOrderByOrderNumber = async(orderqueue) =>{
    const [rows] = await pool.query("SELECT * FROM orderqueue WHERE orderNum=?",
        [orderqueue.orderNum]
    );
    return rows;
};

export const findOrderById = async(orderId) =>{
    const [rows] = await pool.query("SELECT * FROM orderqueue WHERE orderId=?",
        [orderId]
    );
    return rows;
}

//update
export const update = async (orderqueue) => {
    const [result] = await pool.query (
        "UPDATE orderqueue SET status=? WHERE orderId=? ",
        [orderqueue.status, orderqueue.orderId]
    );
    return result.affectedRows;
}