import { IconButton, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Device } from "../models";
import styles from "./DeviceCard.module.scss";
import DeviceStatus from "./DeviceStatus";

interface Props {
  device: Device;
  onRemove: (deviceId: string) => void;
}

const DeviceCard: React.FC<Props> = ({ device, onRemove }) => {
  const onRemoveClick = () => {
    onRemove(device._id);
  };

  return (
    <Paper className={styles.container} sx={{ p: 2 }}>
      <div className={styles.content}>
        <span>
          UID: <strong>{device.uid}</strong>
        </span>
        <span>
          Vendor: <strong>{device.vendor}</strong>
        </span>
        <span>
          <DeviceStatus status={device.status} />
        </span>
      </div>

      <IconButton
        className={styles.removeButton}
        aria-label="remove device"
        title="Remove device"
        onClick={onRemoveClick}
      >
        <CloseIcon />
      </IconButton>
    </Paper>
  );
};

export default DeviceCard;
