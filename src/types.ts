export interface MapSpot {
  id: string;
  name: string;
  category: 'landmark' | 'photo' | 'souvenir' | 'cafe' | 'rest';
  description: string;
  imageUrl: string;
  x: number; // percentage coordinate on custom map
  y: number; // percentage coordinate on custom map
  tips?: string[];
  recommendedTime?: string;
}

export interface WishPostcard {
  id: string;
  sender: string;
  message: string;
  bgColor: string; // Tailwind bg-class for pastel shade
  textColor: string;
  createdAt: string;
}

export interface Stamp {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  hint: string;
}
