import React from 'react';

const footerSections = [
  {
    title: 'Buying',
    links: ['Used cars', 'New cars', 'Electric cars', 'Hybrid cars', 'Body types', 'Car finance']
  },
  {
    title: 'Selling',
    links: ['Sell my car', 'Value my car', 'Selling tips']
  },
  {
    title: 'Resources',
    links: ['Car reviews', 'Motoring advice', 'Car insurance', 'Dealers', 'Cartell vehicle check']
  },
  {
    title: 'Company',
    links: ['About us', 'Advertising', 'Careers', 'Contact us', 'Terms', 'Privacy policy']
  }
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-white/70">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold text-sm mb-4">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1">
              <span className="text-white text-xl font-extrabold tracking-tight">AutoMarket</span>
              <svg className="w-4 h-4 text-white mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </div>
            <p className="text-xs text-white/40 text-center">© 2026 AutoMarket. All rights reserved. Ireland's largest car marketplace.</p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                <a key={social} href="#" className="text-xs hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}