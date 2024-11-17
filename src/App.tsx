import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import TradingBots from './pages/TradingBots';
import CreateBot from './pages/CreateBot';
import Account from './pages/Account';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Markets from './pages/Markets';
import Portfolio from './pages/Portfolio';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import TransactionHistory from './pages/TransactionHistory';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const { checkAuth, loading, initialized } = useAuth();

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!initialized || loading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/bots" element={
              <ProtectedRoute>
                <TradingBots />
              </ProtectedRoute>
            } />
            <Route path="/bots/create" element={
              <ProtectedRoute>
                <CreateBot />
              </ProtectedRoute>
            } />
            <Route path="/markets" element={
              <ProtectedRoute>
                <Markets />
              </ProtectedRoute>
            } />
            <Route path="/portfolio" element={
              <ProtectedRoute>
                <Portfolio />
              </ProtectedRoute>
            } />
            <Route path="/account" element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } />
            <Route path="/deposit" element={
              <ProtectedRoute>
                <Deposit />
              </ProtectedRoute>
            } />
            <Route path="/withdraw" element={
              <ProtectedRoute>
                <Withdraw />
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <TransactionHistory />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;