"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    // Default dark before mount — matches defaultTheme="dark", avoids div→button element swap
    const isDark = !mounted || resolvedTheme === "dark"

    return (
        <button
            type="button"
            onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
            className="group relative flex items-center justify-center p-2.5 rounded-full overflow-hidden transition-all duration-700 bg-white/5 hover:bg-white/10 border border-black/5 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-md"
            title={isDark ? "Activate Day Mode" : "Activate Night Protocol"}
        >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,var(--sunMoon)_0%,transparent_70%)] blur-md" />
            <div className="relative z-10">
                <Sun
                    className={`h-[1.4rem] w-[1.4rem] transition-all duration-700 ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100 text-amber-500 drop-shadow-[0_0_8px_#f59e0b]'}`}
                />
                <Moon
                    className={`absolute top-0 left-0 h-[1.4rem] w-[1.4rem] transition-all duration-700 ${!isDark ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100 text-cyan-300 drop-shadow-[0_0_8px_#67e8f9]'}`}
                />
            </div>
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
