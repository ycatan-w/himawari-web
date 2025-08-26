import { amber, lime, indigo } from '@/colors'
const themes = ['amber', 'lime', 'indigo'] as const;
export type Theme = typeof themes[number];
type ColorsByFeatures = {
  [K in Theme]: Record<string, Record<string, string>>;
};
const colorsByFeatures: ColorsByFeatures = { amber, lime, indigo };
const getRandomColorPalette = (): Theme => {
  const index = Math.floor(Math.random() * themes.length)
  return themes[index]
};

const featureThemes: Record<string, Theme> = {};
export function useFeatureColorTheme(feature: string, reset: boolean = false) {
  if (!featureThemes[feature] || reset) {
    featureThemes[feature] = getRandomColorPalette();
  }

  return {
    colorPalette: featureThemes[feature],
    featureColorTheme: colorsByFeatures[featureThemes[feature]][feature] ?? {}
  };
}

export function useCommonColorTheme(color: Theme, feature: string) {
  return colorsByFeatures[color][feature] ?? {}
}
