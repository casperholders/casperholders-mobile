import Alert from '@/components/common/Alert';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function DeployForm(
  {
    icon,
    name,
    disabled,
    loading,
    error,
    children,
    dialogChildren,
    dialogVisible,
    handleDialogOpen,
    handleDialogClose,
    handleDialogConfirm,
  },
) {
  return (
    <>
      {error && <Alert
        type="error"
        message={error.message}
      />}
      {children}
      <Button
        mode="contained"
        icon={icon}
        style={styles.submitButton}
        disabled={disabled}
        loading={loading}
        onPress={handleDialogOpen}
      >
        {name}
      </Button>
      <ConfirmDialog
        visible={dialogVisible}
        title={`Confirm ${name}`}
        confirmLabel={name}
        confirmIcon={icon}
        onClose={handleDialogClose}
        onConfirm={handleDialogConfirm}
      >
        {dialogChildren}
      </ConfirmDialog>
    </>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 'auto',
  },
});