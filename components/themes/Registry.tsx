import React from 'react';
import { CardTheme } from '../../types';
import { ThemeComponent, ThemeProps } from './ThemeTypes';
import { themeMap } from './themes.generated';

export const renderThemeById = (themeId: CardTheme, props: ThemeProps) => {
  const Component = themeMap[themeId];
  if (Component) {
    return <Component {...props} />;
  }
  return null;
};
