import Erc20TokenBalance from '@/components/balance/Erc20TokenBalance';
import Alert from '@/components/common/Alert';
import CardWithIcons from '@/components/common/CardWithIcons';
import Icon from '@/components/common/Icon';
import TextLoader from '@/components/common/TextLoader';
import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import useErc20Balances from '@/hooks/useErc20Balances';
import { useMemo, useState } from 'react';
import { Caption, Subheading } from 'react-native-paper';

export default function Erc20Balances({ uniqueKey }) {
  const [loading, tokensData, tokensError] = useErc20Balances([uniqueKey]);
  const [opened, setOpened] = useState(false);

  const canOpen = useMemo(() => !loading && !!tokensData.tokens.length, [loading, tokensData]);

  const icon = useMemo(() => (
    canOpen && <Icon
      name={opened ? 'chevron-up' : 'chevron-down'}
      size={24}
      right
    />
  ), [canOpen, opened]);

  const onToggleOpened = useMemo(() => canOpen ? () => {
    setOpened(!opened);
  } : undefined, [canOpen, opened]);

  return (
    <GridRow>
      <GridCol>
        <CardWithIcons
          left={<Icon
            name="circle-multiple-outline"
            size={24}
            left
          />}
          right={icon}
          testID="erc20Toggle"
          onPress={onToggleOpened}
        >
          {loading ? <TextLoader
            width={150}
            height={28}
          /> : <Subheading style={{ fontWeight: 'bold' }}>
            {tokensData.tokens.length} tokens with funds
          </Subheading>}
          <Caption>
            ERC20 tokens
          </Caption>
        </CardWithIcons>
      </GridCol>
      {opened && <GridCol>
        {tokensError && <Alert
          type="error"
          message={`An unknown error occurred while fetching your ERC20 tokens: ${tokensError.message}`}
        />}
        {tokensData.tokens.map((token) => (
          <Erc20TokenBalance
            key={token.id}
            token={token}
            balance={tokensData.balances[token.id]}
          />
        ))}
      </GridCol>}
    </GridRow>
  );
}
