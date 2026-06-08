import React from 'react';

const quickLinks = [
  { label: 'Cartell Vehicle Check', href: 'https://cartell.ie' },
  { label: 'Car Finance', href: '#' },
  { label: 'Car Insurance', href: '/car-insurance' },
];

export default function QuickLinks() {
  return (
    <div className="flex flex-wrap gap-2 justify-center py-4">
      {quickLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="border border-border rounded-full px-4 py-1.5 text-xs text-foreground hover:bg-secondary transition-colors"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}