// src/context/SubscriptionContext.jsx
import React, { createContext, useEffect, useState,useContext } from 'react';

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("subscriberEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setSubscribed(true);
    }
  }, []);

  const subscribe = (newEmail) => {
    localStorage.setItem("subscriberEmail", newEmail);
    setEmail(newEmail);
    setSubscribed(true);
  };

  const unsubscribe = () => {
    localStorage.removeItem("subscriberEmail");
    setEmail('');
    setSubscribed(false);
  };

  return (
    <SubscriptionContext.Provider value={{ email, subscribed, subscribe, unsubscribe }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
export const useSubscribe = () => useContext(SubscriptionContext);