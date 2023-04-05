import { Chip } from "@mui/material";

interface Props {
  status: string;
}

const DeviceStatus: React.FC<Props> = ({ status }) => {
  return (
    <Chip
      label={status}
      size="small"
      color={status === "online" ? "success" : "error"}
    />
  );
};

export default DeviceStatus;
