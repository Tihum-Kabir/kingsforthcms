'use client';

import { useState } from 'react';
import { Shield, Mail, Lock, User, CheckCircle, Phone, MapPin, KeyRound, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { loginAction, signupAction, sendVerificationCode, resetPasswordWithCode } from '@/app/actions/auth';

type AuthView = 'LOGIN' | 'SIGNUP' | 'FORGOT_REQUEST' | 'FORGOT_RESET' | 'SUCCESS';

export function LoginForm({ branding }: { branding?: { logoUrl?: string | null, siteName?: string | null } }) {
    const [view, setView] = useState<AuthView>('LOGIN');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // For password reset flow
    const [resetEmail, setResetEmail] = useState('');

    async function handleLoginSignup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            let result;
            if (view === 'SIGNUP') {
                const name = formData.get('name') as string;
                const phone = formData.get('phone') as string;
                const address = formData.get('address') as string;
                result = await signupAction(name, email, password, phone, address);
            } else {
                result = await loginAction(email, password);
            }

            if (result.error) {
                setError(result.error);
                setLoading(false);
                return;
            }

            setView('SUCCESS');
            setTimeout(() => {
                window.location.href = '/';
            }, 800);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
            setLoading(false);
        }
    }

    async function handleForgotRequest(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        setResetEmail(email);

        try {
            const result = await sendVerificationCode(email);
            if (result.error) {
                setError(result.error);
            } else {
                // Move to next step
                setView('FORGOT_RESET');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to send request');
        }
        setLoading(false);
    }

    async function handleForgotReset(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const code = formData.get('code') as string;
        const newPassword = formData.get('newPassword') as string;

        try {
            const result = await resetPasswordWithCode(resetEmail, code, newPassword);
            if (result.error) {
                setError(result.error);
            } else {
                setView('LOGIN');
                setError('');
                setSuccessMessage('Password reset successful. Please sign in with your new password.');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to reset password');
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen relative z-10 flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute top-32 left-20 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-32 right-20 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[120px] animate-pulse hero-orb-delay pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md my-20">
                {/* Dynamic Branding Header */}
                <Link href="/" className="flex items-center justify-center gap-3 mb-8">
                    {branding?.logoUrl ? (
                        <div className="h-12 w-auto relative flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={branding.logoUrl} alt={branding.siteName || "Kingsforth"} className="max-h-12 w-auto object-contain drop-shadow-md" />
                        </div>
                    ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
                            <Shield className="w-7 h-7 text-white" strokeWidth={2.5} />
                        </div>
                    )}
                    <span className="text-2xl font-black text-slate-900 dark:text-white transition-colors">
                        {branding?.siteName || "Kingsforth"}
                    </span>
                </Link>

                {successMessage && (
                    <div className="mb-6 p-4 bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-500/30 rounded-xl">
                        <p className="text-emerald-700 dark:text-emerald-400 text-sm font-medium">{successMessage}</p>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-500/30 rounded-xl">
                        <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
                    </div>
                )}

                {/* Form Card */}
                <div className="bg-white/80 dark:bg-[#08080A]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl transition-colors duration-700">
                    
                    {view === 'SUCCESS' && (
                        <div className="text-center py-10">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                                Welcome!
                            </h1>
                            <p className="text-slate-600 dark:text-gray-400">Taking you to the homepage...</p>
                        </div>
                    )}

                    {(view === 'LOGIN' || view === 'SIGNUP') && (
                        <>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">
                                {view === 'SIGNUP' ? 'Create Account' : 'Welcome Back'}
                            </h1>
                            <p className="text-slate-600 dark:text-gray-400 mb-8 transition-colors">
                                {view === 'SIGNUP'
                                    ? 'Sign up to access the Kingsforth platform'
                                    : 'Sign in to your account to continue'}
                            </p>

                            <form onSubmit={handleLoginSignup} className="space-y-4">
                                {view === 'SIGNUP' && (
                                    <>
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input id="name" name="name" type="text" required className="w-full pl-11 pr-4 py-3 bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-violet-500" placeholder="John Doe" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input id="phone" name="phone" type="text" required className="w-full pl-11 pr-4 py-3 bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-violet-500" placeholder="+1 (555) 000-0000" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Address</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input id="address" name="address" type="text" required className="w-full pl-11 pr-4 py-3 bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-violet-500" placeholder="123 Security Blvd, Dhaka" />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input id="email" name="email" type="email" required className="w-full pl-11 pr-4 py-3 bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-violet-500" placeholder="you@example.com" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-gray-300">Password</label>
                                        {view === 'LOGIN' && (
                                            <button type="button" onClick={() => { setView('FORGOT_REQUEST'); setError(''); }} className="text-xs text-violet-600 dark:text-violet-400 hover:underline">Forgot password?</button>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input id="password" name="password" type={showPassword ? "text" : "password"} required className="w-full pl-11 pr-12 py-3 bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-violet-500" placeholder="••••••••" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" disabled={loading} className="w-full py-3.5 mt-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg disabled:opacity-50">
                                    {loading ? 'Processing...' : (view === 'SIGNUP' ? 'Create Account' : 'Sign In')}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <button type="button" onClick={() => { setView(view === 'SIGNUP' ? 'LOGIN' : 'SIGNUP'); setError(''); setSuccessMessage(''); }} className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium">
                                    {view === 'SIGNUP' ? 'Already have an account? ' : "Don't have an account? "}
                                    <span className="text-violet-600 dark:text-violet-400 font-bold">{view === 'SIGNUP' ? 'Sign In' : 'Sign Up'}</span>
                                </button>
                            </div>
                        </>
                    )}

                    {view === 'FORGOT_REQUEST' && (
                        <>
                            <button type="button" onClick={() => setView('LOGIN')} className="flex items-center text-sm text-slate-500 hover:text-slate-800 dark:hover:text-white mb-6">
                                <ArrowLeft className="w-4 h-4 mr-1" /> Back to login
                            </button>
                            <div className="w-12 h-12 bg-violet-600/10 rounded-full flex items-center justify-center mb-4">
                                <KeyRound className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Reset Password</h1>
                            <p className="text-slate-600 dark:text-gray-400 mb-8 text-sm">Enter your email address and we'll send you a 6-digit verification code to reset your password.</p>

                            <form onSubmit={handleForgotRequest} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input id="email" name="email" type="email" required className="w-full pl-11 pr-4 py-3 bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-violet-500" placeholder="you@example.com" />
                                    </div>
                                </div>
                                <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold rounded-xl transition-all shadow-lg disabled:opacity-50">
                                    {loading ? 'Sending...' : 'Send Verification Code'}
                                </button>
                            </form>
                        </>
                    )}

                    {view === 'FORGOT_RESET' && (
                        <>
                             <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Verification Code Sent</h1>
                            <p className="text-slate-600 dark:text-gray-400 mb-8 text-sm">Check the email sent to <span className="font-semibold text-violet-400">{resetEmail}</span> and enter the 6-digit code below.</p>

                            <form onSubmit={handleForgotReset} className="space-y-4">
                                <div>
                                    <label htmlFor="code" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">6-Digit Code</label>
                                    <input id="code" name="code" type="text" maxLength={6} required className="w-full px-4 py-3 text-center tracking-[0.5em] font-mono text-xl bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500" placeholder="000000" />
                                </div>
                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input id="newPassword" name="newPassword" type={showPassword ? "text" : "password"} required className="w-full pl-11 pr-12 py-3 bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-violet-500" placeholder="••••••••" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold rounded-xl transition-all shadow-lg disabled:opacity-50">
                                    {loading ? 'Processing...' : 'Reset Password'}
                                </button>
                                
                                <div className="flex flex-col gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            setLoading(true);
                                            setError('');
                                            try {
                                                const result = await sendVerificationCode(resetEmail);
                                                if (result.error) setError(result.error);
                                            } catch (err: any) {
                                                setError(err.message || 'Failed to send request');
                                            }
                                            setLoading(false);
                                        }}
                                        disabled={loading}
                                        className="w-full py-2 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 font-medium text-center transition-colors"
                                    >
                                        Didn't receive code? Resend Email
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => setView('LOGIN')} 
                                        className="w-full py-2 text-sm text-slate-500 hover:text-slate-800 dark:hover:text-white text-center"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}
