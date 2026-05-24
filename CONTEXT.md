# La Piccolina - Contexto del Proyecto

Este archivo documenta el estado actual, la arquitectura y las decisiones de diseño del proyecto "La Piccolina" para futuras interacciones con asistentes de IA.

## 1. Resumen del Proyecto
- **Nombre:** La Piccolina
- **Descripción:** Demo de una pizzería artesanal enfocada en masa madre, horno de leña y estética moderna.
- **Repositorio:** [https://github.com/csrlop26/Piccolina](https://github.com/csrlop26/Piccolina)
- **URL en Producción:** [https://csrlop26.github.io/Piccolina/](https://csrlop26.github.io/Piccolina/)

## 2. Stack Tecnológico
- **Core:** React 19, TypeScript, Vite.
- **Estilos:** Tailwind CSS.
- **Animaciones:** Motion (framer-motion).
- **Iconos:** Lucide React.
- **Despliegue:** GitHub Actions (hacia GitHub Pages).

## 3. Arquitectura y Componentes
Es una *Single Page Application* (SPA) sin enrutador externo (React Router no está en uso). Toda la navegación y los modales se gestionan mediante el estado local (`useState`) en `src/App.tsx`.
- **`src/App.tsx`:** Componente principal que orquesta el Hero, Menú, Historia y modales de carrito/reserva/manifiesto.
- **`src/data.ts`:** Fuente de la verdad para el menú de pizzas (`PIZZA_MENU`), ingredientes extra (`EXTRA_INGREDIENTS`), opiniones (`REVIEWS_DATA`) e imágenes (`IMAGES_RESOURCES`).
- **`src/assets/pizzas/`:** Contiene las imágenes generadas por IA de las pizzas (`margherita_ai.png`, `pepperoni_ai.png`, etc.). 

## 4. Diseño y Estética
- **Estilo Visual:** Brutalista, alto contraste, moderno y minimalista.
- **Colores Principales:** 
  - Rojo/Fuego (Primary): `#aa301b`
  - Amarillo oscuro (Secondary): `#7e5700`
  - Fondos predominantemente blancos/claros (`bg-background`, `bg-surface-container`) con textos muy oscuros para máximo contraste.
- **Imágenes:** Se usan imágenes generadas por IA que emulan un formato de pizza transparente (PNG). Para evitar fondos negros residuales, se les aplica la clase `rounded-full` en Tailwind CSS para enmascararlas como un círculo perfecto.
- **Tipografía:** Se hace uso extensivo de letras mayúsculas, fuentes `font-display` y espaciado ancho (`tracking-widest`) en botones y etiquetas.

## 5. Notas sobre el Despliegue (GitHub Pages)
- El despliegue está 100% automatizado mediante el flujo en `.github/workflows/deploy.yml`. 
- Cualquier push a la rama `main` compila la carpeta `dist/` usando Node 20 y sube los estáticos.
- **Ruta Base (`base`):** En `vite.config.ts`, la base está configurada como `base: '/Piccolina/'` para que los *assets* estáticos (JS, CSS, imágenes) se carguen correctamente al publicarse en `usuario.github.io/repositorio`. Si este proyecto cambiara de nombre o de dominio, esta configuración deberá actualizarse.

---
*Nota para la IA: Si necesitas hacer un cambio, lee primero este documento y verifica en `src/data.ts` si el contenido dinámico puede modificarse sin tocar la estructura del componente `App.tsx`.*
