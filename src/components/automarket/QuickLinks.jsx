import React from 'react';
import { Shield, Wallet, FileCheck } from 'lucide-react';

const links = [
  { label: 'Cartell Vehicle Check', icon: FileCheck },
  { label: 'Car Finance', icon: Wallet },
  { label: 'Car Insurance', icon: Shield },
];

export default function QuickLinks() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-3 flex justify-end">
      <div className="flex gap-2">
        {links.map((link) => (
          <button
            key={link.label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            <link.icon className="w-3.5 h-3.5" />
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}