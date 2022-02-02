import TextLoader from '@/components/common/TextLoader';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import { Subheading } from 'react-native-paper';

/**
 * Balance wrapped loader component
 * @param loading
 * @param amount
 * @param style
 * @returns {JSX.Element}
 * @constructor
 */
export default function BalanceLoaderOrAmount({ loading, amount, style }) {
  return loading
    ? <TextLoader
      width={150}
      height={28}
    />
    : (
      <Subheading style={style}>
        {formatCasperAmount(amount)}
      </Subheading>
    );
}
