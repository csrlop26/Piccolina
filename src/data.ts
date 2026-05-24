import { PizzaItem, ReviewItem } from './types';

export const PIZZA_MENU: PizzaItem[] = [
  {
    id: 'margherita',
    name: 'Margherita',
    description: 'Tomate San Marzano, mozzarella di bufala, albahaca fresca y AOVE.',
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop',
    label: 'VEGGIE',
    defaultIngredients: ['Tomate San Marzano', 'Mozzarella di bufala', 'Albahaca fresca', 'AOVE']
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni',
    description: 'Pepperoni artesanal ahumado, mozzarella, miel picante y orégano.',
    price: 14.00,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop',
    bestSeller: true,
    defaultIngredients: ['Pepperoni artesanal ahumado', 'Mozzarella', 'Miel picante', 'Orégano']
  },
  {
    id: 'carbonara',
    name: 'Carbonara',
    description: 'Base blanca de pecorino romano, guanciale crujiente y pimienta negra.',
    price: 15.50,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop',
    defaultIngredients: ['Base de pecorino romano', 'Guanciale crujiente', 'Yema de huevo', 'Pimienta negra']
  },
  {
    id: 'vegana',
    name: 'Vegana',
    description: 'Pimientos asados, cebolla caramelizada, champiñones y queso vegano.',
    price: 13.50,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800&auto=format&fit=crop',
    label: 'VEGAN',
    defaultIngredients: ['Pimientos asados', 'Cebolla caramelizada', 'Champiñones', 'Queso vegano artesanal']
  }
];

export const EXTRA_INGREDIENTS = [
  { name: 'Extra Mozzarella di Bufala', price: 1.50 },
  { name: 'Albahaca fresca silvestre', price: 1.00 },
  { name: 'Champiñones Portobello', price: 1.20 },
  { name: 'Pepperoni artesanal extra', price: 1.80 },
  { name: 'Huevo campero orgánico', price: 1.30 },
  { name: 'Aceite de Trufa Negra', price: 1.50 },
  { name: 'Cebolla caramelizada dulce', price: 1.00 },
  { name: 'Miel picante de la casa', price: 1.00 }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'MARCO R.',
    text: 'La mejor masa que he probado en años. Una fermentación perfecta con una textura y digestibilidad de auténtica locura.',
    stars: 5,
    bgClass: 'bg-primary',
    textClass: 'text-white',
    rotateClass: '-rotate-6',
    translateClass: 'translate-y-0'
  },
  {
    id: 'rev-2',
    author: 'LAURA G.',
    text: 'El ambiente del local es maravillosamente brutalista y la pizza es pura poesía italiana de vanguardia.',
    stars: 5,
    bgClass: 'bg-secondary-container text-on-secondary-container',
    textClass: 'text-on-secondary-container',
    rotateClass: 'rotate-2',
    translateClass: 'translate-y-4'
  },
  {
    id: 'rev-3',
    author: 'PABLO M.',
    text: 'Si buscas pizza de verdad, crujiente, sabrosa y sin tonterías ni postureos extraños, este es el lugar absoluto.',
    stars: 5,
    bgClass: 'bg-background',
    textClass: 'text-on-surface',
    rotateClass: '-rotate-2',
    translateClass: 'translate-y-8'
  }
];

export const IMAGES_RESOURCES = {
  heroPizza: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop',
  storyPepperoni: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop',
  chefCut: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM8KweoU8iyd8mZtFXCDalactmbY6iYeXN5jkF8UYMoY-a3pqXqStjhYSJwSR7BrOiPjcvQsZ_3GcUmJ1B9M_VjrfhQZ4ejzHFEy76WC2QM8HrA8Q8WmcaceGrnKX63OXIt_K5eawaaBIIYw9-R0SutKBN_NeUscWqovpnxsQVFpYy2AmyTOaFLdZVX9088XgOvqYayWZoQZ3-DKRwBFUk3KEe2bQ0H24-CXQTO1drkT61S0i_QPfI2i7lrPOgnyrSM7RKgSIVT0s'
};
