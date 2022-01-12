import OperationsCard from '@/components/operations/OperationsCard';
import useDispatchSetDeployResult from '@/hooks/actions/useDispatchSetDeployResult';
import useDeployResult from '@/hooks/selectors/operations/useDeployResult';
import useEventSource from '@/hooks/useEventSource';
import useInterval from '@/hooks/useInterval';
import deployManager from '@/services/deployManager';
import { STATUS_KO, STATUS_UNKNOWN } from '@casperholders/core/dist/services/results/deployResult';
import { APP_RPC_URL } from '@env';
import { useEffect, useState } from 'react';

const WATCHER_MAX_WAIT_IN_SECONDS = 180;

export default function OperationsResult({ hash }) {
  const deployResult = useDeployResult(hash);
  const stopDeployListening = useEventSource(
    `${APP_RPC_URL}/events/?start_from=0`,
    async (event) => {
      const data = JSON.parse(event.data);
      if ('DeployProcessed' in data && data.DeployProcessed.deploy_hash.toLowerCase() === hash) {
        stopDeployListening();
        await updateDeployResult();
      }
    },
  );

  const [secondsBeforeTimeout, setSecondsBeforeTimeout] = useState(WATCHER_MAX_WAIT_IN_SECONDS);
  const clearInterval = useInterval(() => {
    if ((secondsBeforeTimeout - 1) === 0) {
      clearInterval();
    }

    setSecondsBeforeTimeout(secondsBeforeTimeout - 1);
  }, 1000);

  const dispatchSetDeployResult = useDispatchSetDeployResult();
  const updateDeployResult = async () => {
    if (deployResult.status !== STATUS_UNKNOWN) {
      return deployResult;
    }

    try {
      const updatedDeployResult = await deployManager.getDeployResult({
        name: deployResult.name,
        hash: deployResult.hash,
        cost: deployResult.cost,
        status: deployResult.status,
        message: deployResult.message,
        amount: deployResult.amount,
      });
      if (updatedDeployResult.status !== STATUS_UNKNOWN) {
        dispatchSetDeployResult({ deployResult: updatedDeployResult });
      }

      return updatedDeployResult;
    } catch (error) {
      console.error(error);

      return undefined;
    }
  };

  useEffect(() => {
    (async () => {
      if (secondsBeforeTimeout === 0 && deployResult.status === STATUS_UNKNOWN) {
        stopDeployListening();
        const updatedDeployResult = await updateDeployResult();
        if (updatedDeployResult?.status === STATUS_UNKNOWN) {
          dispatchSetDeployResult({
            deployResult: {
              ...(updatedDeployResult || deployResult),
              status: STATUS_KO,
              message: 'No deploy result from the network. Please check on cspr.live or reach someone on the discord with the deploy hash.',
            },
          });
        }
      }
    })();
  }, [secondsBeforeTimeout]);

  return <OperationsCard
    type={deployResult.name}
    hash={deployResult.hash}
    status={deployResult.status}
    amount={deployResult.amount}
    cost={deployResult.cost}
    message={deployResult.message}
    additionalInfo={(
      deployResult.status === STATUS_UNKNOWN && secondsBeforeTimeout !== 0
        ? `Waiting event: ${secondsBeforeTimeout}sec before forced fetch`
        : undefined
    )}
  />;
}
