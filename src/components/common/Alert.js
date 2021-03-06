import CardWithIcons from '@/components/common/CardWithIcons';
import Icon from '@/components/common/Icon';
import { Paragraph, useTheme } from 'react-native-paper';

/**
 * Alert component
 * @param type
 * @param message
 * @returns {JSX.Element}
 * @constructor
 */
export default function Alert({ type, message }) {
  const theme = useTheme();
  const ALERT_TYPES_ICONS = {
    info: 'information',
    error: 'alert',
    success: 'check',
  };
  const ALERT_TYPES_COLORS = {
    error: theme.colors.error,
    success: theme.colors.success,
  };

  const alertType = type || 'info';
  const icon = ALERT_TYPES_ICONS[alertType];
  const cardStyles = { marginBottom: 12 };
  if (ALERT_TYPES_COLORS[alertType]) {
    cardStyles.backgroundColor = ALERT_TYPES_COLORS[alertType];
  }

  return (
    <CardWithIcons
      style={cardStyles}
      left={<Icon
        name={icon}
        size={24}
        left
      />}
    >
      <Paragraph>
        {message}
      </Paragraph>
    </CardWithIcons>
  );
}
