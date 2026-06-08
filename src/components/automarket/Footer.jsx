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
      <div className="max-w-7xl mx-auto px-16 py-16">

        {/* Top section: Logo + Links + App Download */}
        <div className="flex flex-col lg:flex-row gap-16 mb-10">

          {/* Logo + App Store buttons */}
          <div className="flex flex-col gap-5 w-full lg:w-1/3">
            <div className="flex items-center gap-2">
              <span className="text-white text-xl font-extrabold tracking-tight">AutoMax</span>
              <img
                src="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/ca07bfd68_generated_image.png"
                alt="AutoMarket Logo"
                className="w-6 h-6 object-contain"
                style={{ filter: 'invert(1) brightness(0.7)', mixBlendMode: 'screen' }}
              />
            </div>

            {/* Download our App */}
            <div>
              <p className="text-white text-sm font-semibold mb-3">Download our App</p>
              <div className="flex flex-col gap-2">
                <a
                  href="#"
                  className="flex items-center gap-3 bg-black border border-white/20 rounded-lg px-4 py-2 hover:bg-white/10 transition-colors w-44"
                >
                  <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <div className="text-white/60 text-[9px] leading-none">Download on the</div>
                    <div className="text-white text-sm font-semibold leading-tight">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 bg-black border border-white/20 rounded-lg px-4 py-2 hover:bg-white/10 transition-colors w-44"
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M3.18 23.76c.3.17.64.24.99.19l13.12-7.57-2.83-2.83L3.18 23.76z" fill="#EA4335"/>
                    <path d="M22.14 10.31L19.3 8.69l-3.16 3.16 3.16 3.16 2.87-1.65c.82-.47.82-1.58-.03-2.05z" fill="#FBBC04"/>
                    <path d="M3.18.24C2.88.42 2.7.75 2.7 1.13v21.74c0 .38.18.71.48.89l13.28-11.86L3.18.24z" fill="#4285F4"/>
                    <path d="M4.17.05L17.45 7.62l-3.17 3.17L4.17.05z" fill="#34A853"/>
                  </svg>
                  <div>
                    <div className="text-white/60 text-[9px] leading-none">GET IT ON</div>
                    <div className="text-white text-sm font-semibold leading-tight">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Nav link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full lg:w-2/3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-white font-semibold text-sm mb-4">{section.title}</h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => {
                    let href = '#';
                    if (link === 'Cartell vehicle check') href = 'https://cartell.ie';
                    return (
                      <li key={link}>
                        <a href={href} target={href !== '#' ? '_blank' : undefined} rel={href !== '#' ? 'noopener noreferrer' : undefined} className="text-sm hover:text-white transition-colors">
                          {link}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40 text-center">© 2026 AutoMax. All rights reserved. Ireland's largest car marketplace.</p>
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