import Link from "next/link";

const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Collections", href: "/collections" },
    { label: "Everyday Silk", href: "/collections/everyday-silk" },
    { label: "Occasion Wear", href: "/collections/occasion-wear" },
  ],
  Company: [
    { label: "Our Story", href: "/about" },
    { label: "Craftsmanship", href: "/craftsmanship" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Press", href: "/press" },
  ],
  Support: [
    { label: "Sizing Guide", href: "/sizing" },
    { label: "Care Instructions", href: "/care" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink dark:bg-dk-deep text-ivory/70" aria-label="Footer">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-16 pb-8">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-ivory/[0.08]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-xl tracking-[0.12em] text-ivory font-light mb-4">
              TH3RD
            </p>
            <p className="text-[13px] leading-relaxed text-ivory/50 font-light max-w-[180px]">
              Luxury modest fashion for the woman who moves with intention.
            </p>
            {/* Social links */}
            <div className="flex gap-4 mt-6">
              {[
                { label: "Instagram", href: "#", icon: InstagramIcon },
                { label: "Pinterest", href: "#", icon: PinterestIcon },
              ].map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-ivory/40 hover:text-ivory transition-colors duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-[11px] tracking-[0.16em] uppercase text-ivory/40 font-medium mb-5">
                {group}
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[13px] text-ivory/60 hover:text-ivory transition-colors duration-200 font-light"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-ivory/30 font-light">
            &copy; {new Date().getFullYear()} Th3rd. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-[12px] text-ivory/30 hover:text-ivory/60 transition-colors duration-200 font-light"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}
