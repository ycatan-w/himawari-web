const themes = ['amber', 'lime', 'indigo'] as const;

const colorsByFeatures = {
  amber: {
    plannerSelector: {
      container: 'bg-amber-600',
      button: 'bg-amber-500 hover:bg-amber-400',
      selected: 'bg-amber-700',
    }
  },
  lime: {
    plannerSelector: {
      container: 'bg-lime-600',
      button: 'bg-lime-500 hover:bg-lime-400',
      selected: 'bg-lime-700',
    }  },
  indigo: {
    plannerSelector: {
      container: 'bg-indigo-600',
      button: 'bg-indigo-500 hover:bg-indigo-400',
      selected: 'bg-indigo-700',
    }
  }
};
export type Theme = typeof themes[number];

export function getRandomTheme(): Theme {
  const index = Math.floor(Math.random() * themes.length)
  return themes[index]
}
