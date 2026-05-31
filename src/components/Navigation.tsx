import { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavigationProps {
  onCartOpen: () => void;
  cartCount: number;
  onReserveClick: () => void;
}

export default function Navigation({ onCartOpen, cartCount, onReserveClick }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md">
      <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-7xl mx-auto">

        {/* Logo */}
        <a href="#" className="font-display text-xs font-black text-on-surface uppercase tracking-tight select-none flex items-center gap-2.5">
          <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-[9px] font-black tracking-tight leading-none">LT</span>
          La Trattoria
        </a>

        {/* Desktop nav pills */}
        <div className="hidden md:flex gap-2 items-center">
          {[
            { href: '#menu', label: "Pizza's" },
            { href: '#storia', label: 'About' },
            { href: '#contatti', label: 'Delivery' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="pill-border text-on-surface font-sans font-medium text-xs tracking-wide px-4 py-2 hover:bg-on-surface hover:text-background transition-colors"
            >
              {label}
            </a>
          ))}
          <span className="text-on-surface/30 text-lg font-light ml-1">+</span>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCartOpen}
            className="relative p-2 rounded-full hover:bg-on-surface/8 transition-colors focus:outline-none"
            aria-label="Ver carrito"
          >
            <ShoppingBag className="w-5 h-5 text-on-surface" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none p-0.5">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onReserveClick}
            className="bg-secondary-container text-on-secondary-container px-5 py-2.5 rounded-full font-display font-black text-[10px] tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            Order Now
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-on-surface/8 text-on-surface focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-t border-on-surface/10 p-6 flex flex-col gap-3 z-40">
          {[
            { href: '#menu', label: "Menú Pizzería" },
            { href: '#storia', label: 'Nuestra Storia' },
            { href: '#contatti', label: 'Ubicación' },
          ].map(({ href, label }) => (
            <a
              key={href}
              onClick={() => setMobileMenuOpen(false)}
              href={href}
              className="font-display font-bold text-sm text-on-surface uppercase border-b border-on-surface/10 py-3 block"
            >
              {label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onCartOpen(); }}
              className="pill-border bg-background text-on-surface w-full py-3 font-display font-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Ver Carrito ({cartCount})
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onReserveClick(); }}
              className="bg-secondary-container text-on-secondary-container w-full py-3 rounded-full font-display font-black text-[10px] tracking-widest uppercase"
            >
              Reservar Mesa
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
