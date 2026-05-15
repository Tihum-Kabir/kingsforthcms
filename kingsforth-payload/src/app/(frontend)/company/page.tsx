import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Building2, Globe, Users, Trophy } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Company | Kingsforth',
    description: 'About Kingsforth Technologies.',
};

export default async function CompanyPage() {
    return (
        <div className="min-h-screen text-foreground relative z-10 pt-32 pb-24">
            <div className="max-w-4xl mx-auto text-center space-y-8 p-10 bg-white/70 dark:bg-black/75 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-white/10 transition-colors duration-700 mb-20 relative z-10">
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 transition-colors duration-700">
                    About <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-600 dark:from-violet-400 dark:to-cyan-400">Kingsforth</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light transition-colors duration-700">
                    We are building the autonomous infrastructure that secures the world's most critical environments.
                </p>
            </div>

            <div className="max-w-350 mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                <div className="bg-white/70 dark:bg-[#08080C]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-10 text-center hover:-translate-y-2 transition-all duration-500 shadow-xl">
                    <Building2 className="w-12 h-12 text-violet-500 mx-auto mb-4" />
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2">2014</h3>
                    <p className="text-slate-600 dark:text-gray-400 font-medium">Founded</p>
                </div>
                <div className="bg-white/70 dark:bg-[#08080C]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-10 text-center hover:-translate-y-2 transition-all duration-500 shadow-xl">
                    <Users className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2">500+</h3>
                    <p className="text-slate-600 dark:text-gray-400 font-medium">Team Members</p>
                </div>
                <div className="bg-white/70 dark:bg-[#08080C]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-10 text-center hover:-translate-y-2 transition-all duration-500 shadow-xl">
                    <Globe className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2">32</h3>
                    <p className="text-slate-600 dark:text-gray-400 font-medium">Global Offices</p>
                </div>
                <div className="bg-white/70 dark:bg-[#08080C]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-10 text-center hover:-translate-y-2 transition-all duration-500 shadow-xl">
                    <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2">1M+</h3>
                    <p className="text-slate-600 dark:text-gray-400 font-medium">Active Nodes</p>
                </div>
            </div>
        </div>
    );
}
