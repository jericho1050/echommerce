import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from '@mui/material';

function NotificationButton() {
    return (
      <IconButton>
        <NotificationsIcon  fontSize="large"  sx={{ height: 30, width: 30, color: 'white'}}/>
      </IconButton>
    );
  }

  export default NotificationButton;