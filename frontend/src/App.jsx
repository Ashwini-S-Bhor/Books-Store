import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './component/NavBar';
import Footer from './component/Footer';
import { AuthProvider } from './context/AuthContext';
import { SubscriptionProvider } from './context/SubscriptionContext'; // ⬅️ import the context

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider> {/* ⬅️ Wrap inside here */}
        <Navbar />
        <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6">
          <Outlet />
        </main>
        <Footer />
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;
