import formatCasperAmount from '@/helpers/formatCasperAmount';
import truncateInMiddle from '@/helpers/truncateInMiddle';
import { Caption, Card, Paragraph } from 'react-native-paper';

export default function ({ validator, staked, formattedPercentOfTotal, delegationRate }) {
  const description = `${formattedPercentOfTotal}% of your staked funds ꞏ Validator ${truncateInMiddle(validator)}`;

  return (
    <Card style={{ marginLeft: 12, marginBottom: 12 }}>
      <Card.Content>
        <Paragraph>
          {formatCasperAmount(staked)}
        </Paragraph>
        <Caption>
          {description}
        </Caption>
      </Card.Content>
    </Card>
  );
}
