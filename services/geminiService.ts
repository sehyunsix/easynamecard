
import { getGenerativeModel } from "firebase/ai";
import { ai } from "../firebase";

// Function to refine content using Firebase AI
export const refineContent = async (type: 'goal' | 'goalEn', input: string, position: string) => {
  const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

  let prompt = "";
  if (type === 'goal') {
    prompt = `Refine this professional goal for a business card. Position: ${position}. Raw goal: "${input}". Make it professional, concise, and inspiring (max 80 characters). Return only the refined text.`;
  } else if (type === 'goalEn') {
    prompt = `Translate this Korean career goal to professional English for a business card.
    Korean Goal: "${input}"
    Position: ${position}

    Make it professional, concise, and inspiring (max 80 characters). Use natural business English. Return only the translated text.`;
  }

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text()?.trim() || input;
  } catch (error) {
    console.error("Firebase AI Error:", error);
    return input;
  }
};

export const suggestDesign = async (data: any) => {
  const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

  const prompt = `Based on this professional info:
Name: ${data.name}
Position: ${data.position}
Goal: ${data.goal}

Suggest a business card design. Choose from themes: 'modern', 'minimal', 'creative', 'professional', 'dark', 'glassmorphism', 'elegant', 'tech', 'bold', 'classic', 'luxury', 'geometric', 'retro', 'organic', 'pop', 'cyber', 'eco', 'blueprint', 'neon', 'newspaper', 'sketch', 'brutalist', 'pastel', 'gradient', 'architect', 'comic', 'midnight', 'vintage', 'pixel', 'soft', 'industrial', 'futuristic', 'holographic', 'swiss', 'botanical', 'artdeco', 'minimalblack', 'cardboard', 'zen', 'magical', 'chalk', 'magazine', 'sticker', 'space', 'marble', 'wood', 'paper', 'techno', 'glitch', 'bauhaus', 'carbon', 'watercolor', 'denim', 'goldleaf', 'pixelart', 'concrete', 'circuit', 'mosaic', 'origami', 'bamboo', 'leather', 'vhs', 'clay', 'matrix', 'candy', 'poker', 'safari', 'royal', 'map', 'manga', 'receipt', 'passport', 'ticket', 'stamp', 'note', 'medal', 'cyanotype', 'embroidery', 'stainedglass', 'certificate', 'vinyl', 'cassette', 'polaroid', 'gameboy', 'typewriter', 'chess', 'sketchbook', 'diamond', 'forest', 'ocean', 'lava', 'ice', 'honey', 'nebula', 'scroll', 'graffiti', 'gazette', 'wood-ebony', 'metal-steel', 'pop-retro', 'liquid-gold', 'stark', 'terrazzo', 'washi', 'cork', 'velvet', 'rust', 'slate', 'gothic', 'bento', 'cyber-grid', 'botanical-art', 'luxury-marble', 'retro-terminal', 'modern-scandi', 'vibrant-blob', 'tech-blueprint', 'elegant-damask', 'creative-collage', 'professional-navy', 'abstract-paint', 'minimalist-warm', 'neon-vibe', 'blueprint-red', 'ink-wash', 'glam-gold', 'cyber-pulse', 'desert-sand', 'aurora-borealis', 'minimalist-dark-red', 'patchwork', 'monochrome-bold', 'futuristic-white', 'pixel-city', 'warm-wood-grain', 'frosted-mint', 'deep-crimson', 'charcoal-sketch', 'electric-blue', 'vintage-travel', 'pastel-dreams', 'modern-art-deco', 'brutalist-color', 'eco-friendly', 'retro-future', 'dark-botanical', 'stucco-white', 'indigo-dye', 'copper-plate', 'minimalist-teal', 'cyberpunk-red', 'arctic-white', 'desert-oasis', 'volcanic-ash', 'deep-sea-pearl', 'celestial-gold', 'urban-industrial', 'vintage-typewriter-ink', 'minimalist-zen-stone', 'neon-cyber-pulse', 'forest-canopy', 'marble-obsidian', 'tech-grid-blue', 'organic-terra', 'futuristic-glass', 'retro-cassette-tape', 'luxury-velvet-gold', 'geometric-vivid', 'pop-vibrant', 'blueprint-white', 'newspaper-classic', 'sketch-charcoal-pro', 'brutalist-raw', 'pastel-soft-glow', 'architect-monochrome', 'comic-action', 'midnight-constellation', 'vintage-newspaper-ads', 'pixel-adventure', 'bento-clean-cut'.
Provide hex colors for primary and accent that suit this profile.
Return ONLY a JSON object with: { "theme": "...", "primaryColor": "#...", "accentColor": "#...", "contentScale": 1.0 }`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text()?.trim() || "";
    const jsonMatch = text.match(/\{.*\}/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return null;
  } catch (error) {
    console.error("Firebase AI Suggest Error:", error);
    return null;
  }
};

// New: Generate English Name and Career Goal using AI Logic
export const translateToEnglish = async (name: string, goal: string, position: string) => {
  const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

  const prompt = `Translate and professionalize this Korean business card info to English.
Korean Name: ${name}
Korean Position: ${position}
Korean Career Goal: ${goal}

Return ONLY a JSON object with:
{
  "nameEn": "Professional English Name (e.g. Gildong Hong or Gildong (John) Hong)",
  "positionEn": "Professional English Position Title",
  "goalEn": "Professional English Career Goal (concise, max 80 chars)"
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text()?.trim() || "";
    const jsonMatch = text.match(/\{.*\}/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return null;
  } catch (error) {
    console.error("Firebase AI Translation Error:", error);
    return null;
  }
};
