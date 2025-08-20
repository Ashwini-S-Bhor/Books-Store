import React, { useState } from 'react';
import { useSubscribe } from '../context/SubscriptionContext';
import footerLogo from "../assets/news/footer-logo.png";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { subscribed, subscribe, unsubscribe } = useSubscribe();

  const handleSubscribe = () => {
    if (!email.trim()) {
      setMessage("Please enter a valid email.");
      return;
    }
    subscribe(email);
    setMessage("You're subscribed! 🎉");
    setEmail('');
  };

  const handleUnsubscribe = () => {
    unsubscribe();
    setEmail('');
    
  };

  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="Logo" className="mb-5 w-36" />
          <ul className="flex flex-col md:flex-row gap-4">
            <li><NavLink to="/" className="hover:text-yellow-400">Home</NavLink></li>
            <li><NavLink to="/services" className="hover:text-yellow-400">Services</NavLink></li>
            <li><NavLink to="/about" className="hover:text-yellow-400">About Us</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-yellow-400">Contact</NavLink></li>
          </ul>
        </div>

        {/* Right Side - Newsletter */}
        <div className="md:w-1/2 w-full">
          <p className="mb-4">
            Subscribe to our newsletter to receive the latest updates, news, and offers!
          </p>

          {!subscribed ? (
            <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full sm:w-64 px-4 py-2 rounded-l-md text-white"
              />
              <button
                onClick={handleSubscribe}
                className="bg-yellow-400 text-black px-6 py-2 rounded-r-md hover:bg-yellow-500 mt-2 sm:mt-0"
              >
                Subscribe
              </button>
              {message && (
                <p className="text-sm text-yellow-400 mt-2">{message}</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <span className="text-green-400">You're subscribed! 🎉</span>
              <button
                onClick={handleUnsubscribe}
                className="text-red-400 underline hover:text-red-500"
              >
                Unsubscribe
              </button>
              {message && !subscribed && (
                <p className="text-sm text-yellow-400 mt-2">{message}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        <ul className="flex gap-6 mb-4 md:mb-0">
          <NavLink to="/privacypolicy" className="hover:text-yellow-400">Privacy Policy</NavLink>
          <NavLink to="/terms" className="hover:text-yellow-400">Terms of Service</NavLink>
        </ul>
        <div className="flex gap-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaFacebook size={24} /></a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaTwitter size={24} /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaInstagram size={24} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
