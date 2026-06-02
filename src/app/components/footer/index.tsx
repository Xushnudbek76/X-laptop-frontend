const footerLinks = {
  Company: ["About us", "Careers", "Press", "Blog"],
  Products: ["Laptops", "Gaming", "Business", "Accessories"],
  Support: ["Help center", "Warranty", "Returns", "Contact"],
};

const socials = [
  {
    label: "Twitter",
    path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
  },
  {
    label: "LinkedIn",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  },
  {
    label: "GitHub",
    path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
  },
  { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" },
];

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <div className="app-footer__grid">
          <div>
            <h2 className="app-footer__brand-title">
              X<span className="app-navbar__logo-accent">-</span>LAPTOP
            </h2>
            <p className="app-footer__brand-copy">
              Your trusted destination for premium laptops. Cutting-edge technology, expert
              reviews, and unbeatable deals - all in one place.
            </p>

            <div className="app-footer__email-row">
              <div className="app-footer__email-icon">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <a href="mailto:xushnudbek76n@gmail.com" className="app-footer__email-link">
                xushnudbek76n@gmail.com
              </a>
            </div>

            <div className="app-footer__socials">
              {socials.map((social) => (
                <div key={social.label} className="app-footer__social" aria-label={social.label}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={social.path} />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="app-footer__column-title">{title}</h3>
              <div className="app-footer__column-links">
                {links.map((link) => (
                  <a key={link} href="#" className="app-footer__column-link">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="app-footer__bottom">
          <div className="app-footer__copyright">© 2025 X-Laptop. All rights reserved.</div>
          <div className="app-footer__tag">Est. 2025</div>
        </div>
      </div>
    </footer>
  );
}
