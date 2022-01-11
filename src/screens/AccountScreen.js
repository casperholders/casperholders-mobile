import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import OperationResult from '@/components/operations/OperationResult';
import useDispatchDisconnect from '@/hooks/actions/useDispatchDisconnect';
import useDeployResultsHashs from '@/hooks/selectors/operations/useDeployResultsHashs';
import useHistory from '@/hooks/useHistory';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph, Subheading, Text } from 'react-native-paper';
import Loader from '../components/common/Loader';
import OperationHistory from '../components/operations/OperationHistory';

export default function AccountScreen() {
  const dispatchDisconnect = useDispatchDisconnect();
  const deployResultsHashs = useDeployResultsHashs();
  const [page, setPage] = useState(0);
  const [historyLoading, history, historyError] = useHistory([page]);
  return (
    <ScreenWrapper>
      <GridRow>
        <GridCol>
          <Subheading style={{ textAlign: 'center' }}>
            Recent operations
          </Subheading>
          {
            !deployResultsHashs.length &&
            <Paragraph style={{ textAlign: 'center' }}>No recent operation available.</Paragraph>
          }
        </GridCol>
        {deployResultsHashs.map((hash) => (
          <GridCol key={hash}>
            <OperationResult hash={hash} />
          </GridCol>
        ))}
      </GridRow>
      <GridRow>
        <GridCol>
          <Subheading style={{ textAlign: 'center' }}>
            Past operations
          </Subheading>
          {
            !historyLoading && !history?.operations?.length &&
            <Paragraph style={{ textAlign: 'center' }}>No past operations.</Paragraph>
          }
          {
            historyLoading &&
            <Loader />
          }
        </GridCol>
        {history?.operations?.map((deployData) => (
          <GridCol key={deployData.hash}>
            <OperationHistory deployData={deployData} />
          </GridCol>
        ))}
        {(!historyLoading || history?.total) &&
          (<>
            <GridCol>
              <Text style={{ textAlign: 'center' }}>
                Page {page+1} out of {Math.trunc(history?.total/10)+1}
              </Text>
            </GridCol>
            <GridCol width={0.5}>

              <Button
                mode="contained"
                icon="chevron-left"
                style={{ marginBottom: 10 }}
                disabled={page === 0}
                loading={historyLoading}
                onPress={() => setPage(page-1)}
              >
                Previous
              </Button>
            </GridCol>
            <GridCol width={0.5}>
              <Button
                mode="contained"
                icon="chevron-right"
                contentStyle={{flexDirection: 'row-reverse'}}
                style={{ marginBottom: 10 }}
                disabled={Math.trunc(history?.total/10) === page}
                loading={historyLoading}
                onPress={() => setPage(page+1)}
              >
                Next
              </Button>
            </GridCol>
          </>)
        }

      </GridRow>
      <Button
        mode="contained"
        icon="logout"
        style={styles.logoutBtn}
        onPress={() => dispatchDisconnect()}
      >
        Logout
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    marginTop: 'auto',
  },
});
