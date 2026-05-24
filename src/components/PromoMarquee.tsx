import { motion } from 'motion/react';
import { IMAGES_RESOURCES } from '../data';

export default function PromoMarquee() {
  return (
    <section className="bg-on-surface py-12 overflow-hidden relative">
      <div className="flex flex-col gap-4">
        {/* Row 1 */}
        <div className="flex whitespace-nowrap overflow-hidden select-none">
          <div className="flex animate-marquee">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-white font-display text-7xl md:text-8xl font-extrabold opacity-15 mx-8">
                PIZZA ARTESANAL
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex whitespace-nowrap overflow-hidden select-none">
          <div className="flex animate-marquee-reverse">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-primary font-display text-7xl md:text-8xl font-black mx-8 italic uppercase tracking-wider">
                DELIVERY NOW
              </span>
            ))}
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex whitespace-nowrap overflow-hidden select-none">
          <div className="flex animate-marquee">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-white font-display text-7xl md:text-8xl font-extrabold opacity-15 mx-8">
                HORNO DE LEÑA
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Interactive 3D Overlays */}
      <motion.img
        src={IMAGES_RESOURCES.heroPizza}
        alt="Artesanal Floating"
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-36 md:w-48 rotate-45 pointer-events-none drop-shadow-2xl z-10 hidden sm:block opacity-90"
        animate={{
          y: ['-55%', '-45%', '-55%'],
          rotate: [45, 55, 45]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        referrerPolicy="no-referrer"
      />

      <motion.img
        src={IMAGES_RESOURCES.storyPepperoni}
        alt="Pepperoni Floating"
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-44 md:w-56 -rotate-12 pointer-events-none drop-shadow-2xl z-10 hidden sm:block opacity-90"
        animate={{
          y: ['-45%', '-55%', '-45%'],
          rotate: [-12, -2, -12]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        referrerPolicy="no-referrer"
      />
    </section>
  );
}
