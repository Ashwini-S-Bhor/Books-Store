// src/pages/orders/OrdersPage.jsx
import React from 'react';
import { useGetOrderByEmailQuery } from '../../features/orders/ordersApi';

const OrdersPage = () => {
  const email = JSON.parse(localStorage.getItem("user"))?.email;
 
  const { data: orders, isLoading, isError, error } = useGetOrderByEmailQuery(email);

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Error: {error?.data?.message || error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {orders?.length > 0 ? (
        orders.map(order => (
          <div key={order._id} className="border rounded p-4 mb-4 shadow-sm">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
            <p><strong>Items:</strong> {order.productIds.length}</p>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersPage;
