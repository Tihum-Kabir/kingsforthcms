'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { ChevronRight } from 'lucide-react';

declare global {
  interface Window {
    SwaggerUIBundle: any;
    SwaggerUIStandalonePreset: any;
  }
}

export default function DocsPage() {
  const initialized = useRef(false);

  const init = () => {
    if (initialized.current || !window.SwaggerUIBundle) return;
    initialized.current = true;

    window.SwaggerUIBundle({
      url: '/api/openapi',
      dom_id: '#swagger-ui',
      presets: [window.SwaggerUIBundle.presets.apis, window.SwaggerUIStandalonePreset],
      layout: 'StandaloneLayout',
      deepLinking: true,
      displayRequestDuration: true,
      persistAuthorization: true,
      filter: true,
      tryItOutEnabled: false,
      defaultModelsExpandDepth: 1,
      defaultModelExpandDepth: 1,
      docExpansion: 'list',
      syntaxHighlight: { activate: true, theme: 'agate' },
    });
  };

  useEffect(() => {
    if (window.SwaggerUIBundle) init();
  }, []);

  return (
    <>
      {/* Swagger UI CSS from CDN */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"
      />

      {/* Dark theme overrides */}
      <style>{`
        /* ── Base ─────────────────────────── */
        #swagger-root { background: #05080f; min-height: 100vh; }

        .swagger-ui { color: #c8d0e0; font-family: var(--font-sans, system-ui), sans-serif; }
        .swagger-ui .wrapper { max-width: 1200px; padding: 0 24px; }

        /* ── Topbar ───────────────────────── */
        .swagger-ui .topbar { display: none; }

        /* ── Info block ───────────────────── */
        .swagger-ui .info { margin: 0 0 32px; }
        .swagger-ui .info .title { color: #f0f4ff; font-size: 2rem; font-weight: 700; letter-spacing: -0.02em; }
        .swagger-ui .info .title small { font-size: 0.8rem; background: rgba(34,211,238,0.15); color: #22d3ee; border: 1px solid rgba(34,211,238,0.3); border-radius: 4px; padding: 2px 8px; margin-left: 10px; vertical-align: middle; }
        .swagger-ui .info p, .swagger-ui .info li, .swagger-ui .info a { color: #8898b0; }
        .swagger-ui .info a { color: #22d3ee; }
        .swagger-ui .info .base-url { color: #6b7a93; font-size: 13px; }

        /* ── Scheme server select ─────────── */
        .swagger-ui .scheme-container { background: #0a0f1c; box-shadow: none; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 12px 0; }
        .swagger-ui .schemes > label { color: #8898b0; }
        .swagger-ui select { background: #111827; border: 1px solid rgba(255,255,255,0.1); color: #c8d0e0; border-radius: 6px; }

        /* ── Filter ───────────────────────── */
        .swagger-ui .filter-container { background: #0a0f1c; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .swagger-ui .filter input { background: #111827; border: 1px solid rgba(255,255,255,0.1); color: #c8d0e0; border-radius: 6px; padding: 6px 12px; }
        .swagger-ui .filter input::placeholder { color: #4a5568; }

        /* ── Tags / Groups ────────────────── */
        .swagger-ui .opblock-tag {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          margin: 8px 0;
          padding: 0 16px;
          color: #f0f4ff;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          transition: background 0.2s;
        }
        .swagger-ui .opblock-tag:hover { background: rgba(34,211,238,0.04); }
        .swagger-ui .opblock-tag small { color: #6b7a93; font-weight: 400; }
        .swagger-ui .opblock-tag-section { margin: 4px 0; }

        /* ── Operation blocks ─────────────── */
        .swagger-ui .opblock {
          border-radius: 8px;
          margin: 4px 0;
          border: 1px solid rgba(255,255,255,0.07);
          background: #080d18;
        }
        .swagger-ui .opblock .opblock-summary { border: none; padding: 10px 16px; }
        .swagger-ui .opblock .opblock-summary-method { border-radius: 4px; font-size: 12px; font-weight: 700; min-width: 72px; text-align: center; padding: 4px 8px; }
        .swagger-ui .opblock .opblock-summary-path { color: #c8d0e0; font-size: 14px; }
        .swagger-ui .opblock .opblock-summary-path .view-line-link { display: none; }
        .swagger-ui .opblock .opblock-summary-description { color: #6b7a93; font-size: 13px; }

        /* GET */
        .swagger-ui .opblock.opblock-get { border-left: 3px solid #22d3ee; }
        .swagger-ui .opblock.opblock-get .opblock-summary-method { background: rgba(34,211,238,0.15); color: #22d3ee; }
        .swagger-ui .opblock.opblock-get .tab-header .tab-item.active h4 span::after { background: #22d3ee; }
        /* POST */
        .swagger-ui .opblock.opblock-post { border-left: 3px solid #4ade80; }
        .swagger-ui .opblock.opblock-post .opblock-summary-method { background: rgba(74,222,128,0.15); color: #4ade80; }
        /* PATCH */
        .swagger-ui .opblock.opblock-patch { border-left: 3px solid #fb923c; }
        .swagger-ui .opblock.opblock-patch .opblock-summary-method { background: rgba(251,146,60,0.15); color: #fb923c; }
        /* PUT */
        .swagger-ui .opblock.opblock-put { border-left: 3px solid #facc15; }
        .swagger-ui .opblock.opblock-put .opblock-summary-method { background: rgba(250,204,21,0.15); color: #facc15; }
        /* DELETE */
        .swagger-ui .opblock.opblock-delete { border-left: 3px solid #f87171; }
        .swagger-ui .opblock.opblock-delete .opblock-summary-method { background: rgba(248,113,113,0.15); color: #f87171; }

        /* ── Expanded block content ───────── */
        .swagger-ui .opblock .opblock-body { background: #080d18; border-top: 1px solid rgba(255,255,255,0.06); }
        .swagger-ui .opblock-description-wrapper p { color: #8898b0; }
        .swagger-ui .tab li { color: #6b7a93; }
        .swagger-ui .tab li.active { color: #22d3ee; }
        .swagger-ui .tab li button { color: inherit; }
        .swagger-ui .opblock-section-header { background: rgba(255,255,255,0.02); }
        .swagger-ui .opblock-section-header h4 { color: #8898b0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; }

        /* ── Parameters ───────────────────── */
        .swagger-ui table thead tr td, .swagger-ui table thead tr th { color: #6b7a93; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .swagger-ui .parameter__name { color: #c8d0e0; }
        .swagger-ui .parameter__type { color: #22d3ee; font-size: 11px; }
        .swagger-ui .parameter__in { color: #6b7a93; font-size: 11px; }
        .swagger-ui .parameter__deprecated { color: #f87171; }
        .swagger-ui .required:after { color: #f87171; }

        /* ── Input fields ─────────────────── */
        .swagger-ui input[type=text], .swagger-ui textarea {
          background: #111827;
          border: 1px solid rgba(255,255,255,0.1);
          color: #c8d0e0;
          border-radius: 6px;
        }
        .swagger-ui input[type=text]:focus, .swagger-ui textarea:focus {
          border-color: rgba(34,211,238,0.5);
          outline: none;
          box-shadow: 0 0 0 3px rgba(34,211,238,0.1);
        }

        /* ── Buttons ──────────────────────── */
        .swagger-ui .btn { border-radius: 6px; font-size: 13px; font-weight: 600; }
        .swagger-ui .btn.execute { background: #22d3ee; border-color: #22d3ee; color: #05080f; }
        .swagger-ui .btn.execute:hover { background: #06b6d4; border-color: #06b6d4; }
        .swagger-ui .btn.cancel { background: transparent; border-color: rgba(248,113,113,0.4); color: #f87171; }
        .swagger-ui .btn.authorize { background: rgba(34,211,238,0.1); border-color: rgba(34,211,238,0.4); color: #22d3ee; }
        .swagger-ui .btn.authorize svg { fill: #22d3ee; }
        .swagger-ui .btn.try-out__btn { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.15); color: #c8d0e0; }
        .swagger-ui .btn.try-out__btn:hover { background: rgba(255,255,255,0.1); }
        .swagger-ui .btn.btn-clear { background: transparent; border-color: rgba(255,255,255,0.15); color: #8898b0; }

        /* ── Responses ────────────────────── */
        .swagger-ui .responses-inner { background: #080d18; }
        .swagger-ui .response-col_status { color: #c8d0e0; }
        .swagger-ui .response-col_description { color: #8898b0; }
        .swagger-ui .response-control-media-type__accept-message { color: #6b7a93; }
        .swagger-ui table.responses-table td { border-bottom: 1px solid rgba(255,255,255,0.04); }

        /* ── Code / JSON ──────────────────── */
        .swagger-ui .microlight { background: #0d1424 !important; border-radius: 6px; padding: 12px; }
        .swagger-ui .highlight-code { background: #0d1424; border-radius: 6px; }
        .swagger-ui .highlight-code > .microlight { background: transparent !important; }

        /* ── Models section ───────────────── */
        .swagger-ui section.models { border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; margin: 24px 0; }
        .swagger-ui section.models h4 { color: #c8d0e0; }
        .swagger-ui .model-box { background: #0a0f1c; border-radius: 6px; }
        .swagger-ui .model { color: #c8d0e0; }
        .swagger-ui .model-title { color: #f0f4ff; font-weight: 600; }
        .swagger-ui .prop-type { color: #22d3ee; }
        .swagger-ui .prop-format { color: #a78bfa; }
        .swagger-ui .primitive { color: #4ade80; }

        /* ── Auth modal ───────────────────── */
        .swagger-ui .dialog-ux .modal-ux { background: #0d1424; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; }
        .swagger-ui .dialog-ux .modal-ux-header { background: #080d18; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .swagger-ui .dialog-ux .modal-ux-header h3 { color: #f0f4ff; }
        .swagger-ui .dialog-ux .modal-ux-content p { color: #8898b0; }
        .swagger-ui .dialog-ux .modal-ux-content h4 { color: #c8d0e0; }
        .swagger-ui .auth-container code { background: #111827; color: #22d3ee; padding: 2px 6px; border-radius: 4px; }

        /* ── Lock/auth icons ──────────────── */
        .swagger-ui .authorization__btn svg { fill: #22d3ee; opacity: 0.7; }
        .swagger-ui .authorization__btn.unlocked svg { opacity: 0.3; }

        /* ── Loading ──────────────────────── */
        .swagger-ui .loading-container { background: #05080f; }
        .swagger-ui .loading-container .loading::after { color: #22d3ee; }

        /* ── Scrollbars ───────────────────── */
        .swagger-ui ::-webkit-scrollbar { width: 6px; height: 6px; }
        .swagger-ui ::-webkit-scrollbar-track { background: #080d18; }
        .swagger-ui ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        .swagger-ui ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

        /* ── Standalone layout footer ─────── */
        .swagger-ui .swagger-ui .info .title { font-size: 1.5rem; }
        .swagger-ui footer { display: none; }

        /* ── Docs page layout ─────────────── */
        #swagger-root { background: #05080f; min-height: 100vh; }
        .docs-hero { max-width: 1200px; margin: 0 auto; padding: 48px 24px 32px; }
        .docs-hero-row { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 24px; }
        .docs-badge-row { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .docs-badge { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #22d3ee; background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.25); padding: 3px 10px; border-radius: 4px; }
        .docs-badge-ver { color: #3d4a5c; font-size: 13px; }
        .docs-title { color: #f0f4ff; font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; letter-spacing: -0.03em; margin: 0; line-height: 1.1; }
        .docs-subtitle { color: #6b7a93; margin-top: 12px; font-size: 15px; line-height: 1.6; max-width: 560px; }
        .docs-quickstart { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 16px 20px; min-width: 220px; }
        .docs-qs-label { color: #4a5568; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 8px; font-weight: 600; }
        .docs-qs-code { font-family: var(--font-mono, monospace); font-size: 12px; color: #22d3ee; line-height: 1.8; }
        .docs-qs-muted { color: #4a5568; }
        .docs-qs-link { display: flex; align-items: center; gap: 4px; color: #22d3ee; font-size: 12px; margin-top: 10px; text-decoration: none; }
        .docs-auth-note { margin-top: 24px; padding: 12px 16px; background: rgba(34,211,238,0.05); border: 1px solid rgba(34,211,238,0.15); border-radius: 8px; display: flex; align-items: flex-start; gap: 12px; }
        .docs-auth-icon { color: #22d3ee; font-size: 18px; line-height: 1; }
        .docs-auth-text { color: #6b7a93; font-size: 13px; margin: 0; line-height: 1.5; }
        .docs-auth-text strong { color: #c8d0e0; }
        .docs-auth-text code { background: rgba(255,255,255,0.06); padding: 1px 5px; border-radius: 3px; color: #22d3ee; font-family: monospace; }
        .docs-body { max-width: 1200px; margin: 0 auto; padding: 0 24px 80px; }
      `}</style>

      <div id="swagger-root">
        {/* Hero */}
        <div className="docs-hero">
          <div className="docs-hero-row">
            <div>
              <div className="docs-badge-row">
                <span className="docs-badge">REST API</span>
                <span className="docs-badge-ver">v1.0.0</span>
              </div>
              <h1 className="docs-title">Kingsforth Platform API</h1>
              <p className="docs-subtitle">
                Complete REST API for the Kingsforth Intelligence Platform. Authenticate via JWT and interact with all collections and globals.
              </p>
            </div>
            <div className="docs-quickstart">
              <p className="docs-qs-label">Quick start</p>
              <div className="docs-qs-code">
                <div><span className="docs-qs-muted">POST</span> /api/users/login</div>
                <div className="docs-qs-muted">→ Authorization: JWT &lt;token&gt;</div>
              </div>
              <a href="#operations-Auth-login" className="docs-qs-link">
                View login endpoint <ChevronRight size={12} />
              </a>
            </div>
          </div>

          {/* Auth note */}
          <div className="docs-auth-note">
            <span className="docs-auth-icon">ℹ</span>
            <p className="docs-auth-text">
              Click <strong>Authorize</strong> in the explorer below and enter{' '}
              <code>JWT &lt;your-token&gt;</code> to authenticate requests. Obtain a token from{' '}
              <code>POST /api/users/login</code>.
            </p>
          </div>
        </div>

        {/* Swagger UI mount point */}
        <div className="docs-body">
          <div id="swagger-ui" />
        </div>
      </div>

      {/* Swagger UI JS from CDN — load after page mounts */}
      <Script
        src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"
        strategy="lazyOnload"
        onLoad={init}
      />
      <Script
        src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js"
        strategy="lazyOnload"
        onLoad={init}
      />
    </>
  );
}
