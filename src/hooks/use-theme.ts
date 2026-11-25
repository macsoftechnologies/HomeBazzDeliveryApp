import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const themes = {
  light: Colors.light,
  dark: Colors.dark,
};

export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? 'dark' : 'light';

  return themes[theme];
}
