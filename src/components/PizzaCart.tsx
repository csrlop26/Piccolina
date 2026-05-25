import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, Store, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface PizzaCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onCheckoutSuccess: (orderDetails: { name: string; phone: string; address?: string; deliveryMethod: 'delivery' | 'takeaway'; total: number; items: CartItem[] }) => void;
}

export default function PizzaCart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckoutSuccess }: PizzaCartProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'takeaway'>('delivery');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [formErrors, setFormErrors] = useState<{ name?: boolean; phone?: boolean; address?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.priceWithExtras * item.quantity), 0);
  const shippingCost = deliveryMethod === 'delivery' ? 2.50 : 0.00;
  const grandTotal = subtotal + shippingCost;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: boolean; phone?: boolean; address?: boolean } = {};
    if (!name.trim()) errors.name = true;
    if (!phone.trim()) errors.phone = true;
    if (deliveryMethod === 'delivery' && !address.trim()) errors.address = true;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    // Simulate ordering
    setTimeout(() => {
      setIsSubmitting(false);
      onCheckoutSuccess({
        name,
        phone,
        address: deliveryMethod === 'delivery' ? address : undefined,
        deliveryMethod,
        total: grandTotal,
        items: [...cartItems]
      });
      // Reset details
      setName('');
      setPhone('');
      setAddress('');
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm"
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="w-screen max-w-md bg-background border-l border-on-surface flex flex-col h-full shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-on-surface bg-surface-container flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h3 className="font-display font-black text-lg text-on-surface uppercase tracking-tight">
                  Tu Pedido ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 brutalist-border rounded-full hover:bg-primary hover:text-white transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-surface-container-high rounded-full brutalist-border flex items-center justify-center mt-12">
                    <ShoppingBag className="w-10 h-10 text-on-surface-variant/40" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-lg text-on-surface">Tu carrito está vacío</h4>
                    <p className="text-sm text-on-surface-variant max-w-xs px-4">
                      Explora nuestras especialidades y añade pizzas elaboradas con masa madre.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-on-surface text-background font-display font-medium text-xs tracking-widest uppercase px-6 py-2.5 brutalist-border brutalist-shadow-hover"
                  >
                    Seguir Explorando
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.cartId}
                      className="p-4 bg-white brutalist-border flex gap-4 items-start relative hover:shadow-sm transition-shadow"
                    >
                      <img
                        src={item.pizza.image}
                        alt={item.pizza.name}
                        className="w-16 h-16 object-cover flex-shrink-0"
                        style={{ clipPath: 'circle(46% at 50% 50%)' }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0 pr-6">
                        <h4 className="font-display font-black text-base text-on-surface uppercase tracking-tight leading-none mb-1">
                          {item.pizza.name}
                        </h4>
                        
                        {/* Extras list */}
                        {item.extraIngredients.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {item.extraIngredients.map((extra, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono bg-secondary-container/20 text-secondary border border-secondary-container/40 px-1 py-0.5 rounded"
                              >
                                + {extra}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <span className="font-display font-extrabold text-[#aa301b] text-sm">
                            {(item.priceWithExtras * item.quantity).toFixed(2)}€
                          </span>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 brutalist-border bg-background px-2 py-0.5 scale-90">
                            <button
                              type="button"
                              onClick={() => {
                                if (item.quantity === 1) {
                                  onRemoveItem(item.cartId);
                                } else {
                                  onUpdateQuantity(item.cartId, -1);
                                }
                              }}
                              className="p-0.5 hover:text-primary transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-5 text-center font-mono font-bold text-xs select-none">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartId, 1)}
                              className="p-0.5 hover:text-primary transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => onRemoveItem(item.cartId)}
                        className="absolute top-2 right-2 p-1 text-on-surface-variant hover:text-primary transition-colors"
                        aria-label="Eliminar pizza"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer Checkout Actions */}
            {cartItems.length > 0 && (
              <div className="border-t border-on-surface bg-surface-container p-6 space-y-4">
                {/* Delivery toggle */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-white brutalist-border scale-95">
                  <button
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`flex items-center justify-center gap-2 py-2 font-display text-xs font-bold uppercase select-none transition-colors ${
                      deliveryMethod === 'delivery' ? 'bg-primary text-white' : 'text-on-surface hover:bg-background'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    A Domicilio
                  </button>
                  <button
                    onClick={() => setDeliveryMethod('takeaway')}
                    className={`flex items-center justify-center gap-2 py-2 font-display text-xs font-bold uppercase select-none transition-colors ${
                      deliveryMethod === 'takeaway' ? 'bg-primary text-white' : 'text-on-surface hover:bg-background'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    En Pizzería
                  </button>
                </div>

                {/* Subtotal list */}
                <div className="text-sm font-semibold space-y-1.5 border-b border-on-surface/10 pb-3">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Subtotal</span>
                    <span className="font-mono">{subtotal.toFixed(2)}€</span>
                  </div>
                  {deliveryMethod === 'delivery' && (
                    <div className="flex justify-between text-xs text-on-surface-variant">
                      <span>Gastos de Envío</span>
                      <span className="font-mono">{shippingCost.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-on-surface pt-1.5 border-t border-dashed border-on-surface/10">
                    <span className="font-display uppercase tracking-wider">Total Pedido</span>
                    <span className="font-mono text-primary">{grandTotal.toFixed(2)}€</span>
                  </div>
                </div>

                {/* Checkout forms */}
                <form onSubmit={handleCheckout} className="space-y-3">
                  <div>
                    <label className="sr-only" htmlFor="checkout-name">Nombre</label>
                    <input
                      id="checkout-name"
                      type="text"
                      placeholder="Tu nombre completo *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full p-2.5 brutalist-border text-xs font-semibold bg-white placeholder-on-surface/40 focus:outline-none focus:ring-1 focus:ring-primary ${
                        formErrors.name ? 'border-primary ring-1 ring-primary' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="checkout-phone">Teléfono de contacto</label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      placeholder="Teléfono de contacto *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full p-2.5 brutalist-border text-xs font-semibold bg-white placeholder-on-surface/40 focus:outline-none focus:ring-1 focus:ring-primary ${
                        formErrors.phone ? 'border-primary ring-1 ring-primary' : ''
                      }`}
                    />
                  </div>
                  {deliveryMethod === 'delivery' && (
                    <div>
                      <label className="sr-only" htmlFor="checkout-address">Dirección de entrega</label>
                      <input
                        id="checkout-address"
                        type="text"
                        placeholder="Dirección de entrega completa *"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={`w-full p-2.5 brutalist-border text-xs font-semibold bg-white placeholder-on-surface/40 focus:outline-none focus:ring-1 focus:ring-primary ${
                          formErrors.address ? 'border-primary ring-1 ring-primary' : ''
                        }`}
                      />
                    </div>
                  )}

                  {/* Submit checkout */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-3.5 rounded-full font-display font-extrabold text-sm tracking-widest uppercase brutalist-border brutalist-shadow-hover transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Confirmar Pedido
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
