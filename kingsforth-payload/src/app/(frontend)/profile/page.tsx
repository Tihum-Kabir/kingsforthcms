import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileClient from '@/components/profile/ProfileClient';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export default async function ProfilePage() {
    let user: any = null;
    try {
        const payload = await getPayload({ config: configPromise });
        const reqHeaders = await headers();
        const authResult = await payload.auth({ headers: reqHeaders });
        user = authResult?.user ?? null;
    } catch {}

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen relative z-10 flex flex-col items-center p-4 pt-24">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="w-full max-w-4xl relative z-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Command Center</h1>
                    {user.role === 'SUPER_ADMIN' && (
                        <Link href="/admin" className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2">
                            <Shield className="w-4 h-4" /> Go to Admin Panel
                        </Link>
                    )}
                </div>

                <div className="bg-white/80 dark:bg-[#08080A]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center gap-6 mb-10 pb-10 border-b border-slate-200 dark:border-white/10">
                        <div className="w-24 h-24 bg-linear-to-br from-violet-600 to-cyan-600 rounded-full flex items-center justify-center text-3xl font-bold text-white uppercase shadow-lg">
                            {user.name ? user.name.charAt(0) : 'U'}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                            <p className="text-slate-500 dark:text-gray-400">{user.email}</p>
                            <div className="mt-2 inline-flex items-center px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 text-xs font-bold rounded-full uppercase tracking-wider">
                                ROLE: {user.role}
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Profile Settings</h3>
                    
                    {/* Pass the serializable user object to the Client Component */}
                    <ProfileClient user={{
                        id: String(user.id),
                        name: String(user.name || ''),
                        phone: String(user.phone || ''),
                        address: String(user.address || ''),
                        company: user.company ? Number(typeof user.company === 'object' ? user.company.id : user.company) : undefined
                    }} />

                </div>
            </div>
        </div>
    );
}
