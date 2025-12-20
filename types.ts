
export type CardTheme = 'modern' | 'minimal' | 'creative' | 'professional' | 'dark' | 'glassmorphism';

export type CardSize = 'standard' | 'vertical' | 'square';

export interface CardData {
  name: string;
  position: string;
  contact: string;
  email: string;
  github: string;
  blog: string;
  goal: string;
  tagline: string;
}

export interface CardStyle {
  theme: CardTheme;
  primaryColor: string;
  accentColor: string;
  size: CardSize;
  rounded: 'none' | 'sm' | 'md' | 'lg' | 'full';
  contentScale: number;
}
