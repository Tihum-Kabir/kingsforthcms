'use client';

import { useState } from 'react';
import { updateUserProfile, logoutAction } from '@/app/actions/auth';
import { User, Phone, MapPin, LogOut, CheckCircle } from 'lucide-react';

interface ProfileData {
    id: string;
    name: string;
    phone: string;
    address: string;
    company?: number;
}

export default function ProfileClient({ user }: { user: ProfileData }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        
        try {
            const data = {
                name: formData.get('name') as string,
                phone: formData.get('phone') as string,
                address: formData.get('address') as string,
            };

            const result = await updateUserProfile(user.id, data);
            
            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch(err: any) {
            setError(err.message || "Failed to update profile");
        }
        setLoading(false);
    }

    async function handleLogout() {
        await logoutAction();
        window.location.href = '/login';
    }

    return (
        <form onSubmit={handleUpdate} className="space-y-6">
            {error && (
                <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
                    {error}
                </div>
            )}
            {success && (
                <div className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-500/30 rounded-xl text-green-700 dark:text-green-400 text-sm font-medium flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Profile successfully updated!
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Display Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input id="name" name="name" type="text" defaultValue={user.name} required className="w-full pl-11 pr-4 py-3 bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500" />
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input id="phone" name="phone" type="text" defaultValue={user.phone} className="w-full pl-11 pr-4 py-3 bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500" />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Physical Address</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input id="address" name="address" type="text" defaultValue={user.address} className="w-full pl-11 pr-4 py-3 bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6 border-t border-slate-200 dark:border-white/10">
                <button type="submit" disabled={loading} className="px-8 py-3 bg-linear-to-r from-violet-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-105 disabled:opacity-50">
                    {loading ? 'Saving...' : 'Save Profile Changes'}
                </button>
                <button type="button" onClick={handleLogout} className="px-8 py-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-xl hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2">
                    <LogOut className="w-5 h-5" /> Sign Out
                </button>
            </div>
        </form>
    );
}
