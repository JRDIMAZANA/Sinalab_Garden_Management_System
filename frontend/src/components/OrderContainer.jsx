const OrderContainer = ({ data, onUpdate }) => {
    return (
    <>
        <section id="Header">
                <h1>Orders</h1>
            </section>
        <section id="Container">
            <section id="OrderContainer">
                <article className="title">
                    <h1>Active</h1>
                </article>
                
                <article id="ActiveOrders">
                    {data.map((orderqueue) => (
                        <div className="ready-list" key={orderqueue.orderId}>
                            <h1>Order No: {orderqueue.orderNum}</h1>
                            <p>Table No: {orderqueue.tableNum}</p>
                            <p>{orderqueue.orderList}</p>
                            <p>Status: {orderqueue.status}</p>
                            
                            <button onClick={() => onUpdate(orderqueue.orderId, orderqueue.status)}>
                                Update
                            </button>
                        </div>
                    ))}
                </article>
            </section>
        </section>
    </>
    );
};

export default OrderContainer;