import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import OperationResult from '@/components/operations/OperationResult';
import useDispatchDisconnect from '@/hooks/actions/useDispatchDisconnect';
import useDeployResultsHashs from '@/hooks/selectors/operations/useDeployResultsHashs';
import { StyleSheet } from 'react-native';
import { Button, Paragraph, Subheading } from 'react-native-paper';

export default function AccountScreen() {
  const dispatchDisconnect = useDispatchDisconnect();
  const deployResultsHashs = useDeployResultsHashs();

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
