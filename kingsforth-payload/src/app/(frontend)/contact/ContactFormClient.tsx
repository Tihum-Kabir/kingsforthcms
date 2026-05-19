'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { sendContactEmail } from '@/app/actions/contact';
import { Send, CheckCircle } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-lg rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-violet-600 dark:hover:bg-violet-400 hover:text-white transition-colors duration-500 shadow-xl disabled:opacity-50"
        >
            {pending ? 'Sending...' : 'Submit Inquiry'} <Send className="w-5 h-5" />
        </button>
    );
}

export function ContactFormClient() {
    const [state, formAction] = useActionState(sendContactEmail, null);

    if (state?.success) {
        return (
            <div className="text-center py-12 space-y-4">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
                <p className="text-slate-600 dark:text-gray-400">{state.message}</p>
            </div>
        );
    }

    return (
        <form action={formAction} className="space-y-6">
            {state?.message && !state.success && (
                <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-500/30 rounded-xl">
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">{state.message}</p>
                </div>
            )}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Full Name *</label>
                <input
                    name="name"
                    type="text"
                    required
                    className="w-full bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none transition-colors duration-700"
                    placeholder="John Doe"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Email Address *</label>
                <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none transition-colors duration-700"
                    placeholder="john@example.com"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Company</label>
                    <input
                        name="company"
                        type="text"
                        className="w-full bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none transition-colors duration-700"
                        placeholder="Acme Corp"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Phone</label>
                    <input
                        name="phone"
                        type="tel"
                        className="w-full bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none transition-colors duration-700"
                        placeholder="+880 1XXX-XXXXXX"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Message *</label>
                <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none transition-colors duration-700 resize-none"
                    placeholder="How can we help?"
                />
            </div>
            <SubmitButton />
        </form>
    );
}
