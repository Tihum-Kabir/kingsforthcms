import { HowItWorksClient } from './HowItWorksClient';

export function HowItWorks({ settings, steps: propSteps }: { settings?: any, steps?: any[] }) {
    const sanitizeColor = (color?: string) => {
        if (!color) return 'from-blue-600 to-cyan-500';
        if (color.includes('tertiary')) return 'from-violet-600 to-indigo-500';
        if (color.includes('secondary')) return 'from-fuchsia-600 to-pink-500';
        if (color.includes('primary')) return 'from-blue-600 to-cyan-500';
        return color;
    };

    let steps = propSteps?.map(s => ({
        ...s,
        step_number: s.stepNumber || '01',
        icon_name: s.iconName || 'Shield',
        color_theme: sanitizeColor(s.colorTheme),
        mediaUrl: s.media?.url,
        mediaType: s.mediaType || 'image',
        mediaFit: s.mediaFit || 'cover',
    }));


    // Fallback if DB is empty
    if (!steps || steps.length === 0) {
        // Fallback data structure for SSG/Reliability
        steps = [
            { id: '1', title: 'The Event', description: 'Kingseye detects an unauthorized entry at a remote facility', step_number: '01', icon_name: 'AlertCircle', color_theme: 'from-blue-600 to-cyan-500' },
            { id: '2', title: 'The Analysis', description: 'AI processes threat level, location, and optimal response protocol', step_number: '02', icon_name: 'Zap', color_theme: 'from-violet-600 to-indigo-500' },
            { id: '3', title: 'The Action', description: 'Automatically locks down Zone B, triggers perimeter lighting, initiates drone flyover', step_number: '03', icon_name: 'Shield', color_theme: 'from-fuchsia-600 to-pink-500' },
            { id: '4', title: 'The Result', description: 'Threat neutralized in < 60 seconds without risking a single human life', step_number: '04', icon_name: 'CheckCircle', color_theme: 'from-emerald-500 to-teal-400' }
        ];
    }

    return <HowItWorksClient steps={steps} settings={settings} />;
}
