// src/components/banner/Banner.jsx
import React, { useContext, useState } from 'react';
import bannerImg from "../../assets/banner.png";
import { toast, Toaster } from 'react-hot-toast';
import { SubscriptionContext } from '../../context/SubscriptionContext';

export const Banner = () => {
  const [input, setInput] = useState('');
  const { email, subscribed, subscribe, unsubscribe } = useContext(SubscriptionContext);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubscribe = () => {
    if (!input.trim()) return toast.error("Please enter your email!");
    if (!isValidEmail(input)) return toast.error("Invalid email format.");

    subscribe(input);
    toast.success("Subscribed successfully!");
  };

  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
      <Toaster position="top-right" />
      <div className='md:1/2 w-full flex items-center md:justify-end'>
        <img src={bannerImg} alt="Banner" />
      </div>

      <div className='md:w-1/2 w-full'>
        <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Release This Week</h1>
        <p className='mb-10 text-gray-700'>
          It's time to update your reading list with some of the latest and greatest in the library world.
        </p>

        {!subscribed ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto"
            />
            <button
              onClick={handleSubscribe}
              className="text-white bg-yellow-400 hover:bg-blue-900 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Subscribe
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-green-600 font-medium">
             <span className="font-bold"></span>
            </p>
            <button
              onClick={() => {
                unsubscribe();
                toast("Unsubscribed.");
              }}
              className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Unsubscribe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
