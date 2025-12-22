import React from 'react';
import { CardData, CardStyle } from '../../types';

export interface ThemeProps {
  data: CardData;
  style: CardStyle;
  displayData: any;
  renderDraggableField: (id: string, children: React.ReactNode, className?: string, customStyle?: React.CSSProperties) => React.ReactNode;
  renderQRCodeElement: (side: 'front' | 'back') => React.ReactNode;
  s: (base: number) => number;
  isBack: boolean;
}

export type ThemeComponent = React.FC<ThemeProps>;


