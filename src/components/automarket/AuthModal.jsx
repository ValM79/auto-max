import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AuthModal({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', fullName: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to backend
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Create an account</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full h-11 px-3 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full h-11 px-3 pr-10 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-primary leading-relaxed">
              At least 8 characters, one upper and lower character, one number and one symbol.
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Confirm password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full h-11 px-3 pr-10 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Full name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full h-11 px-3 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Marketing consent */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              To get the most from AutoMarket, we'll send you members-only updates via email, push notifications and on site messaging.{' '}
              <span className="text-primary">You can update your preferences at any time from your My AutoMarket page.</span>
            </p>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 border border-border rounded accent-primary"
              />
              <span className="text-sm font-medium text-foreground">Yes, I agree</span>
            </label>
          </div>

          {/* reCAPTCHA notice */}
          <div className="bg-secondary rounded-md px-4 py-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              This site is protected by reCAPTCHA and the{' '}
              <a href="#" className="text-primary hover:underline">Google Privacy Policy</a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
              apply.
            </p>
          </div>

          {/* Terms */}
          <p className="text-xs text-muted-foreground leading-relaxed">
            By clicking Continue, I agree to the{' '}
            <a href="#" className="text-primary hover:underline">AutoMarket Terms of Use</a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
          </p>

          {/* Submit */}
          <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg text-sm">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}