'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PRIMARY_NAV } from '@/config/navigation';

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu whenever the route changes.
  if (prevPath !== pathname) {
    setMobileOpen(false);
    setPrevPath(pathname);
  }

  // Add a subtle shadow + backdrop blur once the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open and restore on close.
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close on Escape, move focus to the first menu link when opened,
  // and trap focus inside the menu while it is open.
  useEffect(() => {
    if (!mobileOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    // Defer focus to next tick so the menu is mounted.
    const t = window.setTimeout(() => {
      menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    }, 0);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-bg-primary/95 border-b transition-all duration-300 ${
        scrolled
          ? 'border-border-hard shadow-[0_4px_24px_-12px_rgba(17,17,17,0.18)] backdrop-blur-sm'
          : 'border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2"
        >
          <span className="bg-maroon text-white w-8 h-8 flex items-center justify-center text-sm font-bold border border-border-hard">
            A
          </span>
          <span className="font-bold text-text-primary tracking-tight text-sm uppercase font-[family-name:var(--font-mono)]">
            ADITYA
          </span>
        </Link>

        {/* Right: Nav + CTA */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-7" aria-label="Main navigation">
            {PRIMARY_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase transition-colors duration-200 rounded-sm focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2 ${
                  isActive(link.href)
                    ? 'text-maroon'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="bg-maroon text-white border border-border-hard px-4 py-2 text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest font-medium shadow-hard-sm hover:bg-maroon-dark hover:-translate-y-0.5 transition-all duration-200 rounded-sm focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2"
          >
            DISCUSS A PROJECT →
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          ref={toggleRef}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 rounded-sm focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-text-primary"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-text-primary"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-text-primary"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[70px] bg-bg-primary border-x border-b border-border-hard lg:hidden z-40 flex flex-col items-start px-6 py-8 gap-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
          >
            {PRIMARY_NAV.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: i * 0.04, duration: 0.15 }}
                className="w-full"
              >
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`block py-2 font-[family-name:var(--font-mono)] text-base uppercase tracking-widest transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2 ${
                    isActive(link.href)
                      ? 'text-maroon'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ delay: PRIMARY_NAV.length * 0.04, duration: 0.15 }}
              className="mt-4"
            >
              <Link
                href="/contact"
                className="inline-block bg-maroon text-white border border-border-hard px-5 py-3 text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest font-medium shadow-hard-sm rounded-sm focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2"
              >
                DISCUSS A PROJECT →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
