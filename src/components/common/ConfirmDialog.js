import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, useTheme } from 'react-native-paper';

export default function ConfirmDialog(
  { visible, title, confirmLabel, children, onClose, onConfirm },
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
