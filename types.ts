
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
  showQrCode: boolean;
  qrUrl: string;

  // Back Side Data
  backSideType: 'none' | 'english' | 'logo';
  nameEn: string;
  positionEn: string;
  taglineEn: string;
  goalEn: string;
  logoUrl: string;
  logoText: string;
  showBackQrCode: boolean;
}

export interface CardStyle {
  theme: CardTheme;
  primaryColor: string;
  accentColor: string;
  size: CardSize;
  rounded: 'none' | 'sm' | 'md' | 'lg' | 'full';
  contentScale: number;
  qrSize: number;
  qrX: number; // Percentage 0-100
  qrY: number; // Percentage 0-100
}
