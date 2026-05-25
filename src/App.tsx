import { useState, useTransition } from 'react';
import { 
  Flame, 
  Map, 
  Phone, 
  Clock, 
  Plus, 
  Check, 
  Maximize2, 
  MapPin, 
  Sparkles, 
  AlertCircle, 
  Bookmark, 
  BookOpen, 
  ShoppingBag,
  Info,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Shared Data & Types
import { PizzaItem, CartItem } from './types';
import { PIZZA_MENU, IMAGES_RESOURCES, EXTRA_INGREDIENTS } from './data';

// UI Components
import Navigation from './components/Navigation';
import PizzaCustomizeModal from './components/PizzaCustomizeModal';
import PizzaCart from './components/PizzaCart';
import ReservationModal from './components/ReservationModal';
import PromoMarquee from './components/PromoMarquee';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

export default function App() {
  const [, startTransition] = useTransition();
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Reservation state
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [reservationArea, setReservationArea] = useState<'general' | 'bar' | 'cooperativa'>('general');

  // Customization state
  const [selectedPizzaToCustomize, setSelectedPizzaToCustomize] = useState<PizzaItem | null>(null);

  // Cookbook Manifesto state
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);

  // Checkout order receipt success state
  const [activeReceipt, setActiveReceipt] = useState<{
    id: string;
    name: string;
    phone: string;
    address?: string;
    deliveryMethod: 'delivery' | 'takeaway';
    total: number;
    items: CartItem[];
  } | null>(null);

  // Map directions state
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (pizza: PizzaItem, quantity: number, extras: string[], priceWithExtras: number) => {
    // Generate unique slot id using pizza id + sorted extra ingredients JSON
    const sortedExtras = [...extras].sort();
    const cartId = `${pizza.id}-${JSON.stringify(sortedExtras)}`;

    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.cartId === cartId);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      } else {
        return [...prev, {
          cartId,
          pizza,
          quantity,
          extraIngredients: extras,
          priceWithExtras
        }];
      }
    });

    // Automatically trigger cart opening for instant rich feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.cartId === cartId) {
          const nextQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, nextQty) };
        }
        return item;
      });
    });
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleCheckoutSuccess = (details: {
    name: string;
    phone: string;
    address?: string;
    deliveryMethod: 'delivery' | 'takeaway';
    total: number;
    items: CartItem[];
  }) => {
    const orderId = `LPC-${Math.floor(10000 + Math.random() * 90000)}`;
    setActiveReceipt({
      id: orderId,
      ...details
    });
    setCartItems([]); // Clear cart
    setIsCartOpen(false); // Close current drawer active states
  };

  const openReservation = (area: 'general' | 'bar' | 'cooperativa') => {
    setReservationArea(area);
    setIsReserveOpen(true);
  };

  return (
    <div className="bg-background text-on-surface selection:bg-secondary-container selection:text-on-secondary-container font-sans overflow-x-hidden min-h-screen">
      
      {/* Top sticky Navigation */}
      <Navigation 
        onCartOpen={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onReserveClick={() => openReservation('general')}
      />

      <main>
        {/* Section A: Hero */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-16 px-6 overflow-visible">
          {/* Huge typography alignment */}
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[15vw] leading-none text-on-surface select-none pointer-events-none z-0 tracking-tighter opacity-10 font-extrabold text-center select-none">
            LA PICCOLINA
          </h1>

          {/* Central responsive pizza showcase container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Ambient Pizza Floating Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="relative"
            >
              <img
                src={IMAGES_RESOURCES.heroPizza}
                alt="Pizza de Horno de Leña"
                className="w-[85vw] max-w-[550px] relative drop-shadow-[0_25px_25px_rgba(170,48,27,0.25)] select-none hover:rotate-3 transition-transform duration-500 cursor-grab active:cursor-grabbing"
                style={{ clipPath: 'circle(44% at 50% 50%)' }}
                referrerPolicy="no-referrer"
              />
              {/* Custom Red Oval Silhouette */}
              <div className="oval-shadow -mt-8 mx-auto" aria-hidden="true" />
            </motion.div>

            {/* Micro floating organic illustration nodes */}
            <div className="absolute top-6 -left-12 opacity-85 hover:scale-115 transition-transform duration-300">
              <span className="bg-white/90 p-3 rounded-full border border-on-surface flex items-center justify-center text-primary rotate-12">
                <Flame className="w-5 h-5 text-[#aa301b]" />
              </span>
            </div>
            <div className="absolute top-1/3 -right-8 opacity-90 hover:scale-115 transition-transform duration-300">
              <span className="bg-white/90 p-2.5 rounded-full border border-on-surface flex items-center justify-center text-secondary-container -rotate-12">
                <Sparkles className="w-4 h-4 text-[#7e5700]" />
              </span>
            </div>
          </div>

          {/* Spinning badge overlay graphic */}
          <div className="absolute top-1/4 left-6 md:left-24 z-20">
            <div className="relative w-36 h-36 md:w-48 md:h-48 animate-spin-slow">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <path d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" id="circlePath" />
                <circle className="fill-secondary-container stroke-[#111111] stroke-[1.5px]" cx="50" cy="50" r="38" />
                <text className="text-[7.5px] font-bold tracking-[0.22em] fill-on-secondary-fixed uppercase">
                  <textpath xlinkHref="#circlePath">
                    • GRAB A SLICE • HORNO DE LEÑA • REAL SOURDOUGH • VESUVIO •
                  </textpath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Flame className="w-6 h-6 text-primary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Slogan Text Header block */}
          <div className="mt-8 text-center z-10 max-w-2xl px-4 space-y-4">
            <p className="font-display font-extrabold text-[#aa301b] text-base md:text-lg tracking-[0.15em] uppercase leading-none">
              Massa Madre • 48h Fermentación
            </p>
            <p className="font-display font-bold text-lg md:text-xl text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Donde la arquitectura del sabor se encuentra con la tradición italiana. Sin adornos, solo pizza real.
            </p>
          </div>
        </section>

        {/* Section C: Nuestra Storia */}
        <section className="relative py-20" id="storia">
          {/* Two-tone high contrast background splitting */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-background border-b border-on-surface" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#aa301b]" />

          <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Box */}
            <div className="flex-1 bg-white p-8 md:p-10 brutalist-border brutalist-shadow rounded-none">
              <span className="text-xs bg-secondary-container text-on-secondary-container px-2 py-1 uppercase rounded-sm font-mono tracking-widest font-extrabold mb-3 inline-block">
                TALLER ARTESANAL
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl text-on-surface uppercase mb-6 tracking-tight leading-none">
                NUESTRA HISTORIA
              </h2>
              <p className="font-sans text-sm md:text-base text-on-surface-variant font-medium leading-relaxed mb-8">
                Nacimos en un pequeño garaje de Barcelona, obsesionados únicamente por dar vida a la costra de masa madre perfecta. No somos una cadena masiva corporativa, somos un taller de sabor comprometido con la honestidad gastronómica. Cada una de nuestras pizzas es una estructura física diseñada para colapsar deliciosamente en tu paladar.
              </p>
              
              <button
                onClick={() => setIsManifestoOpen(true)}
                className="bg-secondary-container text-on-secondary-container font-display font-extrabold text-xs tracking-widest uppercase px-6 py-3.5 brutalist-border brutalist-shadow-hover flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <BookOpen className="w-4 h-4 text-primary" />
                Leer Manifiesto
              </button>
            </div>

            {/* Right Interactive polaroid angle Pizza representation */}
            <div className="flex-1 relative flex items-center justify-center">
              <motion.div
                whileHover={{ rotate: 0, scale: 1.05 }}
                className="bg-white p-4 brutalist-border brutalist-shadow -rotate-6 transition-all duration-300 max-w-sm select-none"
              >
                <img
                  src={IMAGES_RESOURCES.storyPepperoni}
                  alt="Pepperoni artesanal"
                  className="w-full object-cover rounded-sm border border-on-surface/5"
                  style={{ clipPath: 'circle(46% at 50% 50%)' }}
                  referrerPolicy="no-referrer"
                />
                <div className="pt-4 text-center">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-on-surface/80">PIZZA Nº 02 / PEPPERONI</p>
                  <p className="font-display font-black text-xs text-primary uppercase">Cerezo & Roble • Horno de Leña</p>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Section D: Menú de Especialidades */}
        <section className="py-24 bg-background px-6 md:px-12 max-w-7xl mx-auto border-b border-on-surface" id="menu">
          
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mb-16 border-b border-on-surface pb-6">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-[#aa301b] text-white rounded-xl brutalist-border shadow-sm flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-on-surface uppercase tracking-tight">
                NUESTRAS ESPECIALIDADES
              </h2>
            </div>
            <p className="font-mono text-xs text-on-surface-variant font-bold text-center sm:text-right tracking-wider">
              [ MASA MADRE DE HARINA ECOLÓGICA • 48H REPOSO ]
            </p>
          </div>

          {/* Pizza Grid cards mapping */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PIZZA_MENU.map((pizza) => (
              <div
                key={pizza.id}
                className="bg-white brutalist-border p-6 rounded-none flex flex-col justify-between h-full relative group hover:-translate-y-2 transition-all duration-300 hover:shadow-lg"
              >
                {/* Decorative sticker badge */}
                {pizza.bestSeller && (
                  <div className="absolute -top-3.5 -right-3.5 z-10 bg-[#aa301b] text-white py-1 px-3 text-center rotate-12 brutalist-border text-[10px] font-black tracking-widest leading-none shadow-sm uppercase">
                    MÁS VENDIDA
                  </div>
                )}

                <div>
                  {/* Pizza Visual Container */}
                  <div className="relative mb-6 h-48 flex items-center justify-center bg-surface-low/30 border border-on-surface/5 rounded-xl overflow-visible">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-40 h-40 object-cover group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 hover:cursor-zoom-in"
                      style={{ clipPath: 'circle(44% at 50% 50%)' }}
                      onClick={() => setSelectedPizzaToCustomize(pizza)}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* View Customizer trigger sticker */}
                    <button
                      onClick={() => setSelectedPizzaToCustomize(pizza)}
                      className="absolute bottom-2 right-2 p-1.5 bg-white brutalist-border rounded-full hover:bg-secondary-container transition-colors shadow-sm focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Personalizar topping"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-on-surface" />
                    </button>
                  </div>

                  {/* Header labels */}
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-display font-extrabold text-2xl text-on-surface uppercase tracking-tight leading-none">
                      {pizza.name}
                    </h3>
                    {pizza.label && (
                      <span className={`text-[9px] font-mono tracking-wider font-extrabold px-2 py-0.5 rounded-sm brutalist-border ${
                        pizza.label === 'VEGGIE' ? 'bg-[#febe49] text-[#714e00]' : 'bg-on-surface text-background'
                      }`}>
                        {pizza.label}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed mb-6">
                    {pizza.description}
                  </p>
                </div>

                {/* Sub-block price CTA Button */}
                <div className="space-y-2 pt-4 border-t border-on-surface/5">
                  <button
                    onClick={() => setSelectedPizzaToCustomize(pizza)}
                    className="w-full bg-on-surface text-background py-3.5 font-display font-extrabold text-xs tracking-widest uppercase brutalist-border hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 cursor-pointer"
                  >
                    {pizza.price.toFixed(2)}€ — AÑADIR
                  </button>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* Section E: Split block - Comparte Sin Prisas */}
        <section className="flex flex-col lg:flex-row bg-[#aa301b] border-b border-on-surface">
          {/* Slicing visual chef side */}
          <div className="w-full lg:w-1/2 relative min-h-[350px] md:min-h-[480px]">
            <img
              src={IMAGES_RESOURCES.chefCut}
              alt="Corte manual de pizza artesanal"
              className="w-full h-full object-cover filter brightness-[0.88] select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            {/* Overlay spinning badge element */}
            <div className="absolute bottom-8 right-8 animate-spin-slow">
              <div className="bg-secondary-container w-20 h-20 rounded-full brutalist-border border-2 flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-on-secondary-container animate-pulse" />
              </div>
            </div>
            
            <div className="absolute top-6 left-6 bg-white/95 px-3 py-1.5 rounded brutalist-border text-[10px] uppercase font-mono tracking-widest font-extrabold">
              Horno de Encina 450ºC
            </div>
          </div>

          {/* Earthy Red Content Side */}
          <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center text-white space-y-6">
            <span className="text-xs bg-secondary-container text-on-secondary-container px-2.5 py-1 uppercase rounded-sm font-mono tracking-widest font-black self-start">
              EXPERIENCIA COMUNITARIA
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase leading-none tracking-tight">
              COMPARTE SIN PRISAS
            </h2>
            <p className="font-sans text-sm md:text-base text-background opacity-90 font-medium leading-relaxed max-w-lg">
              Reserva un espacio comunitario en nuestra icónica mesa cooperativa. En La Piccolina el tiempo se ralentiza en el instante en que tu pizza toca la madera de la mesa. Disfruta con amigos, extraños y masa madre.
            </p>
            <button
              onClick={() => openReservation('cooperativa')}
              className="inline-block bg-background text-on-surface px-8 py-4 font-display font-extrabold text-xs tracking-widest uppercase brutalist-border brutalist-shadow-hover transition-all self-start"
            >
              Reservar Mesa Comunitaria
            </button>
          </div>
        </section>

        {/* Section F: Promos scrolling */}
        <PromoMarquee />

        {/* Section G: Reviews rotating stack widget */}
        <Reviews />

        {/* Section H: Footer CTA */}
        <section className="bg-surface-container py-24 overflow-hidden relative border-t border-on-surface">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center relative z-10">
            
            <div className="relative mb-8">
              {/* Back ambient red shadow element */}
              <div className="oval-shadow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 opacity-10" />
              
              <div className="relative z-10 transform -rotate-12 hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
                <svg className="text-primary" fill="none" height="150" viewBox="0 0 24 24" width="150" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 12H12V22L21 12H12V2Z" fill="currentColor" stroke="#111111" strokeWidth="0.5"></path>
                  <circle cx="12" cy="12" fill="#111111" r="1.5"></circle>
                </svg>
                {/* Embedded absolute mini-image slice */}
                <img
                  src={IMAGES_RESOURCES.heroPizza}
                  alt="Pizza slice helper artwork"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-28 -mt-8 drop-shadow-md select-none pointer-events-none"
                  style={{ clipPath: 'circle(44% at 50% 50%)' }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <h2 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-4">
              VEN A PROBARLA
            </h2>
            <p className="font-display font-bold text-sm md:text-base text-on-surface-variant max-w-md mx-auto leading-relaxed mb-12">
              Estamos en pleno barrio del Born en Barcelona. Sabores intensos, masa viva y cerveza artesanal bien fría.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md">
              <button
                onClick={() => {
                  startTransition(() => {
                    setIsCartOpen(true);
                  });
                }}
                className="flex-1 bg-primary text-white py-4 px-8 font-display font-extrabold text-sm tracking-widest uppercase brutalist-border brutalist-shadow-hover cursor-pointer"
              >
                Pide Delivery
              </button>
              
              <button
                onClick={() => setIsMapOpen(true)}
                className="flex-1 bg-on-surface text-background py-4 px-8 font-display font-extrabold text-sm tracking-widest uppercase brutalist-border brutalist-shadow-hover cursor-pointer"
              >
                Ver Mapa
              </button>
            </div>

          </div>
        </section>
      </main>

      {/* Corporate footer details */}
      <Footer />

      {/* Modular Drawers & Popups Rendering */}
      
      {/* 1. Slice Customizer dialog */}
      <PizzaCustomizeModal
        pizza={selectedPizzaToCustomize}
        onClose={() => setSelectedPizzaToCustomize(null)}
        onConfirm={handleAddToCart}
      />

      {/* 2. Slide Drawer Cart container */}
      <PizzaCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* 3. Book online desk reservation modal */}
      <ReservationModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        defaultArea={reservationArea}
      />

      {/* 4. Reading Manifesto cookbook Dialog */}
      <AnimatePresence>
        {isManifestoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsManifestoOpen(false)}
              className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative bg-[#fcf9f3] w-full max-w-xl brutalist-border brutalist-shadow rounded-none p-6 md:p-8 z-10"
            >
              <button
                onClick={() => setIsManifestoOpen(false)}
                className="absolute top-4 right-4 p-1.5 brutalist-border rounded-full hover:bg-primary hover:text-white transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6 pt-4 font-semibold text-sm">
                <div className="text-center">
                  <span className="text-[#aa301b] font-mono text-xs tracking-widest uppercase">[ NUESTRO COMPROMISO ]</span>
                  <h3 className="font-display font-black text-2xl md:text-3xl uppercase text-on-surface mt-1">
                    EL MANIFIESTO PICCOLINA
                  </h3>
                </div>

                <div className="space-y-4 font-mono text-xs leading-relaxed text-on-surface-variant bg-surface-lowest p-5 border border-dashed border-on-surface/20">
                  <p>
                    <strong className="text-primary font-bold">01. LA CORTEZA:</strong> 48 horas de fermentación fría. Sabor profundo, alveolado crujiente y una digestibilidad insuperable gracias al uso exclusivo de masa madre viva.
                  </p>
                  <p>
                    <strong className="text-primary font-bold">02. LOS TOMATES:</strong> San Marzano ecológicos importados directamente de Campania, estrujados y triturados a mano justo antes de entrar al fuego.
                  </p>
                  <p>
                    <strong className="text-primary font-bold">03. EL CALOR:</strong> Horno de piedra alimentado rigurosamente con leña de encina y cerezo a 450ºC de temperatura. La pizza entra y se funde en 90 segundos exactos.
                  </p>
                  <p>
                    <strong className="text-primary font-bold">04. LA FILOSOFÍA:</strong> El alimento es honestidad. Rechazamos los aditivos artificiales, los endulzantes ocultos y el postureo. En el corte imperfecto reside la belleza de lo real.
                  </p>
                </div>

                <button
                  onClick={() => setIsManifestoOpen(false)}
                  className="w-full bg-primary text-background py-3 font-display font-bold text-xs tracking-widest uppercase brutalist-border brutalist-shadow text-center"
                >
                  Entendido, ¡Quiero Pizza!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Checkout Purchase success receipt popup ticket dialog */}
      <AnimatePresence>
        {activeReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveReceipt(null)}
              className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative bg-white w-full max-w-md brutalist-border brutalist-shadow rounded-none p-6 z-10 flex flex-col items-center"
            >
              <button
                onClick={() => setActiveReceipt(null)}
                className="absolute top-4 right-4 p-1.5 brutalist-border rounded-full hover:bg-primary hover:text-white transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 bg-secondary-container rounded-full brutalist-border flex items-center justify-center text-on-secondary-container mb-4">
                <Check className="w-6 h-6 stroke-[3px]" />
              </div>

              <h3 className="font-display font-black text-xl md:text-2xl text-on-surface uppercase tracking-tight text-center mb-1">
                ¡Pedido Recibido!
              </h3>
              <p className="text-xs text-on-surface-variant text-center max-w-xs mb-6 font-semibold">
                Nuestros pizzaiolos ya están estirando la masa madre. Tiempo estimado: <span className="text-primary">30-40 minutos</span>.
              </p>

              {/* Physical style receipt print block summary */}
              <div className="w-full bg-[#fcf9f3] p-4 border border-on-surface/50 font-mono text-xs space-y-3 relative mb-6">
                <div className="text-center pb-2 border-b border-dashed border-on-surface/20">
                  <p className="font-display font-black text-xs uppercase text-on-surface">LA PICCOLINA S.L.</p>
                  <p className="text-[10px] text-on-surface-variant">BARCELONA • PEDIDO Nº {activeReceipt.id}</p>
                </div>

                <div className="space-y-1 pb-2 border-b border-dashed border-on-surface/20">
                  <div className="flex justify-between font-bold">
                    <span>CLIENTE:</span>
                    <span>{activeReceipt.name}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-on-surface-variant">
                    <span>MÉTODO:</span>
                    <span className="uppercase text-primary font-bold">
                      {activeReceipt.deliveryMethod === 'delivery' ? 'Entrega a Domicilio' : 'Recoger en Horno'}
                    </span>
                  </div>
                  {activeReceipt.address && (
                    <div className="text-[10px] text-on-surface-variant">
                      <span>ENTR: </span>
                      <span className="uppercase">{activeReceipt.address}</span>
                    </div>
                  )}
                  <div className="text-[10px] text-on-surface-variant">
                    <span>TEL: </span>
                    <span>{activeReceipt.phone}</span>
                  </div>
                </div>

                {/* Items loop */}
                <div className="space-y-1.5 py-1 border-b border-dashed border-on-surface/20 max-h-36 overflow-y-auto">
                  {activeReceipt.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start text-[11px]">
                      <div className="flex-1 pr-4">
                        <span className="font-bold">{item.quantity}x</span> {item.pizza.name}
                        {item.extraIngredients.length > 0 && (
                          <span className="block text-[9px] text-on-surface-variant">
                            (+ {item.extraIngredients.join(', ')})
                          </span>
                        )}
                      </div>
                      <span className="font-bold whitespace-nowrap">{(item.priceWithExtras * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}
                </div>

                {/* Total receipt info */}
                <div className="flex justify-between font-bold text-sm">
                  <span>TOTAL COBRADO:</span>
                  <span className="text-primary font-sans text-sm">{activeReceipt.total.toFixed(2)}€</span>
                </div>
              </div>

              <button
                onClick={() => setActiveReceipt(null)}
                className="w-full bg-on-surface text-background py-3 font-display font-bold text-xs tracking-widest uppercase brutalist-border brutalist-shadow-hover text-center"
              >
                Cerrar Recibo
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Directions Map modal dialog */}
      <AnimatePresence>
        {isMapOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMapOpen(false)}
              className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative bg-background w-full max-w-md brutalist-border brutalist-shadow rounded-none p-6 z-10"
            >
              <button
                onClick={() => setIsMapOpen(false)}
                className="absolute top-4 right-4 p-1.5 brutalist-border rounded-full hover:bg-primary hover:text-white transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6 pt-4 font-semibold text-sm">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-display font-black text-xl uppercase text-on-surface">
                    ¿CÓMO LLEGAR?
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1">La Piccolina • Born, Barcelona</p>
                </div>

                {/* Simulated Stylized Brutalist Vector Map representation */}
                <div className="w-full h-44 bg-surface-container border border-on-surface relative overflow-hidden flex items-center justify-center select-none font-mono text-[10px]">
                  {/* Fake streets layout representation */}
                  <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-1/2 left-0 w-full h-8 bg-on-surface/50 -translate-y-1/2 rotate-12" />
                    <div className="absolute top-0 left-1/3 w-8 h-full bg-on-surface/50 -translate-x-1/2 -rotate-12" />
                    <div className="absolute top-0 right-1/4 w-12 h-full bg-on-surface/50 -translate-x-1/2 rotate-45" />
                  </div>
                  
                  {/* Floating marker pin */}
                  <div className="relative z-10 text-center animate-bounce">
                    <span className="inline-block bg-primary text-white text-[9px] font-black font-sans px-2 py-1 rounded brutalist-border whitespace-nowrap">
                      🍕 LA PICCOLINA
                    </span>
                    <div className="w-2 h-2 bg-on-surface rounded-full mx-auto mt-0.5" />
                  </div>
                  
                  <span className="absolute bottom-2 left-2 text-[9px] text-on-surface-variant font-bold uppercase">Carrer de la Princesa / Born</span>
                  <span className="absolute top-2 right-2 text-[9px] text-[#714e00] bg-secondary-container px-1 py-0.5 rounded-sm">M: Jaume I</span>
                </div>

                {/* Directions Info list */}
                <div className="space-y-3 font-medium text-xs text-on-surface-variant leading-relaxed">
                  <div className="flex gap-2">
                    <Map className="w-4 h-4 text-primary flex-shrink-0" />
                    <p>Via della Conciliazione, 12, 08001 Barcelona. Esquina plaza principal.</p>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-on-surface/10">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <p>+34 931 234 567 (Pedidos telefónicos / Consultas)</p>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-on-surface/10">
                    <Info className="w-4 h-4 text-secondary-container flex-shrink-0" />
                    <p>Llegar en Metro: Línea L4 (Jaume I), a solo 3 minutos andando siguiendo el olor a masa fresca.</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <a
                    href="https://maps.google.com/?q=Via+della+Conciliazione+12+Barcelona"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary text-white py-3 font-display font-medium text-xs tracking-widest uppercase brutalist-border brutalist-shadow-hover text-center"
                  >
                    Abrir en Google Maps
                  </a>
                  <button
                    onClick={() => setIsMapOpen(false)}
                    className="flex-1 bg-on-surface text-background py-3 font-display font-medium text-xs tracking-widest uppercase brutalist-border brutalist-shadow-hover text-center"
                  >
                    Cerrar Detalle
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
