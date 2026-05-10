import React, { useState } from 'react';
import { EyeOff } from 'lucide-react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';

function PasswordInput({ id, label, hint, value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className="w-full border border-input rounded px-3 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          tabIndex={-1}
        >
          <EyeOff className="w-5 h-5" />
        </button>
      </div>
      {hint && (
        <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#2563eb' }}>
          {hint}
        </p>
      )}
    </div>
  );
}

export default function CreateAccount() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    agreeMarketing: false,
  });

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-foreground mb-6">Create your account</h1>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={set('email')}
                className="w-full border border-input rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            {/* Password */}
            <PasswordInput
              id="password"
              label="Password"
              hint="At least 8 characters, one upper and lower character, one number and one symbol."
              value={form.password}
              onChange={set('password')}
            />

            {/* Confirm Password */}
            <PasswordInput
              id="confirmPassword"
              label="Confirm password"
              value={form.confirmPassword}
              onChange={set('confirmPassword')}
            />

            {/* Full Name */}
            <div className="mb-5">
              <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1.5">Full name</label>
              <input
                id="fullName"
                type="text"
                value={form.fullName}
                onChange={set('fullName')}
                className="w-full border border-input rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            {/* Marketing consent */}
            <div className="mb-5">
              <p className="text-sm text-foreground leading-relaxed mb-3">
                To get the most from AutoMarket, we'll send you members-only updates via email,{' '}
                <span style={{ color: '#2563eb' }}>push notifications</span> and on site messaging. You can{' '}
                <span style={{ color: '#2563eb' }}>update your preferences</span> at any time from your My AutoMarket page.
              </p>
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="agreeMarketing"
                  checked={form.agreeMarketing}
                  onChange={(e) => setForm((f) => ({ ...f, agreeMarketing: e.target.checked }))}
                  className="w-4 h-4 border border-input rounded accent-primary cursor-pointer"
                />
                <label htmlFor="agreeMarketing" className="text-sm font-medium cursor-pointer">
                  Yes, I agree
                </label>
              </div>
            </div>

            {/* reCAPTCHA notice */}
            <div className="bg-secondary/60 rounded px-4 py-3 mb-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                This site is protected by reCAPTCHA and the{' '}
                <a href="#" style={{ color: '#2563eb' }} className="hover:underline">Google Privacy Policy</a>{' '}
                and{' '}
                <a href="#" style={{ color: '#2563eb' }} className="hover:underline">Terms of Services apply</a>
              </p>
            </div>

            {/* Terms */}
            <p className="text-xs text-foreground mb-5 leading-relaxed">
              By clicking Continue, I agree to the{' '}
              <a href="#" style={{ color: '#2563eb' }} className="hover:underline">AutoMarket Terms of Use</a>{' '}
              and{' '}
              <a href="#" style={{ color: '#2563eb' }} className="hover:underline">Privacy Policy</a>
            </p>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded text-white font-semibold text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#2563eb' }}
            >
              Continue
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}