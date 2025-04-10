import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SearchProvider } from './Components/SearchContext';

// Component Imports
import Register from './Components/Register';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Cart from './Components/Cart';
import About from './Components/About';
import Contact from './Components/Contact';
import UserProfile from './Components/UserProfile';
import Orders from './Components/Orders';
import Wishlist from './Components/Wishlist';
import ForgotPassword from './Components/ForgotPassword';
import AdminLayout from './Components/Admin/AdminLayout';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminProducts from './Components/Admin/AdminProducts';
import ProductDetails from './Components/ProductDetails'; // If you have this component
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    // Layout component for user routes
    const Layout = ({ children }) => {
        return (
            <>
                <Navbar 
                    isLoggedIn={isLoggedIn} 
                    setIsLoggedIn={setIsLoggedIn}
                />
                <div className="main-content">
                    {children}
                </div>
            </>
        );
    };

    // Admin Route component
    const AdminRoute = ({ children }) => {
        if (isLoading) {
            return (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            );
        }

        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'Admin') {
            return <Navigate to="/login" replace />;
        }

        return <AdminLayout>{children}</AdminLayout>;
    };

    // Protected Route component for regular users
    const ProtectedRoute = ({ children }) => {
        if (isLoading) {
            return (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            );
        }

        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token) {
            return <Navigate to="/login" replace />;
        }

        if (role === 'Admin') {
            return <Navigate to="/admin-panel" replace />;
        }

        return <Layout>{children}</Layout>;
    };

    // Public Route component
    const PublicRoute = ({ children }) => {
        if (isLoading) {
            return (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            );
        }

        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (token) {
            if (role === 'Admin') {
                return <Navigate to="/admin-panel" replace />;
            }
            return <Navigate to="/home" replace />;
        }

        return <Layout>{children}</Layout>;
    };

    if (isLoading) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <SearchProvider>
            <Router>
                <div className="app-container">
                    <Routes>
                        {/* Public Routes */}
                        <Route 
                            path="/login" 
                            element={
                                <PublicRoute>
                                    <Login onLogin={() => setIsLoggedIn(true)} />
                                </PublicRoute>
                            } 
                        />
                        <Route 
                            path="/register" 
                            element={
                                <PublicRoute>
                                    <Register />
                                </PublicRoute>
                            } 
                        />
                        <Route 
                            path="/forgot-password" 
                            element={
                                <PublicRoute>
                                    <ForgotPassword />
                                </PublicRoute>
                            } 
                        />

                        {/* Admin Routes */}
                        <Route
                            path="/admin-panel"
                            element={
                                <AdminRoute>
                                    <AdminDashboard />
                                </AdminRoute>
                            }
                        />
                        <Route
                            path="/admin-panel/products"
                            element={
                                <AdminRoute>
                                    <AdminProducts />
                                </AdminRoute>
                            }
                        />

                        {/* User Protected Routes */}
                        <Route
                            path="/home"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/product/:productId"
                            element={
                                <ProtectedRoute>
                                    <ProductDetails />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>
                                    <Cart />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/about"
                            element={
                                <ProtectedRoute>
                                    <About />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/contact"
                            element={
                                <ProtectedRoute>
                                    <Contact />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <UserProfile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/orders"
                            element={
                                <ProtectedRoute>
                                    <Orders />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/wishlist"
                            element={
                                <ProtectedRoute>
                                    <Wishlist />
                                </ProtectedRoute>
                            }
                        />

                        {/* Default Route */}
                        <Route 
                            path="/" 
                            element={
                                isLoggedIn ? 
                                    localStorage.getItem('role') === 'Admin' ?
                                        <Navigate to="/admin-panel" replace /> :
                                        <Navigate to="/home" replace /> :
                                    <Navigate to="/login" replace />
                            } 
                        />

                        {/* 404 Route */}
                        <Route 
                            path="*" 
                            element={
                                <div className="error-page">
                                    <h1>404 - Page Not Found</h1>
                                    <p>The page you're looking for doesn't exist.</p>
                                    <button 
                                        onClick={() => window.history.back()}
                                        className="back-button"
                                    >
                                        Go Back
                                    </button>
                                </div>
                            } 
                        />
                    </Routes>
                </div>
            </Router>
        </SearchProvider>
    );
}

export default App;