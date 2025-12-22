
export type CardTheme =
  | 'abstractpaint'
  | 'abstractwave'
  | 'actionpanel'
  | 'agedscroll'
  | 'architect'
  | 'architectmonochrome'
  | 'arcticwhite'
  | 'artdeco'
  | 'artdecogold'
  | 'auroraborealis'
  | 'auroranight'
  | 'bamboo'
  | 'bauhaus'
  | 'bento'
  | 'bentocleancut'
  | 'blueprint'
  | 'blueprintblue'
  | 'blueprintred'
  | 'blueprintwhite'
  | 'bold'
  | 'botanical'
  | 'botanicalart'
  | 'brutalist'
  | 'brutalistcolor'
  | 'brutalistraw'
  | 'candy'
  | 'candypop'
  | 'carbon'
  | 'carbonsport'
  | 'cardboard'
  | 'cassette'
  | 'celestialgold'
  | 'certificate'
  | 'chalk'
  | 'charcoalsketch'
  | 'chess'
  | 'circuit'
  | 'classic'
  | 'clay'
  | 'comic'
  | 'comicaction'
  | 'comichalftone'
  | 'concrete'
  | 'copperplate'
  | 'cork'
  | 'cosmicdust'
  | 'creative'
  | 'creativecollage'
  | 'cyanotype'
  | 'cyber'
  | 'cybergreen'
  | 'cybergrid'
  | 'cyberpulse'
  | 'cyberpunkred'
  | 'cyberred'
  | 'dark'
  | 'darkbotanical'
  | 'dataflow'
  | 'deepcrimson'
  | 'deepseapearl'
  | 'denim'
  | 'desertoasis'
  | 'desertsand'
  | 'diamond'
  | 'eco'
  | 'ecofriendly'
  | 'electricblue'
  | 'elegant'
  | 'elegantdamask'
  | 'embroidery'
  | 'florabotanica'
  | 'forest'
  | 'forestcanopy'
  | 'frostedmint'
  | 'futuristic'
  | 'futuristicglass'
  | 'futuristicwhite'
  | 'gameboy'
  | 'gazette'
  | 'geometric'
  | 'geometricvivid'
  | 'glamgold'
  | 'glasscard'
  | 'glassmorphism'
  | 'glitch'
  | 'glowsign'
  | 'goldenluxury'
  | 'goldleaf'
  | 'gothic'
  | 'gradient'
  | 'graffiti'
  | 'graphpaper'
  | 'holographic'
  | 'honey'
  | 'ice'
  | 'indigodye'
  | 'industrial'
  | 'industrialrust'
  | 'inksplatter'
  | 'inkwash'
  | 'junglevibe'
  | 'kawaiipastel'
  | 'lava'
  | 'leather'
  | 'liquidgold'
  | 'luxury'
  | 'luxuryblack'
  | 'luxurymarble'
  | 'luxuryvelvetgold'
  | 'magazine'
  | 'magical'
  | 'manga'
  | 'map'
  | 'marble'
  | 'marbleobsidian'
  | 'matrix'
  | 'medal'
  | 'metalsteel'
  | 'midnight'
  | 'midnightconstellation'
  | 'minimal'
  | 'minimalblack'
  | 'minimalistdarkred'
  | 'minimalistline'
  | 'minimalistteal'
  | 'minimalistwarm'
  | 'minimalistzenstone'
  | 'modern'
  | 'modernartdeco'
  | 'modernbauhaus'
  | 'modernbrutalist'
  | 'modernscandi'
  | 'monochromebold'
  | 'mosaic'
  | 'nebula'
  | 'neon'
  | 'neoncity'
  | 'neoncyberpulse'
  | 'neondreams'
  | 'neonvibe'
  | 'newspaper'
  | 'newspaperclassic'
  | 'note'
  | 'ocean'
  | 'oldnewspaper'
  | 'organic'
  | 'organicclay'
  | 'organicterra'
  | 'origami'
  | 'paper'
  | 'passport'
  | 'pastel'
  | 'pasteldreams'
  | 'pastelsoftglow'
  | 'patchwork'
  | 'pixel'
  | 'pixeladventure'
  | 'pixelart'
  | 'pixelcity'
  | 'pixelrpg'
  | 'poker'
  | 'polaroid'
  | 'pop'
  | 'popretro'
  | 'popvibrant'
  | 'prismshard'
  | 'professional'
  | 'professionalnavy'
  | 'quietzen'
  | 'receipt'
  | 'retro'
  | 'retrocassettetape'
  | 'retrofuture'
  | 'retropop'
  | 'retroterminal'
  | 'royal'
  | 'rust'
  | 'safari'
  | 'scroll'
  | 'sketch'
  | 'sketchbook'
  | 'sketchcharcoalpro'
  | 'slate'
  | 'soft'
  | 'softpastel'
  | 'space'
  | 'stainedglass'
  | 'stamp'
  | 'stark'
  | 'steelplate'
  | 'sticker'
  | 'stuccowhite'
  | 'swiss'
  | 'tech'
  | 'techblueprint'
  | 'techgridblue'
  | 'techno'
  | 'terminal80s'
  | 'terrazzo'
  | 'ticket'
  | 'typewriter'
  | 'urbanindustrial'
  | 'vaporwave'
  | 'velvet'
  | 'vhs'
  | 'vibrantblob'
  | 'vintage'
  | 'vintagenewspaperads'
  | 'vintagetravel'
  | 'vintagetypewriterink'
  | 'vinyl'
  | 'volcanicash'
  | 'warmwoodgrain'
  | 'washi'
  | 'watercolor'
  | 'whitemarble'
  | 'wood'
  | 'woodebony'
  | 'zen'
  | 'zenstone';

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
