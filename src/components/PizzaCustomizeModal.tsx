import { useState } from 'react';
import { X, Plus, Minus, Check, ChefHat } from 'lucide-react';
import { PizzaItem } from '../types';
import { EXTRA_INGREDIENTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface PizzaCustomizeModalProps {
  pizza: PizzaItem | null;
  onClose: () => void;
  onConfirm: (pizza: PizzaItem, quantity: number, extras: string[], finalPrice: number) => void;
}

export default function PizzaCustomizeModal({ pizza, onClose, onConfirm }: PizzaCustomizeModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [specialNote, setSpecialNote] = useState('');

  if (!pizza) return null;

  const toggleExtra = (extraName: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraName)
        ? prev.filter(e => e !== extraName)
        : [...prev, extraName]
    );
  };

  const getExtraPrice = (extraName: string) => {
    const found = EXTRA_INGREDIENTS.find(e => e.name === extraName);
    return found ? found.price : 0;
  };

  const extrasSubtotal = selectedExtras.reduce((acc, name) => acc + getExtraPrice(name), 0);
  const unitPriceWithExtras = pizza.price + extrasSubtotal;
  const totalPrice = unitPriceWithExtras * quantity;

  const handleAdd = () => {
    const finalNote = specialNote.trim() ? ` [Nota: ${specialNote.trim()}]` : '';
    const ingredientsWithNotes = [...selectedExtras];
    if (finalNote) {
      ingredientsWithNotes.push(finalNote);
    }
    onConfirm(pizza, quantity, ingredientsWithNotes, unitPriceWithExtras);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative bg-background w-full max-w-2xl brutalist-border brutalist-shadow rounded-none md:rounded-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-on-surface bg-surface-container">
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-primary" />
              <h3 className="font-display font-black text-xl text-on-surface uppercase tracking-tight">
                Personalizar Pizza
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 brutalist-border rounded-full hover:bg-primary hover:text-white transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 space-y-6 flex-1">
            {/* Pizza Identity Card */}
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative w-36 h-36 bg-surface-low rounded-xl flex items-center justify-center border border-on-surface/10 flex-shrink-0">
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="w-28 h-28 object-cover"
                  style={{ clipPath: 'circle(46% at 50% 50%)' }}
                  referrerPolicy="no-referrer"
                />
                {pizza.label && (
                  <span className="absolute -top-2 -right-2 bg-secondary-container text-on-secondary-container text-[10px] font-bold px-2 py-0.5 brutalist-border rounded-full shadow-sm">
                    {pizza.label}
                  </span>
                )}
              </div>
              <div className="space-y-2 text-center md:text-left">
                <h4 className="font-display font-black text-2xl text-on-surface uppercase tracking-tight">{pizza.name}</h4>
                <p className="text-on-surface-variant text-sm font-medium leading-relaxed">{pizza.description}</p>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-xs bg-surface-container border border-on-surface/10 px-2 py-1 uppercase rounded font-mono font-medium text-on-surface/70">
                    Ingredientes base
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant font-medium opacity-85">
                  {pizza.defaultIngredients.join(', ')}
                </p>
              </div>
            </div>

            <hr className="border-on-surface/10" />

            {/* Extra Ingredients */}
            <div>
              <div className="mb-4">
                <h5 className="font-display font-bold text-base text-on-surface uppercase tracking-wider">Añadir Toppings Extras</h5>
                <p className="text-xs text-on-surface-variant font-medium">Dale tu toque personal a la masa con ingredientes cultivados de forma sostenible.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXTRA_INGREDIENTS.map((extra) => {
                  const isSelected = selectedExtras.includes(extra.name);
                  return (
                    <button
                      key={extra.name}
                      onClick={() => toggleExtra(extra.name)}
                      className={`flex justify-between items-center p-3 text-left brutalist-border-thick border-dashed hover:border-solid transition-all select-none ${
                        isSelected 
                          ? 'bg-secondary-container border-on-surface' 
                          : 'bg-white/50 border-on-surface/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 mr-2">
                        <div className={`w-5 h-5 brutalist-border flex items-center justify-center rounded-sm transition-colors ${isSelected ? 'bg-on-surface text-white' : 'bg-white'}`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-sm font-semibold text-on-surface leading-tight">{extra.name}</span>
                      </div>
                      <span className="text-sm font-mono font-bold whitespace-nowrap bg-white px-2 py-0.5 brutalist-border">
                        +{extra.price.toFixed(2)}€
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="border-on-surface/10" />

            {/* Special notes */}
            <div className="space-y-2">
              <label htmlFor="notes" className="font-display font-bold text-base text-on-surface uppercase tracking-wider block">
                Instrucciones Especiales
              </label>
              <textarea
                id="notes"
                placeholder="Ej. Sin orégano, muy tostada, cortar en 8 porciones..."
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                maxLength={140}
                className="w-full p-3 brutalist-border text-sm font-semibold text-on-surface bg-white placeholder-on-surface/40 focus:outline-none focus:ring-1 focus:ring-primary h-20 resize-none"
              />
              <span className="text-xs text-on-surface-variant/70 text-right block font-mono">
                {specialNote.length}/140 caracteres
              </span>
            </div>
          </div>

          {/* Footer controls & price */}
          <div className="p-5 border-t border-on-surface bg-surface-container flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 brutalist-border bg-white px-3 py-1.5 shadow-sm">
              <button
                type="button"
                aria-label="Disminuir cantidad"
                disabled={quantity <= 1}
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-1 text-on-surface disabled:opacity-30 focus:outline-none transition-transform hover:scale-110 active:scale-90"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-display font-black text-lg select-none">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Aumentar cantidad"
                onClick={() => setQuantity(q => q + 1)}
                className="p-1 text-on-surface focus:outline-none transition-transform hover:scale-110 active:scale-90"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Grand Total */}
              <div className="text-right flex-grow sm:flex-grow-0 min-w-[100px]">
                <p className="text-xs text-on-surface-variant uppercase font-mono tracking-wider font-semibold">Total estimado</p>
                <p className="font-display font-black text-2xl text-primary">{totalPrice.toFixed(2)}€</p>
              </div>

              {/* Confirm add */}
              <button
                onClick={handleAdd}
                className="flex-1 sm:flex-none uppercase tracking-widest bg-primary text-white font-display font-bold text-sm px-6 py-3.5 rounded-full brutalist-border brutalist-shadow-hover transition-all w-full md:w-auto text-center"
              >
                Añadir al Pedido
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
