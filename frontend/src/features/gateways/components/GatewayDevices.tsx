import { IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CreateDeviceDto, Gateway } from "../models";
import DeviceCard from "./DeviceCard";
import { useAppDispatch } from "app/hooks";
import { addDeviceToGateway, removeDeviceFromGateway } from "../asyncActions";
import { useState } from "react";
import AddDeviceDialog from "./AddDeviceDialog";

interface Props {
  gateway: Gateway;
}

const GatewayDevices: React.FC<Props> = ({ gateway }) => {
  const dispatch = useAppDispatch();
  const [openDeviceDialog, setOpenDeviceDialog] = useState(false);

  const onRemoveDevice = (deviceId: string) => {
    dispatch(
      removeDeviceFromGateway({
        id: gateway._id,
        deviceId,
      })
    );
  };

  const onAddDevice = () => {
    setOpenDeviceDialog(true);
  };

  const onCloseDeviceDialog = () => {
    setOpenDeviceDialog(false);
  };

  const onCreateDevice = (createDeviceDto: CreateDeviceDto) => {
    dispatch(addDeviceToGateway({ id: gateway._id, device: createDeviceDto }))
      .unwrap()
      .then(() => {
        onCloseDeviceDialog();
      })
      .catch(() => {});
  };

  return (
    <>
      <Toolbar sx={{ alignItems: "center" }}>
        <Typography variant="h5" component="h2">
          Devices
        </Typography>
        <IconButton
          aria-label="add device"
          title="Add device"
          onClick={onAddDevice}
        >
          <AddIcon />
        </IconButton>
      </Toolbar>

      <Stack spacing={2}>
        {gateway.devices.map((device) => (
          <DeviceCard
            key={device._id}
            device={device}
            onRemove={onRemoveDevice}
          />
        ))}
      </Stack>

      <AddDeviceDialog
        open={openDeviceDialog}
        onClose={onCloseDeviceDialog}
        onCreate={onCreateDevice}
      />
    </>
  );
};

export default GatewayDevices;
