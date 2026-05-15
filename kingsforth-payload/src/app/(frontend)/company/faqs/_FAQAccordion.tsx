'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

function FAQItem({ faq }: { faq: FAQItem }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white/70 dark:bg-black/50 backdrop-blur-xl transition-colors duration-700">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
                <span className="font-semibold text-slate-900 dark:text-white text-lg pr-4 transition-colors duration-700">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 text-violet-600 dark:text-violet-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="px-6 pb-6 text-slate-600 dark:text-gray-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4 transition-colors duration-700">
                    {faq.answer}
                </div>
            )}
        </div>
    );
}

export function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
    return (
        <div className="space-y-4">
            {faqs.map((faq) => (
                <FAQItem key={faq.question} faq={faq} />
            ))}
        </div>
    );
}
