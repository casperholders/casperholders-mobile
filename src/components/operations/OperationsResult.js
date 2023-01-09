import OperationsCard from '@/components/operations/OperationsCard';
import useDispatchSetDeployResult from '@/hooks/actions/useDispatchSetDeployResult';
import useDeployResult from '@/hooks/operations/useDeployResult';
import useEventSource from '@/hooks/useEventSource';
import useInterval from '@/hooks/useInterval';
import useNetwork from '@/hooks/useNetwork';
import deployManager from '@/services/deployManager';
import { CurrencyUtils, DeployResult } from '@casperholders/core';
import { useEffect, useState } from 'react';

const WATCHER_MAX_WAIT_IN_SECONDS = 180;

/**
 * Display operation result
 * @param hash
 * @returns {JSX.Element}
 * @constructor
 */
export default function OperationsResult({ hash }) {
  const deployResult = useDeployResult(hash);
  const network = useNetwork();
  const stopDeployListening = useEventSource(
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
    if (deployResult.status !== DeployResult.STATUS_UNKNOWN) {
      return deployResult;
    }

    try {
      const updatedDeployResult = await deployManager(network.rpcUrl).getDeployResult({
        name: deployResult.name,
        hash: deployResult.hash,
        cost: deployResult.cost,
        status: deployResult.status,
        message: deployResult.message,
        amount: deployResult.amount,
      });
      if (updatedDeployResult.amount) {
        updatedDeployResult.amount = CurrencyUtils.convertMotesToCasper(updatedDeployResult.amount);
      }
      if (updatedDeployResult.status !== DeployResult.STATUS_UNKNOWN) {
        dispatchSetDeployResult({ deployResult: updatedDeployResult });
      }

      return updatedDeployResult;
    } catch (error) {
      return undefined;
    }
  };

  useEffect(() => {
    (async () => {
      if (secondsBeforeTimeout === 0 && deployResult.status === DeployResult.STATUS_UNKNOWN) {
        stopDeployListening();
        const updatedDeployResult = await updateDeployResult();
        if (!updatedDeployResult || updatedDeployResult.status === DeployResult.STATUS_UNKNOWN) {
          dispatchSetDeployResult({
            deployResult: {
              ...(updatedDeployResult || deployResult),
              status: DeployResult.STATUS_KO,
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
      deployResult.status === DeployResult.STATUS_UNKNOWN && secondsBeforeTimeout !== 0
        ? `Waiting event: ${secondsBeforeTimeout}sec before forced fetch`
        : undefined
    )}
  />;
}
