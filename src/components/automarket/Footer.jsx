import React from 'react';

const footerSections = [
{
  title: "AutoMax information",
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
}];


export default function Footer() {
  return (
    <footer className="bg-foreground text-white/70">
      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Top section: Logo + Links + App Download */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">

          {/* Logo + App Store buttons */}
          <div className="flex flex-col gap-4 w-full lg:w-1/5">
            <div className="flex items-center gap-2">
              <span className="text-white text-xl font-extrabold tracking-tight">AutoMax</span>
              <img
                src="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/ca07bfd68_generated_image.png"
                alt="AutoMarket Logo"
                className="w-6 h-6 object-contain"
                style={{ filter: 'invert(1) brightness(0.7)', mixBlendMode: 'screen' }} />
              
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-1">
              <p className="text-white/70 text-sm">Phone: <a href="tel:+35314490650" className="hover:text-white transition-colors">+353 1 4490650</a></p>
              <p className="text-white/70 text-sm">Email: <a href="mailto:support@automax.ie" className="hover:text-white transition-colors">support@automax.ie</a></p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </a>
              {/* TikTok */}
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>

            {/* Download our App */}
            <div>
              <p className="text-white text-sm font-semibold mb-3">Download our App</p>
              <div className="flex flex-row gap-2">
                {/* App Store badge */}
                <a href="#" className="flex items-center gap-2 bg-black border border-white/30 rounded-xl px-3 py-2 hover:opacity-80 transition-opacity">
                  <svg className="w-6 h-6 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <div className="text-white/60 text-[9px] leading-none tracking-wide uppercase">Download on the</div>
                    <div className="text-white text-sm font-bold leading-tight">App Store</div>
                  </div>
                </a>
                {/* Google Play badge */}
                <a href="#" className="flex items-center gap-2 bg-black border border-white/30 rounded-xl px-3 py-2 hover:opacity-80 transition-opacity">
                  <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M3.18 23.76c.3.17.64.24.99.19l13.12-7.57-2.83-2.83L3.18 23.76z" fill="#EA4335" />
                    <path d="M22.14 10.31L19.3 8.69l-3.16 3.16 3.16 3.16 2.87-1.65c.82-.47.82-1.58-.03-2.05z" fill="#FBBC04" />
                    <path d="M3.18.24C2.88.42 2.7.75 2.7 1.13v21.74c0 .38.18.71.48.89l13.28-11.86L3.18.24z" fill="#4285F4" />
                    <path d="M4.17.05L17.45 7.62l-3.17 3.17L4.17.05z" fill="#34A853" />
                  </svg>
                  <div>
                    <div className="text-white/60 text-[9px] leading-none tracking-wide uppercase">Get it on</div>
                    <div className="text-white text-sm font-bold leading-tight">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Nav link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full lg:w-4/5">
            {footerSections.map((section) =>
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
                      </li>);

                })}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40 text-center">© 2026 AutoMax. All rights reserved. Ireland's largest car marketplace.</p>
            
          </div>
        </div>

      </div>
    </footer>);

}