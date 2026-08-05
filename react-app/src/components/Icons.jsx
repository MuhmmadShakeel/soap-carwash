import React from 'react'

const Icon = ({ children, size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>
)

export const ArrowRight = p => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
export const ArrowUp = p => <Icon {...p}><path d="m6 11 6-6 6 6M12 5v14" /></Icon>
export const Check = p => <Icon {...p}><path d="m5 12 4 4L19 6" /></Icon>
export const ChevronDown = p => <Icon {...p}><path d="m6 9 6 6 6-6" /></Icon>
export const ChevronLeft = p => <Icon {...p}><path d="m15 18-6-6 6-6" /></Icon>
export const ChevronRight = p => <Icon {...p}><path d="m9 18 6-6-6-6" /></Icon>
export const Menu = p => <Icon {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>
export const X = p => <Icon {...p}><path d="M6 6l12 12M18 6 6 18" /></Icon>
export const Search = p => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></Icon>
export const MapPin = p => <Icon {...p}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></Icon>
export const Phone = p => <Icon {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" /></Icon>
export const Mail = p => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>
export const Clock3 = p => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>
export const Wifi = p => <Icon {...p}><path d="M5 12.5a10 10 0 0 1 14 0M8 16a6 6 0 0 1 8 0M2 9a14 14 0 0 1 20 0" /><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" /></Icon>
export const Coffee = p => <Icon {...p}><path d="M4 8h13v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z" /><path d="M17 10h2a2 2 0 0 1 0 4h-2M7 3v2M11 3v2M15 3v2" /></Icon>
export const MonitorPlay = p => <Icon {...p}><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4m-2-12 5 3-5 3V9Z" /></Icon>
export const Smile = p => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></Icon>
export const Sparkles = p => <Icon {...p}><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Zm14-1 .8 2.2 2.2.8-2.2.8L19 19l-.8-2.2L16 16l2.2-.8L19 13Z" /></Icon>
export const Droplets = p => <Icon {...p}><path d="M7 3S3 8 3 12a4 4 0 0 0 8 0c0-4-4-9-4-9Zm10 5s-3 4-3 7a3 3 0 0 0 6 0c0-3-3-7-3-7Z" /></Icon>
export const Leaf = p => <Icon {...p}><path d="M20 4C10 4 4 9 4 16c0 2 1 4 3 4 7 0 12-6 13-16Z" /><path d="M5 19c3-4 7-7 12-10" /></Icon>
export const ShieldCheck = p => <Icon {...p}><path d="M12 3 4 6v5c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-3Z" /><path d="m8 12 2.5 2.5L16 9" /></Icon>
export const Sun = p => <Icon {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Icon>
export const MoonStar = p => <Icon {...p}><path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" /><path d="m18 3 .4 1.2 1.1.4-1.1.4-.4 1.2-.4-1.2-1.1-.4 1.1-.4L18 3Z" /></Icon>
export const Instagram = p => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" /></Icon>
export const Facebook = p => <Icon {...p}><path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.5c-.6-.1-1.8-.2-3-.2-3 0-5 1.9-5 5.3V9H7v4h3v8" /></Icon>
