import Alert from '@/components/common/Alert';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

/**
 * Deploy form
 * @param icon
 * @param name
 * @param disabled
 * @param loading
 * @param error
 * @param children
 * @param dialogChildren
 * @param dialogVisible
 * @param handleDialogOpen
 * @param handleDialogClose
 * @param handleDialogConfirm
 * @returns {JSX.Element}
 * @constructor
 */
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
