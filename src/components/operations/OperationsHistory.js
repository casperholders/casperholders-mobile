import Alert from '@/components/common/Alert';
import ButtonGroup from '@/components/common/ButtonGroup';
import CardLoader from '@/components/common/CardLoader';
import SectionHeading from '@/components/common/SectionHeading';
import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import OperationsCard from '@/components/operations/OperationsCard';
import useDispatchUnsetDeployResult from '@/hooks/actions/useDispatchUnsetDeployResult';
import useDeployResultsHashs from '@/hooks/selectors/operations/useDeployResultsHashs';
import useHistory from '@/hooks/useHistory';
import { CurrencyUtils } from '@casperholders/core/dist/services/helpers/currencyUtils';
import { STATUS_KO, STATUS_OK } from '@casperholders/core/dist/services/results/deployResult';
import { useEffect, useState } from 'react';
import { Button, useTheme } from 'react-native-paper';

const QUICK_FILTERS = [
  { text: 'Transfer', query: 'type=eq.transfer' },
  { text: 'Stake', query: 'type=eq.delegate' },
  { text: 'Unstake', query: 'type=eq.undelegate' },
];

QUICK_FILTERS.push({
  text: 'Other', query: `type=not.in.(${QUICK_FILTERS.map(
    ({ query }) => `"${query.replace('type=eq.', '')}"`,
  ).join(',')})`,
});

export default function OperationsHistory() {
  const theme = useTheme();
  const dispatchUnsetDeployResult = useDispatchUnsetDeployResult();
  const deployResultsHashs = useDeployResultsHashs();
  const [filter, setFilter] = useState();
  const [page, setPage] = useState(0);
  const [historyLoading, history, historyError] = useHistory(page, filter?.query);

  useEffect(() => {
    if (page === 0 && history) {
      history.operations.forEach(({ hash }) => {
        const lowerHash = hash.toLowerCase();
        if (deployResultsHashs.includes(lowerHash)) {
          dispatchUnsetDeployResult({ deployResult: { hash: lowerHash } });
        }
      });
    }
  }, [history]);

  const convertMotesToCasper = (amount) => (
    amount ? CurrencyUtils.convertMotesToCasper(amount) : undefined
  );

  const handleToggleFilter = (newFilter) => {
    if (!historyLoading) {
      if (filter !== newFilter) {
        setPage(0);
      }

      setFilter(filter === newFilter ? undefined : newFilter);
    }
  };

  const handleChangePage = (toPage) => {
    if (!historyLoading) {
      setPage(toPage);
    }
  };

  return (
    <GridRow>
      <SectionHeading
        title="Past operations"
        description={(
          historyLoading
            ? 'Loading operations'
            : (
              !historyError && (
                history.operations.length
                  ? `${history.total} past operations.`
                  : 'No past operations available.'
              )
            )
        )}
      />
      <GridCol>
        <ButtonGroup>
          {QUICK_FILTERS.map((quickFilter, index) => (
            <Button
              key={index}
              mode={filter === quickFilter && 'contained'}
              color={filter === quickFilter ? theme.colors.primary : theme.colors.text}
              onPress={() => handleToggleFilter(quickFilter)}
            >
              {quickFilter.text}
            </Button>
          ))}
        </ButtonGroup>
      </GridCol>
      {historyLoading && (
        <>
          <GridCol>
            <CardLoader height={100} />
          </GridCol>
          <GridCol>
            <CardLoader height={100} />
          </GridCol>
        </>
      )}
      {!historyLoading && historyError &&
        (<GridCol><Alert
          type="error"
          message={historyError.message}
        /></GridCol>)}
      {!historyLoading && !historyError && (
        <>
          {history.operations.map((deployData) => (
            <GridCol key={deployData.hash}>
              <OperationsCard
                type={deployData.type}
                hash={deployData.hash}
                status={deployData.result ? STATUS_OK : STATUS_KO}
                amount={convertMotesToCasper(deployData.data.amount)}
                cost={convertMotesToCasper(deployData.cost)}
              />
            </GridCol>
          ))}
          <GridCol width={1 / 2}>
            <Button
              mode="contained"
              icon="chevron-left"
              disabled={page === 0}
              loading={historyLoading}
              onPress={() => handleChangePage(page - 1)}
            >
              Previous
            </Button>
          </GridCol>
          <GridCol width={1 / 2}>
            <Button
              mode="contained"
              icon="chevron-right"
              contentStyle={{ flexDirection: 'row-reverse' }}
              disabled={history?.total <= 10 || Math.trunc(history?.total / 10) === page}
              loading={historyLoading}
              onPress={() => handleChangePage(page + 1)}
            >
              Next
            </Button>
          </GridCol>
        </>
      )}
    </GridRow>
  );
}
