import TextLoader from '@/components/common/TextLoader';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import { Subheading } from 'react-native-paper';

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
