import CardWithIcons from '@/components/common/CardWithIcons';
import Icon from '@/components/common/Icon';
import { CASPER_LIVE_URL, RPC } from '@/env';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import useDispatchSetDeployResult from '@/hooks/actions/useDispatchSetDeployResult';
import useDeployResult from '@/hooks/selectors/operations/useDeployResult';
import deployManager from '@/services/deployManager';
import {
  STATUS_KO,
  STATUS_OK,
  STATUS_UNKNOWN,
} from '@casperholders/core/dist/services/results/deployResult';
import { useEffect, useState } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import RNEventSource from 'react-native-event-source';
import { Caption, Paragraph, ProgressBar, useTheme } from 'react-native-paper';

const WATCHER_MAX_WAIT_IN_SECONDS = 60; // TODO 180

export default function OperationResult({ hash }) {
  const theme = useTheme();
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
    setDeployWatcher(new RNEventSource(`${RPC}/events/?start_from=0`));

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
        hash: deployResult.hash,
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

  const RESULT_STATUSES_ICONS = {
    [STATUS_UNKNOWN]: 'help-circle',
    [STATUS_OK]: 'check-circle',
    [STATUS_KO]: 'alert-circle',
  };
  const RESULT_STATUSES_COLORS = {
    [STATUS_UNKNOWN]: 'white',
    [STATUS_OK]: theme.colors.success,
    [STATUS_KO]: theme.colors.error,
  };

  const icon = RESULT_STATUSES_ICONS[deployResult.status];
  const color = RESULT_STATUSES_COLORS[deployResult.status];
  const url = `${CASPER_LIVE_URL}/deploy/${deployResult.hash}`;
  const details = `Amount: ${formatCasperAmount(deployResult.amount)} ꞏ Cost: ${formatCasperAmount(deployResult.cost)}`;
  const loading = deployResult.status === STATUS_UNKNOWN;
  const message = loading ? undefined : deployResult.message;

  return (
    <CardWithIcons
      left={<Icon
        name={icon}
        color={color}
        size={24}
        left
      />}
    >
      <View style={styles.deployHashWrapper}>
        <Paragraph
          numberOfLines={1}
          style={styles.deployHashText}
          onPress={() => Linking.openURL(url)}
        >
          {deployResult.hash}
        </Paragraph>
        <Icon
          name="open-in-new"
          style={styles.deployHashIcon}
        />
      </View>
      <Caption>
        {details}
      </Caption>
      {loading && <ProgressBar
        style={styles.deployProgress}
        indeterminate
      />}
      {message && <Caption>{message}</Caption>}
    </CardWithIcons>
  );
}

const styles = StyleSheet.create({
  deployHashWrapper: {
    flexDirection: 'row',
  },
  deployHashText: {
    textDecorationLine: 'underline',
  },
  deployHashIcon: {
    alignSelf: 'flex-start',
  },
  deployProgress: {
    marginTop: 4,
    borderRadius: 4,
  },
});
