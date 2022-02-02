import ContentLoader, { Rect } from 'react-content-loader/native';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

/**
 * Card loader component
 * @param height
 * @returns {JSX.Element}
 * @constructor
 */
export default function CardLoader({ height }) {
  const theme = useTheme();

  return (
    <ContentLoader
      uniqueKey={`card-loader-${height}`}
      speed={1}
      style={styles.cardLoader}
      height={height}
      viewBox={`0 0 400 ${height}`}
      backgroundColor={theme.colors.textLoader}
      foregroundColor={theme.colors.background}
    >
      <Rect
        width={400}
        height={height}
        rx={theme.roundness}
        ry={theme.roundness}
      />
    </ContentLoader>
  );
}

const styles = StyleSheet.create({
  cardLoader: {
    width: '100%',
  },
});
