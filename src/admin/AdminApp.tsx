// src/admin/AdminApp.tsx
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import FirestoreSeed from "./FirestoreSeed";

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking,        setChecking]        = useState(true);

  // Firebase Auth persists session automatically across refreshes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setChecking(false);
    });
    return unsub; // cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Loading…
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Seed route — no auth required, delete after seeding */}
      <Route path="seed" element={<FirestoreSeed />} />

      {/* All other admin routes */}
      <Route
        path="*"
        element={
          isAuthenticated
            ? <AdminDashboard onLogout={handleLogout} />
            : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
        }
      />
      
    </Routes>
  );
}