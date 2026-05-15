'use client';

const logos = [
    { name: 'NSU', src: '/images/logos/NSU.png' },
    { name: 'Robi', src: '/images/logos/Robi.png' },
    { name: 'Banglalink', src: '/images/logos/Banglalink.png' },
    { name: 'ACI', src: '/images/logos/ACI.png' },
];

const allLogos = [...logos, ...logos, ...logos, ...logos];

export function InfiniteLogoScroll() {
    return (
        <section className="relative w-full pb-16 pt-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent pointer-events-none" />

            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10 text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="h-px w-16 bg-linear-to-r from-transparent to-white/20" />
                    <span className="text-[11px] font-semibold tracking-[0.25em] text-white/30 uppercase">
                        Trusted by Industry Pioneers
                    </span>
                    <div className="h-px w-16 bg-linear-to-l from-transparent to-white/20" />
                </div>
            </div>

            <div className="logo-scroll-mask relative w-full">
                <div className="logo-scroll-track flex gap-10 items-center">
                    {allLogos.map((logo, index) => (
                        <LogoCard key={index} name={logo.name} src={logo.src} />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
}

function LogoCard({ name, src }: { name: string; src: string }) {
    return (
        <div className="logo-card-base group shrink-0 relative flex items-center justify-center w-40 h-16 rounded-xl cursor-pointer transition-all duration-500">
            <div className="logo-card-glow absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="logo-card-border-hover absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={name}
                className="logo-img relative z-10 max-h-8 max-w-[120px] w-auto object-contain"
            />
        </div>
    );
}
