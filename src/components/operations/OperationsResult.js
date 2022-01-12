import OperationsCard from '@/components/operations/OperationsCard';
import useDispatchSetDeployResult from '@/hooks/actions/useDispatchSetDeployResult';
import useDeployResult from '@/hooks/selectors/operations/useDeployResult';
import deployManager from '@/services/deployManager';
import { STATUS_KO, STATUS_UNKNOWN } from '@casperholders/core/dist/services/results/deployResult';
import { APP_RPC_URL } from '@env';
import { useEffect, useState } from 'react';
import RNEventSource from 'react-native-event-source';

const WATCHER_MAX_WAIT_IN_SECONDS = 180;

export default function OperationsResult({ hash }) {
  const deployResult = useDeployResult(hash);
  const [timedOut, setTimedOut] = useState(false);
  const [deployWatcher, setDeployWatcher] = useState(undefined);
  const stopDeployWatching = () => {
    if (deployWatcher) {
      deployWatcher.removeAllListeners();
      deployWatcher.close();
      setDeployWatcher(undefined);
    }
  };

  useEffect(() => {
    setDeployWatcher(new RNEventSource(`${APP_RPC_URL}/events/?start_from=0`));

    const timeout = setTimeout(() => {
      setTimedOut(true);
    }, WATCHER_MAX_WAIT_IN_SECONDS * 1000);

    return () => {
      clearTimeout(timeout);
      stopDeployWatching();
    };
  }, []);

  useEffect(() => {
    if (deployWatcher) {
      deployWatcher.addEventListener('message', async (event) => {
        const data = JSON.parse(event.data);
        if ('DeployProcessed' in data && data.DeployProcessed.deploy_hash.toLowerCase() === hash) {
          stopDeployWatching();
          await updateDeployResult();
        }
      });
    }
  }, [deployWatcher]);

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
      if (timedOut && deployResult.status === STATUS_UNKNOWN) {
        stopDeployWatching();
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
  }, [timedOut]);

  return <OperationsCard
    type={deployResult.name}
    hash={deployResult.hash}
    status={deployResult.status}
    amount={deployResult.amount}
    cost={deployResult.cost}
    message={deployResult.message}
  />;
}
