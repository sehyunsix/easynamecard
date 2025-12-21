
export type CardTheme = 'modern' | 'minimal' | 'creative' | 'professional' | 'dark' | 'glassmorphism' | 'elegant' | 'tech' | 'bold' | 'classic' | 'luxury' | 'geometric' | 'retro' | 'organic' | 'pop' | 'cyber' | 'eco' | 'blueprint' | 'neon' | 'newspaper' | 'sketch' | 'brutalist' | 'pastel' | 'gradient' | 'architect' | 'comic' | 'midnight' | 'vintage' | 'pixel' | 'soft' | 'industrial' | 'futuristic' | 'holographic' | 'swiss' | 'botanical' | 'artdeco' | 'minimalblack' | 'cardboard' | 'zen' | 'magical' | 'chalk' | 'magazine' | 'sticker' | 'space' | 'marble' | 'wood' | 'paper' | 'techno' | 'glitch' | 'bauhaus' | 'carbon' | 'watercolor' | 'denim' | 'goldleaf' | 'pixelart' | 'concrete' | 'circuit' | 'mosaic' | 'origami' | 'bamboo' | 'leather' | 'vhs' | 'clay' | 'matrix' | 'candy' | 'poker' | 'safari' | 'royal' | 'map' | 'manga' | 'receipt' | 'passport' | 'ticket' | 'stamp' | 'note' | 'medal' | 'cyanotype' | 'embroidery' | 'stainedglass' | 'certificate' | 'vinyl' | 'cassette' | 'polaroid' | 'gameboy' | 'typewriter' | 'chess' | 'sketchbook' | 'diamond' | 'forest' | 'ocean' | 'lava' | 'ice' | 'honey' | 'nebula' | 'scroll' | 'graffiti' | 'gazette' | 'wood-ebony' | 'metal-steel' | 'pop-retro' | 'liquid-gold' | 'stark' | 'terrazzo' | 'washi' | 'cork' | 'velvet' | 'rust' | 'slate' | 'gothic' | 'bento' | 'cyber-grid' | 'botanical-art' | 'luxury-marble' | 'retro-terminal' | 'modern-scandi' | 'vibrant-blob' | 'tech-blueprint' | 'elegant-damask' | 'creative-collage' | 'professional-navy' | 'abstract-paint' | 'minimalist-warm' | 'neon-vibe' | 'blueprint-red' | 'ink-wash' | 'glam-gold' | 'cyber-pulse' | 'desert-sand' | 'aurora-borealis' | 'minimalist-dark-red' | 'patchwork' | 'monochrome-bold' | 'futuristic-white' | 'pixel-city' | 'warm-wood-grain' | 'frosted-mint' | 'deep-crimson' | 'charcoal-sketch' | 'electric-blue' | 'vintage-travel' | 'pastel-dreams' | 'modern-art-deco' | 'brutalist-color' | 'eco-friendly' | 'retro-future' | 'dark-botanical' | 'stucco-white' | 'indigo-dye' | 'copper-plate' | 'minimalist-teal' | 'cyberpunk-red' | 'arctic-white' | 'desert-oasis' | 'volcanic-ash' | 'deep-sea-pearl' | 'celestial-gold' | 'urban-industrial' | 'vintage-typewriter-ink' | 'minimalist-zen-stone' | 'neon-cyber-pulse' | 'forest-canopy' | 'marble-obsidian' | 'tech-grid-blue' | 'organic-terra' | 'futuristic-glass' | 'retro-cassette-tape' | 'luxury-velvet-gold' | 'geometric-vivid' | 'pop-vibrant' | 'blueprint-white' | 'newspaper-classic' | 'sketch-charcoal-pro' | 'brutalist-raw' | 'pastel-soft-glow' | 'architect-monochrome' | 'comic-action' | 'midnight-constellation' | 'vintage-newspaper-ads' | 'pixel-adventure' | 'bento-clean-cut';

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
