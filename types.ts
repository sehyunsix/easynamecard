
export type CardTheme = 'modern' | 'minimal' | 'creative' | 'professional' | 'dark' | 'glassmorphism' | 'elegant' | 'tech' | 'bold' | 'classic' | 'luxury' | 'geometric' | 'retro' | 'organic' | 'pop' | 'cyber' | 'eco' | 'blueprint' | 'neon' | 'newspaper' | 'sketch' | 'brutalist' | 'pastel' | 'gradient' | 'architect' | 'comic' | 'midnight' | 'vintage' | 'pixel' | 'soft';

export type CardSize = 'standard' | 'vertical' | 'square';

export interface CardData {
  name: string;
  position: string;
  contact: string;
  email: string;
  github: string;
  blog: string;
  goal: string;
  showQrCode: boolean;
  qrUrl: string;

  // New: Field Configuration (Visibility & Positioning)
  location: string;
  fieldSettings: {
    [key: string]: {
      visible: boolean;
      x: number; // Offset X in pixels
      y: number; // Offset Y in pixels
    };
  };

  // Back Side Data
  backSideType: 'none' | 'english' | 'logo' | 'custom';
  nameEn: string;
  positionEn: string;
  goalEn: string;
  logoUrl: string;
  logoText: string;
  showBackQrCode: boolean;

  // Custom Back Side Data
  customElements: CardElement[];
}

export interface CardElement {
  id: string;
  type: 'text' | 'image';
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  content: string; // Text content or Image URL
  style: {
    fontSize?: number;
    color?: string;
    width?: number; // px
    height?: number; // px (for images)
    fontWeight?: 'normal' | 'bold';
    fontFamily?: string;
    align?: 'left' | 'center' | 'right';
  };
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
