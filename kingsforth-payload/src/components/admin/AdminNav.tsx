'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const C = {
  bg: 'rgb(4, 7, 20)',
  card: 'rgb(7, 12, 32)',
  border: 'rgb(22, 34, 72)',
  cyan: 'rgb(34, 211, 238)',
  cyanBg: 'rgba(34, 211, 238, 0.08)',
  cyanHover: 'rgba(34, 211, 238, 0.06)',
  textHi: 'rgb(220, 232, 252)',
  textMid: 'rgb(130, 155, 200)',
  textLo: 'rgb(72, 96, 140)',
  shadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,211,238,0.06)',
}

interface NavItem { label: string; href: string }

interface NavGroup {
  id: string
  label: string
  icon: string
  items: NavItem[]
}

const GROUPS: NavGroup[] = [
  {
    id: 'content', label: 'Content', icon: '✦',
    items: [
      { label: 'Services', href: '/admin/collections/services' },
      { label: 'Solutions', href: '/admin/collections/solutions' },
      { label: 'Resources', href: '/admin/collections/resources' },
      { label: 'Resource Sections', href: '/admin/collections/resource-sections' },
      { label: 'FAQs', href: '/admin/collections/faqs' },
      { label: 'Team Members', href: '/admin/collections/team-members' },
      { label: 'Partner Logos', href: '/admin/collections/partner-logos' },
    ],
  },
  {
    id: 'settings', label: 'Settings', icon: '◈',
    items: [
      { label: 'Product Features', href: '/admin/collections/product-features' },
      { label: 'How It Works', href: '/admin/collections/how-it-works-steps' },
      { label: 'Site Settings', href: '/admin/globals/site-settings' },
      { label: 'About Content', href: '/admin/globals/about-content' },
      { label: 'Pricing Config', href: '/admin/globals/pricing-config' },
    ],
  },
  {
    id: 'media', label: 'Media', icon: '⬡',
    items: [
      { label: 'Media Library', href: '/admin/collections/media' },
    ],
  },
  {
    id: 'crm', label: 'CRM', icon: '◎',
    items: [
      { label: 'Companies', href: '/admin/collections/companies' },
      { label: 'Subscriptions', href: '/admin/collections/subscriptions' },
      { label: 'Invoices', href: '/admin/collections/invoices' },
      { label: 'Leads', href: '/admin/collections/leads' },
      { label: 'Support Tickets', href: '/admin/collections/support-tickets' },
    ],
  },
  {
    id: 'system', label: 'System', icon: '⬟',
    items: [
      { label: 'Users', href: '/admin/collections/users' },
      { label: 'Analytics', href: '/admin/collections/analytics' },
      { label: 'Email Campaigns', href: '/admin/collections/email-campaigns' },
      { label: 'Audit Logs', href: '/admin/collections/audit-logs' },
    ],
  },
]

function FlyoutMenu({
  group,
  pos,
  pathname,
  onMouseEnter,
  onMouseLeave,
}: {
  group: NavGroup
  pos: { top: number; left: number }
  pathname: string | null
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  return createPortal(
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        zIndex: 99999,
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: '6px',
        minWidth: 210,
        boxShadow: C.shadow,
        animation: 'kf-fadein 0.1s ease',
      }}
    >
      <style>{`@keyframes kf-fadein { from { opacity:0; transform:translateX(-4px) } to { opacity:1; transform:translateX(0) } }`}</style>
      <div style={{
        padding: '6px 10px 8px',
        borderBottom: `1px solid ${C.border}`,
        marginBottom: 4,
      }}>
        <span style={{
          fontSize: 9.5,
          fontWeight: 800,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(34,211,238,0.45)',
        }}>
          {group.label}
        </span>
      </div>
      {group.items.map(item => (
        <FlyoutLink key={item.href} item={item} active={!!pathname?.startsWith(item.href)} />
      ))}
    </div>,
    document.body,
  )
}

function FlyoutLink({ item, active }: { item: NavItem; active: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={item.href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 10px',
        borderRadius: 7,
        fontSize: 13.5,
        fontWeight: active ? 600 : 400,
        color: active ? C.cyan : hov ? C.textHi : C.textMid,
        background: active ? C.cyanBg : hov ? 'rgba(255,255,255,0.04)' : 'transparent',
        textDecoration: 'none',
        transition: 'background 0.1s, color 0.1s',
        whiteSpace: 'nowrap',
      }}
    >
      {active && (
        <span style={{ width: 3, height: 14, borderRadius: 2, background: C.cyan, flexShrink: 0 }} />
      )}
      {item.label}
    </Link>
  )
}

