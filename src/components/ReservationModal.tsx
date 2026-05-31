import React, { useState } from 'react';
import { X, Calendar, Users, Clock, MapPin, Sparkles, CheckCircle2, Clipboard } from 'lucide-react';
import { Reservation } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultArea?: 'general' | 'bar' | 'cooperativa';
}

export default function ReservationModal({ isOpen, onClose, defaultArea = 'general' }: ReservationModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('20:30');
  const [area, setArea] = useState<'general' | 'bar' | 'cooperativa'>(defaultArea);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingCode, setBookingCode] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  if (!isOpen) return null;

  const handleClose = () => {
    setStep('form');
    setGuests(2);
    setDate('');
    setTime('20:30');
    setArea('general');
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setErrors({});
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: boolean } = {};
    if (!date) newErrors.date = true;
    if (!name.trim()) newErrors.name = true;
    if (!phone.trim()) newErrors.phone = true;
    if (!email.trim() || !email.includes('@')) newErrors.email = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    
    // Generate simple booking confirmation code
    const randomCode = `TRA-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingCode(randomCode);
    setStep('success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative bg-background w-full max-w-xl brutalist-border brutalist-shadow rounded-none md:rounded-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-on-surface bg-surface-container">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-display font-black text-xl text-on-surface uppercase tracking-tight">
                Reserva tu Mesa Online
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 brutalist-border rounded-full hover:bg-primary hover:text-white transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 flex-1 text-sm font-semibold">
              <div className="text-center md:text-left">
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                  Reserva un espacio comunitario, en nuestra barra de horno de leña o una mesa independiente. 
                  <span className="text-primary font-bold"> Sin adornos, solo pizza real.</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Guests */}
                <div className="space-y-1.5">
                  <label htmlFor="res-guests" className="flex items-center gap-1 text-xs text-on-surface uppercase font-mono tracking-wider font-bold">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    Comensales
                  </label>
                  <select
                    id="res-guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full p-2.5 brutalist-border bg-white text-on-surface focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-1.5">
                  <label htmlFor="res-date" className="flex items-center gap-1 text-xs text-on-surface uppercase font-mono tracking-wider font-bold">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    Fecha
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full p-2.5 brutalist-border bg-white text-on-surface focus:outline-none ${
                      errors.date ? 'border-primary ring-1 ring-primary' : ''
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Time slot */}
                <div className="space-y-1.5">
                  <label htmlFor="res-time" className="flex items-center gap-1 text-xs text-on-surface uppercase font-mono tracking-wider font-bold">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    Turno
                  </label>
                  <select
                    id="res-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-2.5 brutalist-border bg-white text-on-surface focus:outline-none"
                  >
                    <optgroup label="Almuerzos (Lunch)">
                      <option value="13:00">13:00</option>
                      <option value="13:30">13:30</option>
                      <option value="14:00">14:00</option>
                      <option value="14:30">14:30</option>
                    </optgroup>
                    <optgroup label="Cenas (Dinner)">
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00</option>
                      <option value="21:30">21:30</option>
                      <option value="22:00">22:00</option>
                      <option value="22:30">22:30</option>
                    </optgroup>
                  </select>
                </div>

                {/* Experience Area */}
                <div className="space-y-1.5">
                  <label htmlFor="res-area" className="flex items-center gap-1 text-xs text-on-surface uppercase font-mono tracking-wider font-bold">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    Ambiente / Zona
                  </label>
                  <select
                    id="res-area"
                    value={area}
                    onChange={(e) => setArea(e.target.value as any)}
                    className="w-full p-2.5 brutalist-border bg-white text-on-surface focus:outline-none"
                  >
                    <option value="general">Mesa libre estándar</option>
                    <option value="bar">Barra horno leña (Sabor directo)</option>
                    <option value="cooperativa">Mesa "Comparte sin prisas"</option>
                  </select>
                </div>
              </div>

              <hr className="border-on-surface/10" />

              {/* Personal details */}
              <div className="space-y-3">
                <h5 className="font-display font-bold text-sm text-on-surface uppercase tracking-wider">Datos Personales</h5>
                
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre del titular de la reserva *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full p-2.5 brutalist-border bg-white placeholder-on-surface/40 focus:outline-none focus:ring-1 focus:ring-primary ${
                        errors.name ? 'border-primary ring-1 ring-primary' : ''
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      placeholder="Teléfono móvil *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full p-2.5 brutalist-border bg-white placeholder-on-surface/40 focus:outline-none focus:ring-1 focus:ring-primary ${
                        errors.phone ? 'border-primary ring-1 ring-primary' : ''
                      }`}
                    />
                    <input
                      type="email"
                      placeholder="Correo electrónico *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full p-2.5 brutalist-border bg-white placeholder-on-surface/40 focus:outline-none focus:ring-1 focus:ring-primary ${
                        errors.email ? 'border-primary ring-1 ring-primary' : ''
                      }`}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Notas especiales (alergias, cumpleaños, etc.)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-2.5 brutalist-border bg-white placeholder-on-surface/40 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-3.5 rounded-full font-display font-extrabold text-sm tracking-widest uppercase brutalist-border brutalist-shadow-hover transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                Solicitar Reserva de Mesa
              </button>
            </form>
          ) : (
            /* Ticket Confirmation Receipt Block */
            <div className="overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-6 flex-1 bg-surface-lowest">
              <div className="w-16 h-16 bg-secondary-container rounded-full brutalist-border flex items-center justify-center text-on-secondary-container">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="font-display font-black text-2xl text-on-surface uppercase tracking-tight">¡Reserva Confirmada!</h4>
                <p className="text-sm text-on-surface-variant max-w-sm">
                  Hemos enviado los detalles y dirección de acceso a tu correo electrónico. Te esperamos en La Trattoria.
                </p>
              </div>
 
              {/* Graphic Ticket Receipt Layout */}
              <div className="relative w-full max-w-sm bg-background border-2 border-on-surface/60 p-5 rounded-none shadow-md overflow-hidden text-left font-mono text-xs text-on-surface">
                {/* Sideway decorative notches to mimic receipt tear-off */}
                <div className="absolute top-0 inset-x-0 h-1 bg-[radial-gradient(circle,transparent_4px,white_4px)] bg-[length:12px_12px]" />
                
                <div className="text-center pb-3 border-b border-dashed border-on-surface/30">
                  <p className="font-display font-black text-sm uppercase">LA TRATTORIA PIZZERIA</p>
                  <p className="text-[10px] text-on-surface-variant">BARCELONA • VIA DELLA CONCILIAZIONE 12</p>
                </div>

                <div className="py-4 space-y-2 border-b border-dashed border-on-surface/30">
                  <div className="flex justify-between font-semibold">
                    <span>CÓDIGO:</span>
                    <span className="text-primary font-bold text-sm font-sans">{bookingCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TITULAR:</span>
                    <span className="uppercase">{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>FECHA:</span>
                    <span>{date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TURNO DE HORA:</span>
                    <span>{time} h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>COMENSALES:</span>
                    <span>{guests} {guests === 1 ? 'Persona' : 'Personas'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ZONA DESIGNADA:</span>
                    <span className="uppercase text-[10px]">
                      {area === 'general' ? 'Mesa General' : area === 'bar' ? 'Barra Horno de Leña' : 'Mesa Comunitaria'}
                    </span>
                  </div>
                  {notes.trim() && (
                    <div className="pt-2">
                      <p className="font-bold">NOTAS:</p>
                      <p className="text-[10px] italic text-on-surface-variant leading-normal">"{notes}"</p>
                    </div>
                  )}
                </div>

                <div className="pt-3 text-center space-y-1.5">
                  <p className="text-[9px] text-on-surface-variant tracking-widest">PRESENTE ESTE TICKET AL LLEGAR</p>
                  {/* Fake Barcode SVG style */}
                  <div className="h-6 w-32 mx-auto bg-on-surface opacity-80 flex gap-0.5 justify-center mt-1">
                    {[1, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2].map((w, idx) => (
                      <span key={idx} className="bg-background" style={{ width: `${w}px` }} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm pt-2">
                <button
                  onClick={handleClose}
                  className="flex-1 bg-on-surface text-background py-3 font-display font-medium text-xs tracking-widest uppercase brutalist-border brutalist-shadow-hover text-center"
                >
                  Entendido
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
