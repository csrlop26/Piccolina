import React from 'react';
import { motion } from 'motion/react';

interface ConstructionBoxProps {
  isActive: boolean;
  children: React.ReactNode;
  className?: string; // Estilos adicionales del contenedor principal
  fillColor?: string; // Color de fondo final, ej: 'bg-white' o 'bg-primary'
  shadowColor?: string; // Color de la sombra brutalista, ej: '#2d3922'
  borderWidth?: number; // Grosor de los bordes
  borderColor?: string; // Color del borde, ej: '#2d3922'
  delay?: number; // Retraso antes de iniciar el dibujo
  showContentBeforeActive?: boolean; // Permite ver el contenido antes de activar el borde (ej. en blueprint)
}

export default function ConstructionBox({
  isActive,
  children,
  className = '',
  fillColor = 'bg-white',
  shadowColor = '#2d3922',
  borderColor = '#2d3922',
  borderWidth = 1.5,
  delay = 0,
  showContentBeforeActive = false
}: ConstructionBoxProps) {
  // Tiempos coordinados para el dibujo
  const duration = 0.25;

  return (
    <div className={`relative ${className} overflow-visible`}>
      {/* 1. Fondo que se revela una vez dibujados los bordes */}
      <motion.div
        className={`absolute inset-0 ${fillColor} -z-10`}
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay + duration * 3, duration: 0.3 }}
        style={{
          // Sombra brutalista dura que se desplaza al final de la construcción
          boxShadow: isActive ? `3px 3px 0px ${shadowColor}` : '0px 0px 0px transparent',
        }}
      />

      {/* 2. Líneas de borde que se dibujan una a una (Sentido horario) */}
      {/* Borde Superior (Izquierda a Derecha) */}
      <motion.div
        className="absolute left-0 top-0"
        style={{
          height: `${borderWidth}px`,
          backgroundColor: borderColor,
          originX: 0
        }}
        initial={{ width: '0%' }}
        animate={isActive ? { width: '100%' } : { width: '0%' }}
        transition={{ delay: delay, duration: duration, ease: 'linear' }}
      />

      {/* Borde Derecho (Arriba a Abajo) */}
      <motion.div
        className="absolute right-0 top-0"
        style={{
          width: `${borderWidth}px`,
          backgroundColor: borderColor,
          originY: 0
        }}
        initial={{ height: '0%' }}
        animate={isActive ? { height: '100%' } : { height: '0%' }}
        transition={{ delay: delay + duration, duration: duration, ease: 'linear' }}
      />

      {/* Borde Inferior (Derecha a Izquierda) */}
      <motion.div
        className="absolute right-0 bottom-0"
        style={{
          height: `${borderWidth}px`,
          backgroundColor: borderColor,
          originX: 1
        }}
        initial={{ width: '0%' }}
        animate={isActive ? { width: '100%' } : { width: '0%' }}
        transition={{ delay: delay + duration * 2, duration: duration, ease: 'linear' }}
      />

      {/* Borde Izquierdo (Abajo a Arriba) */}
      <motion.div
        className="absolute left-0 bottom-0"
        style={{
          width: `${borderWidth}px`,
          backgroundColor: borderColor,
          originY: 1
        }}
        initial={{ height: '0%' }}
        animate={isActive ? { height: '100%' } : { height: '0%' }}
        transition={{ delay: delay + duration * 3, duration: duration, ease: 'linear' }}
      />

      {/* 3. Contenido interior que se revela gradualmente junto con el fondo */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isActive || showContentBeforeActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: isActive ? delay + duration * 3.5 : 0, duration: 0.3 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
