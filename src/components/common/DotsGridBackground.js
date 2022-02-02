import { ImageBackground, StyleSheet } from 'react-native';

/**
 * Dot grid background
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export default function DotsGridBackground({ children }) {
  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
});
