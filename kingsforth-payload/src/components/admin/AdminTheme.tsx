'use client'

import React from 'react'

export function AdminTheme({ children }: { children: React.ReactNode }) {
    return (
        <>
            <style>{`
/* ═══════════════════════════════════════════════
   KINGSFORTH ADMIN — Dark Navy Theme
   Matches the Kingsforth site dark aesthetic.
   Payload's native dark theme base-0=white text works correctly here.
═══════════════════════════════════════════════ */

:root { color-scheme: dark; }

/* Override Payload's CSS variables with our navy brand palette */
[data-theme="dark"], [data-theme="light"], :root {
  --color-base-0:    255,255,255;
  --color-base-50:   241,245,249;
  --color-base-100:  203,213,225;
  --color-base-150:  148,163,184;
  --color-base-200:  100,116,139;
  --color-base-250:  71, 85,105;
  --color-base-300:  51, 65, 85;
  --color-base-400:  30, 41, 59;
  --color-base-500:  22, 31, 50;
  --color-base-600:  15, 23, 42;
  --color-base-700:  10, 17, 32;
  --color-base-800:   8, 13, 26;
  --color-base-850:   6, 10, 20;
  --color-base-900:   4,  7, 16;
  --color-base-950:   2,  4, 10;
  --color-base-1000:  0,  0,  0;
  --color-success-500: 16,185,129;
  --color-error-500:  239, 68, 68;
  --color-warning-500:245,158, 11;
}

/* ─── Global background ─── */
body, html {
  background: #060d1a !important;
  color: #e2e8f0 !important;
}
.template-default {
  display: flex !important;
  height: 100% !important;
}
.template-default__wrap {
  flex: 1 1 0% !important;
  min-width: 0 !important;
  overflow-x: hidden !important;
  background: #060d1a !important;
}

/* ─── Header ─── */
.app-header {
  background: #0a1628 !important;
  border-bottom: 1px solid rgba(34,211,238,0.12) !important;
  box-shadow: 0 1px 12px rgba(0,0,0,0.4) !important;
}

/* ─── Sidebar ─── */
.nav {
  background: #080f1e !important;
  border-right: 1px solid rgba(34,211,238,0.08) !important;
  flex-shrink: 0 !important;
}
.nav__label {
  color: #22d3ee !important;
  font-size: 10px !important;
  font-weight: 800 !important;
  letter-spacing: 0.18em !important;
  text-transform: uppercase !important;
  padding-top: 20px !important;
  opacity: 0.7 !important;
}
.nav__link {
  border-radius: 7px !important;
  margin: 2px 8px !important;
  padding: 9px 14px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #94a3b8 !important;
  transition: background 0.15s ease, color 0.15s ease !important;
}
.nav__link:hover {
  background: rgba(34,211,238,0.08) !important;
  color: #e2e8f0 !important;
}
.nav__link--active, .nav__link[aria-current="page"] {
  background: rgba(34,211,238,0.12) !important;
  color: #22d3ee !important;
  font-weight: 600 !important;
}

/* ─── Field labels & descriptions ─── */
.field-label, label {
  color: #94a3b8 !important;
  font-size: 13px !important;
  font-weight: 600 !important;
}
.field-description { color: #64748b !important; font-size: 12px !important; }

/* ─── Inputs ─── */
.text-input, .textarea-input,
input[type="text"], input[type="email"],
input[type="number"], input[type="password"],
textarea, select, .rs__control {
  background: #0d1a2e !important;
  border-color: rgba(148,163,184,0.15) !important;
  color: #e2e8f0 !important;
  border-radius: 7px !important;
  font-size: 14px !important;
}
.text-input:focus, textarea:focus, input:focus {
  border-color: #22d3ee !important;
  box-shadow: 0 0 0 3px rgba(34,211,238,0.12) !important;
  outline: none !important;
}

/* ─── Buttons ─── */
.btn--style-primary {
  background: #22d3ee !important;
  border: 1px solid #06b6d4 !important;
  color: #060d1a !important;
  border-radius: 7px !important;
  font-size: 14px !important;
  font-weight: 700 !important;
}
.btn--style-primary:hover {
  background: #06b6d4 !important;
  border-color: #0891b2 !important;
  color: #060d1a !important;
}
.btn--style-primary *,
.btn--style-primary:hover * {
  color: #060d1a !important;
  fill: #060d1a !important;
}

.btn--style-secondary {
  background: rgba(148,163,184,0.08) !important;
  border: 1px solid rgba(148,163,184,0.2) !important;
  color: #cbd5e1 !important;
  border-radius: 7px !important;
  font-size: 14px !important;
}
.btn--style-secondary:hover {
  background: rgba(148,163,184,0.14) !important;
  border-color: rgba(148,163,184,0.3) !important;
  color: #f1f5f9 !important;
}
.btn--style-secondary:hover * { color: inherit !important; }

.btn--style-none {
  color: #64748b !important;
  background: transparent !important;
  opacity: 1 !important;
}
.btn--style-none:hover {
  color: #ef4444 !important;
  background: rgba(239,68,68,0.08) !important;
}

/* ─── Upload / file fields ─── */
.upload-relationship-details, .file-details, [class*="file-meta"] {
  background: #0d1a2e !important;
  border: 1px solid rgba(148,163,184,0.15) !important;
  border-radius: 8px !important;
  color: #e2e8f0 !important;
}

/* Remove/clear button on uploaded file rows — make always visible in red */
/* Targets BEM class names AND any button inside the file display row */
.field-type.upload .btn--style-none,
.field-type.upload .btn--icon-style-without-border,
.field-type.upload button:not(.btn--style-primary):not(.btn--style-secondary),
[class*="upload"] .btn--style-none,
[class*="upload"] .btn--icon-style-without-border,
[class*="upload"] button:not(.btn--style-primary):not(.btn--style-secondary),
.upload-relationship-details .btn,
.upload-relationship-details button,
.upload-relationship-details .btn--style-none,
.upload-relationship-details .btn--icon-style-without-border,
.file-details .btn,
.file-details button {
  color: #ef4444 !important;
  background: rgba(239,68,68,0.1) !important;
  border: 1px solid rgba(239,68,68,0.25) !important;
  border-radius: 6px !important;
  opacity: 1 !important;
  visibility: visible !important;
  padding: 4px 8px !important;
}
.field-type.upload .btn--style-none svg,
.field-type.upload .btn--icon-style-without-border svg,
[class*="upload"] .btn--style-none svg,
[class*="upload"] button svg,
.upload-relationship-details button svg,
.upload-relationship-details button svg path {
  color: #ef4444 !important;
  stroke: #ef4444 !important;
  fill: none !important;
}

/* ─── Table / list view ─── */
.table {
  border-radius: 10px !important;
  overflow: hidden !important;
  border: 1px solid rgba(148,163,184,0.1) !important;
  background: #0a1628 !important;
}
.table thead tr {
  background: #0d1a2e !important;
  border-bottom: 1px solid rgba(148,163,184,0.1) !important;
}
.table th {
  color: #22d3ee !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
}
.table tbody tr {
  border-bottom: 1px solid rgba(148,163,184,0.06) !important;
  background: #0a1628 !important;
}
.table tbody tr:hover { background: #0f1f36 !important; }
.table td, .table td * { color: #cbd5e1 !important; font-size: 14px !important; }
.table tbody tr:hover td,
.table tbody tr:hover td * { color: #f1f5f9 !important; }
.table tbody tr .cell-link,
.table tbody tr a { color: #94a3b8 !important; }
.table tbody tr:hover .cell-link,
.table tbody tr:hover a { color: #22d3ee !important; }

/* ─── Dashboard cards ─── */
.dashboard__card-list a {
  background: #0a1628 !important;
  border: 1px solid rgba(148,163,184,0.1) !important;
  border-radius: 10px !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease !important;
}
.dashboard__card-list a:hover {
  background: #0f1f36 !important;
  border-color: rgba(34,211,238,0.25) !important;
  box-shadow: 0 4px 20px rgba(34,211,238,0.08) !important;
  transform: translateY(-1px) !important;
}
.dashboard__card-list h3,
.dashboard__card-list a h3 { color: #e2e8f0 !important; font-size: 14px !important; font-weight: 600 !important; }
.dashboard__card-list a * { color: #94a3b8 !important; }
.dashboard__card-list a:hover * { color: #e2e8f0 !important; }
.dashboard__card-list a:hover h3 { color: #22d3ee !important; }

/* ─── Breadcrumbs ─── */
.step-nav__step a, .step-nav__step span { color: #64748b !important; font-size: 13px !important; }
.step-nav__step--last span { color: #e2e8f0 !important; }

/* ─── Select dropdowns ─── */
.rs__menu {
  background: #0d1a2e !important;
  border: 1px solid rgba(148,163,184,0.15) !important;
  border-radius: 8px !important;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
}
.rs__option--is-focused { background: rgba(34,211,238,0.08) !important; }
.rs__option--is-selected { background: rgba(34,211,238,0.16) !important; color: #22d3ee !important; }
.rs__single-value { color: #e2e8f0 !important; }
.rs__placeholder { color: #475569 !important; }

/* ─── Rich text editor ─── */
.rich-text {
  border: 1px solid rgba(148,163,184,0.15) !important;
  border-radius: 7px !important;
  background: #0d1a2e !important;
}

/* ─── Popup / drawer ─── */
.popup__content, .drawer__content {
  background: #0a1628 !important;
  border: 1px solid rgba(148,163,184,0.12) !important;
  border-radius: 10px !important;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6) !important;
}

/* ─── Icon buttons ─── */
.btn--icon-style-without-border:not(.btn--style-primary):not(.btn--style-secondary) {
  color: #64748b !important;
  opacity: 1 !important;
}
.btn--icon-style-without-border:not(.btn--style-primary):not(.btn--style-secondary):hover {
  color: #e2e8f0 !important;
  background: rgba(148,163,184,0.1) !important;
}

/* ─── High-specificity btn text fixes ─── */
html body .btn { color: #cbd5e1 !important; }
html body .btn:hover { color: #f1f5f9 !important; }
html body .btn--style-primary,
html body .btn--style-primary:hover { color: #060d1a !important; background: #22d3ee !important; }
html body .btn--style-primary:hover { background: #06b6d4 !important; }
html body .btn--style-primary .btn__content,
html body .btn--style-primary .btn__label,
html body .btn--style-primary span,
html body .btn--style-primary:hover .btn__content,
html body .btn--style-primary:hover .btn__label,
html body .btn--style-primary:hover span { color: #060d1a !important; }

/* ─── Scrollbars ─── */
* { scrollbar-width: thin; scrollbar-color: rgba(34,211,238,0.2) transparent; }
*::-webkit-scrollbar { width: 5px; height: 5px; }
*::-webkit-scrollbar-track { background: transparent; }
*::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.15); border-radius: 99px; }
*::-webkit-scrollbar-thumb:hover { background: rgba(34,211,238,0.35); }
`}</style>
            {children}
        </>
    )
}
