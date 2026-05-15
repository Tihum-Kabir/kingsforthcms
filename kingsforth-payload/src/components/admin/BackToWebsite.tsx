import React from 'react';
import Link from 'next/link';

export const BackToWebsite: React.FC = () => {
    return (
        <div style={{ margin: '0 20px', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Link 
                href="/"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: 'rgba(34,211,238,0.1)',
                    color: '#22d3ee',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(34,211,238,0.2)'
                }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 19-7-7 7-7"/>
                    <path d="M19 12H5"/>
                </svg>
                Back to Website
            </Link>
        </div>
    );
};
