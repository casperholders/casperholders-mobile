import GridCol from '@/components/grid/GridCol';
import { StyleSheet } from 'react-native';
import { Caption, Subheading } from 'react-native-paper';

/**
 * SectionHeading component
 * @param title
 * @param description
 * @returns {JSX.Element}
 * @constructor
 */
export default function SectionHeading({ title, description }) {
  return (
    <>
      <GridCol>
        <Subheading style={styles.textMarginLeft}>
          {title}
        </Subheading>
      </GridCol>
      {description && (
        <GridCol>
          <Caption style={styles.textMarginLeft}>
            {description}
          </Caption>
        </GridCol>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  textMarginLeft: {
    marginLeft: 8,
  },
});
