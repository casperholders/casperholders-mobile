import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, useTheme } from 'react-native-paper';

/**
 * Confirm dialog component
 * @param visible
 * @param title
 * @param confirmLabel
 * @param confirmIcon
 * @param children
 * @param onClose
 * @param onConfirm
 * @returns {JSX.Element}
 * @constructor
 */
export default function ConfirmDialog(
  { visible, title, confirmLabel, confirmIcon, children, onClose, onConfirm },
) {
  const theme = useTheme();

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onClose}
      >
        <Dialog.Title>
          {title}
        </Dialog.Title>
        <Dialog.Content>
          {children}
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button
            color={theme.colors.text}
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            icon={confirmIcon}
            onPress={onConfirm}
          >
            {confirmLabel}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogActions: {
    justifyContent: 'space-between',
  },
});
