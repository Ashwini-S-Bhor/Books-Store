// src/pages/CheckoutPage.jsx
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import Swal from 'sweetalert2';
import { PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
  const { currentUser } = useAuth();

  const { register, handleSubmit } = useForm();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [isChecked, setIsChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod | paypal

  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode
      },
      phone: data.phone,
      productIds: cartItems.map(item => item?._id),
      totalPrice: totalPrice,
      paymentMethod: paymentMethod,
    };

    try {
      if (paymentMethod === "cod") {
        // ✅ Cash on Delivery
        await fetch("/api/payments/cod", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderDetails: newOrder }),
        });

        await createOrder(newOrder).unwrap();
        Swal.fire("Order Confirmed", "Your COD order was placed successfully!", "success");
      }
      // ✅ PayPal is handled by PayPalButtons below
    } catch (error) {
      console.error("Error placing order", error);
      Swal.fire("Error", "Failed to place order", "error");
    }
  };

  if (isLoading) return <div>Loading......</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <h2 className="font-semibold text-xl text-gray-600 mb-2">Checkout</h2>
        <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
        <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>

        <div className="bg-white rounded shadow-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Personal Details</p>
              <p>Please fill out all the fields.</p>
            </div>

            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                {/* Name */}
                <div className="md:col-span-5">
                  <label htmlFor="name">Full Name</label>
                  <input {...register("name", { required: true })} type="text" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                </div>

                {/* Email */}
                <div className="md:col-span-5">
                  <label>Email Address</label>
                  <input type="text" disabled defaultValue={currentUser?.email} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                </div>

                {/* Phone */}
                <div className="md:col-span-5">
                  <label>Phone Number</label>
                  <input {...register("phone", { required: true })} type="number" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                </div>

                {/* Address */}
                <div className="md:col-span-3">
                  <label>Address</label>
                  <input {...register("address", { required: true })} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                </div>

                <div className="md:col-span-2">
                  <label>City</label>
                  <input {...register("city", { required: true })} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                </div>

                <div className="md:col-span-2">
                  <label>Country</label>
                  <input {...register("country", { required: true })} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                </div>

                <div className="md:col-span-2">
                  <label>State</label>
                  <input {...register("state", { required: true })} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                </div>

                <div className="md:col-span-1">
                  <label>Zipcode</label>
                  <input {...register("zipcode", { required: true })} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                </div>

                {/* Payment Method */}
                <div className="md:col-span-5">
                  <label className="font-semibold">Choose Payment Method</label>
                  <div className="flex gap-6 mt-2">
                    <label>
                      <input type="radio" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                      <span className="ml-2">Cash on Delivery</span>
                    </label>
                    <label>
                      <input type="radio" value="paypal" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} />
                      <span className="ml-2">PayPal</span>
                    </label>
                  </div>
                </div>

                {/* Terms */}
                <div className="md:col-span-5 mt-3">
                  <div className="inline-flex items-center">
                    <input onClick={(e) => setIsChecked(e.target.checked)} type="checkbox" className="form-checkbox"/>
                    <label className="ml-2">
                      I agree to the <Link className="underline text-blue-600">Terms & Conditions</Link>.
                    </label>
                  </div>
                </div>

                {/* Submit / PayPal */}
                <div className="md:col-span-5 text-right">
                  {paymentMethod === "cod" ? (
                    <button type="submit" disabled={!isChecked} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Place Order (COD)
                    </button>
                  ) : (
                    isChecked && (
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={async () => {
                          const res = await fetch("/api/payments/create-paypal-order", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ amount: totalPrice }),
                          });
                          const data = await res.json();
                          return data.id;
                        }}
                        onApprove={async (data) => {
                          await fetch("/api/payments/capture-paypal-order", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ orderId: data.orderID }),
                          });
                          await createOrder(newOrder).unwrap();
                          Swal.fire("Payment Successful", "Your order has been placed!", "success");
                        }}
                      />
                    )
                  )}
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
