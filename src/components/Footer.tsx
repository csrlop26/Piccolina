import { MapPin, Clock, Instagram, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-on-surface text-background py-16 border-t border-on-surface" id="contatti">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Col 1 */}
        <div className="space-y-4">
          <h2 className="font-display text-3xl font-black text-primary uppercase tracking-tight">
            La Trattoria
          </h2>
          <p className="font-sans text-sm text-surface-container-highest/70 leading-relaxed max-w-xs">
            © {new Date().getFullYear()} La Trattoria Artisanal Pizzeria. Hecho con pasión, harina orgánica y fermentación lenta.
          </p>
          <div className="pt-2 flex items-center gap-1.5 text-xs text-secondary-container font-mono">
            <span>Diseñado por <a href="https://augustocs.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">AugustoCS</a></span>
            <Sparkles className="w-3.5 h-3.5 text-secondary-container" />
          </div>
        </div>

        {/* Col 2 */}
        <div className="flex flex-col gap-3">
          <h4 className="font-sans text-xs font-black tracking-widest text-secondary-container uppercase mb-2">
            Explora
          </h4>
          <a href="#" className="flex items-center gap-2 text-surface-container-highest/80 hover:text-white text-sm transition-colors font-medium">
            <Instagram className="w-4 h-4 text-primary" />
            Instagram
          </a>
          <a href="#" className="text-surface-container-highest/80 hover:text-white text-sm transition-colors font-medium">
            Política de Privacidad
          </a>
          <a href="#" className="text-surface-container-highest/80 hover:text-white text-sm transition-colors font-medium">
            Listado de Alérgenos
          </a>
        </div>

        {/* Col 3 */}
        <div className="flex flex-col gap-3">
          <h4 className="font-sans text-xs font-black tracking-widest text-secondary-container uppercase mb-2">
            Ubicación y Horarios
          </h4>
          <div className="space-y-2 text-sm text-surface-container-highest/80 font-semibold">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>Via della Conciliazione, 12<br />Barcelona, 08001</p>
            </div>
            <div className="flex items-start gap-2 pt-1 border-t border-white/5">
              <Clock className="w-4 h-4 text-secondary-container mt-0.5 flex-shrink-0" />
              <p>Martes — Domingo: 13:00 - 23:00</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
