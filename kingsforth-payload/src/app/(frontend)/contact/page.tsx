import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactFormClient } from './ContactFormClient';

export const metadata = {
    title: 'Contact Us | Kingsforth',
    description: 'Get in touch with our security experts.',
};

export default async function ContactPage() {
    let contactInfo: any = null;
    try {
        const payload = await getPayload({ config: configPromise });
        try {
            const siteSettings = await payload.findGlobal({ slug: 'site-settings' });
            contactInfo = siteSettings?.contactInfo ?? null;
        } catch {}
    } catch {}

    return (
        <div className="min-h-screen text-foreground relative z-10 pt-32 pb-24">
            <div className="max-w-350 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">

                {/* Left Side: Info */}
                <div className="space-y-10 p-10 bg-white/70 dark:bg-[#03050C]/75 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 dark:border-white/10 transition-colors duration-700">
                    <div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 transition-colors duration-700">
                            Let&apos;s Talk <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-600 dark:from-violet-400 dark:to-cyan-400">Security</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-gray-300 font-light transition-colors duration-700">
                            Our team is ready to assist you with inquiries regarding our intelligence platforms, custom deployments, or support.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-inner">
                                <Mail className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-500 tracking-wider uppercase mb-1">Email</p>
                                <p className="text-xl font-medium text-slate-900 dark:text-white">{contactInfo?.email || 'contact@kingsforth.net'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-inner">
                                <Phone className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-500 tracking-wider uppercase mb-1">Phone</p>
                                <p className="text-xl font-medium text-slate-900 dark:text-white">{contactInfo?.phone || '+1 (555) 123-4567'}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-inner flex-shrink-0">
                                <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-500 tracking-wider uppercase mb-1">Location</p>
                                <p className="text-xl font-medium text-slate-900 dark:text-white whitespace-pre-line">{contactInfo?.address || '1 Kingsforth Plaza, Tech District'}</p>
                            </div>
                        </div>

                        {/* Google Maps embed if configured */}
                        {contactInfo?.map_embed && (
                            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 h-52">
                                <iframe
                                    src={contactInfo.map_embed.startsWith('<') ? undefined : contactInfo.map_embed}
                                    srcDoc={contactInfo.map_embed.startsWith('<') ? contactInfo.map_embed : undefined}
                                    className="w-full h-full grayscale"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Office location"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Live form connected to server action */}
                <div className="bg-white/70 dark:bg-[#03050C]/75 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 dark:border-white/10 transition-colors duration-700 h-fit">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 transition-colors duration-700">Send a Message</h2>
                    <ContactFormClient />
                </div>
            </div>
        </div>
    );
}