function GroupRow({ group, pathname, collapsed }: { group: NavGroup; pathname: string | null; collapsed: boolean }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const rowRef = useRef<HTMLDivElement>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isActive = group.items.some(i => pathname?.startsWith(i.href))

  const show = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    if (rowRef.current) {
      const r = rowRef.current.getBoundingClientRect()
      setPos({ top: r.top - 2, left: r.right + 8 })
    }
    setOpen(true)
  }

  const hide = () => {
    leaveTimer.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={rowRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: collapsed ? '12px 0' : '10px 14px',
          margin: '1px 6px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderRadius: 9,
          cursor: 'default',
          background: open ? C.cyanHover : isActive ? C.cyanBg : 'transparent',
          color: isActive || open ? C.cyan : C.textMid,
          transition: 'background 0.15s, color 0.15s',
          userSelect: 'none',
        }}
      >
        <span style={{
          fontSize: 15,
          lineHeight: 1,
          width: 20,
          textAlign: 'center',
          flexShrink: 0,
          opacity: isActive || open ? 1 : 0.7,
          transition: 'opacity 0.15s',
        }}>
          {group.icon}
        </span>
        {!collapsed && (
          <>
            <span style={{ fontSize: 13.5, fontWeight: isActive ? 600 : 500, flex: 1, letterSpacing: '-0.01em' }}>
              {group.label}
            </span>
            <span style={{
              fontSize: 10,
              color: C.textLo,
              display: 'inline-block',
              transform: open ? 'rotate(90deg)' : 'none',
              transition: 'transform 0.2s ease',
            }}>›</span>
          </>
        )}
      </div>

      {open && (
        <FlyoutMenu
          group={group}
          pos={pos}
          pathname={pathname}
          onMouseEnter={() => { if (leaveTimer.current) clearTimeout(leaveTimer.current) }}
          onMouseLeave={hide}
        />
      )}
    </div>
  )
}

export function AdminNav() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('nav-collapsed', collapsed)
    return () => { document.body.classList.remove('nav-collapsed') }
  }, [collapsed])

  const isDash = pathname === '/admin' || pathname === '/admin/'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      background: C.bg,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: collapsed ? '14px 0' : '14px 16px 14px 14px',
        justifyContent: collapsed ? 'center' : 'space-between',
        borderBottom: `1px solid ${C.border}`,
        minHeight: 56,
      }}>
        {!collapsed && (
          <Link href="/admin" style={{
            fontSize: 14,
            fontWeight: 700,
            color: C.textHi,
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}>
            Kingsforth
          </Link>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(c => !c)}
          title={collapsed ? 'Expand' : 'Collapse'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: C.textMid,
            padding: '5px',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'color 0.15s',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="3" y="5" width="12" height="1.6" rx="0.8" fill="currentColor"/>
            <rect x="3" y="8.2" width={collapsed ? '12' : '8'} height="1.6" rx="0.8" fill="currentColor"/>
            <rect x="3" y="11.4" width="12" height="1.6" rx="0.8" fill="currentColor"/>
          </svg>
        </button>
      </div>

      {/* Dashboard link */}
      <div style={{ padding: '10px 8px 6px' }}>
        <Link
          href="/admin"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: collapsed ? '10px 0' : '10px 14px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            borderRadius: 9,
            fontSize: 13.5,
            fontWeight: isDash ? 700 : 500,
            color: isDash ? C.cyan : C.textMid,
            background: isDash ? C.cyanBg : 'transparent',
            textDecoration: 'none',
            transition: 'background 0.15s, color 0.15s',
            letterSpacing: '-0.01em',
          }}
        >
          <span style={{ fontSize: 14, width: 20, textAlign: 'center', flexShrink: 0 }}>⌂</span>
          {!collapsed && <span>Dashboard</span>}
        </Link>
        <div style={{ height: 1, background: C.border, margin: '8px 8px 0' }} />
      </div>

      {/* Nav groups */}
      <nav style={{ flex: 1, padding: '4px 0', overflow: 'hidden' }}>
        {GROUPS.map(group => (
          <GroupRow key={group.id} group={group} pathname={pathname} collapsed={collapsed} />
        ))}
      </nav>

      {/* Back to site */}
      <div style={{ padding: '8px 8px 10px', borderTop: `1px solid ${C.border}` }}>
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: collapsed ? '10px 0' : '9px 14px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            borderRadius: 9,
            fontSize: 12.5,
            color: C.textLo,
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
        >
          <span style={{ fontSize: 13, width: 20, textAlign: 'center', flexShrink: 0 }}>←</span>
          {!collapsed && <span>Back to Website</span>}
        </Link>
      </div>
    </div>
  )
}
