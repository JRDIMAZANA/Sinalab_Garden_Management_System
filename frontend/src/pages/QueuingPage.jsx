import "../queueStyle.css";
import OrderContainer from '../components/OrderContainer';
import { useState, useEffect } from 'react';

const OrderPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('http://localhost:3000/orderqueue/all');
                
                if (!response.ok) {
                    throw new Error(response.status);
                }
                
                const result = await response.json(); 
                setData(result);
            } catch (e) {
                console.log("Error fetching data:", e.message);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    const handleUpdateOrder = async (orderId, currentStatus) => {
        const statusSequence = ["pending", "preparing", "to serve", "completed"];
        const currentIndex = statusSequence.indexOf(currentStatus);
        
        const nextStatus = currentIndex < statusSequence.length - 1 
            ? statusSequence[currentIndex + 1] 
            : "completed";

        const isConfirmed = window.confirm(
            `Are you sure you want to change the status from "${currentStatus}" to "${nextStatus}"?`
        );

        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:3000/orderqueue/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: nextStatus }),
            });

            if (!response.ok) {
                throw new Error("Failed to update");
            }

            setData(prevData => 
                prevData.map(order => 
                    order.orderId === orderId 
                        ? { ...order, status: nextStatus } 
                        : order
                )
            );

        } catch (e) {
            console.error("Error updating order:", e.message);
            alert("Failed to update the order status.");
        }
    };

    if (loading) return <h1>Loading orders...</h1>;

    return (
        <>
            {}
            <OrderContainer data={data} onUpdate={handleUpdateOrder} />
        </>
    );
};

export default OrderPage;