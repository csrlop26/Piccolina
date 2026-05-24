export interface PizzaItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  label?: 'VEGGIE' | 'VEGAN' | 'PICANTE' | 'NORMAL';
  bestSeller?: boolean;
  defaultIngredients: string[];
}

export interface CartItem {
  cartId: string; // unique identifier for this cart row (pizzaId + serialized extras)
  pizza: PizzaItem;
  quantity: number;
  extraIngredients: string[];
  priceWithExtras: number;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  area: 'general' | 'bar' | 'cooperativa'; // 'Mesa general', 'Barra de leña', 'Mesa comunitaria "Comparte sin prisas"'
  notes?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  text: string;
  stars: number;
  bgClass: string;
  textClass: string;
  rotateClass: string;
  translateClass: string;
}
