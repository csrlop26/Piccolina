import { useState } from 'react';
import { ShoppingBag, Calendar, Menu, X } from 'lucide-react';

interface NavigationProps {
  onCartOpen: () => void;
  cartCount: number;
  onReserveClick: () => void;
}

export default function Navigation({ onCartOpen, cartCount, onReserveClick }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-40 bg-background/90 backdrop-blur-md border-b border-on-surface">
      <div className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
        <a href="#" className="font-display text-2xl font-black text-primary uppercase select-none tracking-tight">
          La Piccolina
        </a>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="#menu" className="text-on-surface font-bold text-sm tracking-widest uppercase hover:text-primary border-b-2 border-primary transition-colors py-1">
            Menú
          </a>
          <a href="#storia" className="text-on-surface font-semibold text-sm tracking-widest uppercase hover:text-primary transition-colors py-1">
            Storia
          </a>
          <a href="#contatti" className="text-on-surface font-semibold text-sm tracking-widest uppercase hover:text-primary transition-colors py-1">
            Ubicación
          </a>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onCartOpen}
            className="relative p-2.5 brutalist-border rounded-full bg-white hover:bg-secondary-container transition-colors focus:outline-none"
            aria-label="Ver carrito"
          >
            <ShoppingBag className="w-5 h-5 text-on-surface" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-black font-mono px-1.5 py-0.5 rounded-full brutalist-border">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            onClick={onReserveClick}
            className="bg-primary text-white px-5 py-2 rounded-full font-display font-bold text-sm tracking-widest uppercase brutalist-border hover:scale-95 transition-transform duration-150 shadow-sm"
          >
            Reservar
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 brutalist-border rounded-full bg-white text-on-surface focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-on-surface p-6 flex flex-col gap-4 z-40 animate-fadeIn">
          <a 
            onClick={() => setMobileMenuOpen(false)}
            href="#menu" 
            className="font-display font-bold text-lg text-on-surface uppercase border-b border-on-surface/10 py-2 block"
          >
            Menú Pizzería
          </a>
          <a 
            onClick={() => setMobileMenuOpen(false)}
            href="#storia" 
            className="font-display font-bold text-lg text-on-surface uppercase border-b border-on-surface/10 py-2 block"
          >
            Nuestra Storia
          </a>
          <a 
            onClick={() => setMobileMenuOpen(false)}
            href="#contatti" 
            className="font-display font-bold text-lg text-on-surface uppercase border-b border-on-surface/10 py-2 block"
          >
            Contacto e Info
          </a>

          <div className="pt-2 flex flex-col gap-3">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onCartOpen();
              }}
              className="bg-white text-on-surface w-full py-3 rounded-xl font-display font-bold text-sm tracking-widest uppercase brutalist-border brutalist-shadow flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Ver Carrito ({cartCount})
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onReserveClick();
              }}
              className="bg-primary text-white w-full py-3 rounded-xl font-display font-bold text-sm tracking-widest uppercase brutalist-border brutalist-shadow"
            >
              Reservar Mesa Online
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
