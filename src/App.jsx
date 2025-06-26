import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import ELearning from './pages/ELearning.jsx';
import InformasiAkademik from './pages/InformasiAkademik';
import JadwalKuliah from './pages/JadwalKuliah';
import PembayaranUKT from './pages/PembayaranUKT.jsx';
import PerpustakaanOnline from './pages/PerpustakaanOnline';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } />

                        <Route path="/profile" element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        } />

                        <Route path="/informasi-akademik" element={
                            <ProtectedRoute>
                                <InformasiAkademik />
                            </ProtectedRoute>
                        } />

                        <Route path="/jadwal-kuliah" element={
                            <ProtectedRoute>
                                <JadwalKuliah />
                            </ProtectedRoute>
                        } />

                        <Route path="/e-learning" element={
                            <ProtectedRoute>
                                <ELearning />
                            </ProtectedRoute>
                        } />

                        <Route path="/perpustakaan" element={
                            <ProtectedRoute>
                                <PerpustakaanOnline />
                            </ProtectedRoute>
                        } />

                        <Route path="/pembayaran" element={
                            <ProtectedRoute>
                                <PembayaranUKT />
                            </ProtectedRoute>
                        } />

                        <Route path="*" element={<NotFound />} />

                    </Routes>
                </main>
            </div>
        </AuthProvider>
    );
}

export default App;