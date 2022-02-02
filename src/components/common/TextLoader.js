import ContentLoader, { Rect } from 'react-content-loader/native';
import { useTheme } from 'react-native-paper';

/**
 * Text loader component
 * @param width
 * @param height
 * @returns {JSX.Element}
 * @constructor
 */
export default function TextLoader({ width, height }) {
  const theme = useTheme();

  return (
    <ContentLoader
      style={{ width: '100%' }}
      speed={1}
      width={width}
      height={height}
      backgroundColor={theme.colors.background}
      foregroundColor={theme.colors.textLoader}
    >
      <Rect
        width={width}
        height={height}
        rx={theme.roundness}
        ry={theme.roundness}
      />
    </ContentLoader>
  );
}
