// src/admin/AdminLogin.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [error,       setError]       = useState("");
  const [loading,     setLoading]     = useState(false);
  const [shake,       setShake]       = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err: any) {
      const msg =
        err.code === "auth/user-not-found"  ? "No account found with this email." :
        err.code === "auth/wrong-password"  ? "Incorrect password." :
        err.code === "auth/invalid-email"   ? "Invalid email address." :
        err.code === "auth/too-many-requests" ? "Too many attempts. Try again later." :
        "Login failed. Check your credentials.";
      setError(msg);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className={`w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl ${shake ? "animate-shake" : ""}`}>

        {/* ── Left branding panel ── */}
        <div className="hidden md:flex flex-col justify-between bg-primary p-10 w-80 shrink-0">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
                  <path d="M24 8L8 20v20h10V28h12v12h10V20L24 8z" fill="white" />
                </svg>
              </div>
              <div>
                <p className="text-white font-normal text-lg leading-none">RealHubb</p>
                <p className="text-secondary text-xs tracking-widest uppercase mt-0.5">Admin Portal</p>
              </div>
            </div>
            <div className="space-y-3 pt-4">
              {["Manage Property Listings", "Publish Blog Posts", "Upload Images via Cloudinary", "Manage Developers & Team", "Live Firestore Database"].map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  <span className="text-white/75 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-white/30 text-xs">realhubb.in · Bengaluru</p>
        </div>

        {/* ── Right form panel ── */}
        <div className="flex-1 bg-background flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-sm space-y-8">
            <div>
              <h1 className="text-2xl font-normal text-foreground">Welcome back</h1>
              <p className="text-muted-foreground text-sm mt-1">Sign in to your admin dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-normal text-muted-foreground uppercase tracking-wide">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@realhubb.in"
                    className="w-full pl-10 pr-4 py-3 text-sm border border-input rounded-lg bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-normal text-muted-foreground uppercase tracking-wide">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-3 text-sm border border-input rounded-lg bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                    autoComplete="current-password"
                    required
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Submit */}
              <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-normal" size="lg">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Signing in…
                  </span>
                ) : "Sign In to Dashboard"}
              </Button>
            </form>

            <p className="text-center text-muted-foreground text-xs">🔒 Secured by Firebase Authentication</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
        .animate-shake { animation: shake 0.4s ease; }
      `}</style>
    </div>
  );
}