import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './component/NavBar';
import Footer from './component/Footer';
import { AuthProvider } from './context/AuthContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
      <AuthProvider>
        <SubscriptionProvider>
          <Navbar />
          <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6">
            <Outlet />
          </main>
          <Footer />
        </SubscriptionProvider>
      </AuthProvider>
    </PayPalScriptProvider>
  );
}

export default App;
