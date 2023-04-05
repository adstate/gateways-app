import { Alert, AlertColor, AlertProps, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { clearNotification } from "features/gateways/gatewaySlice";
import { useEffect, useState } from "react";

export interface Notification {
  severity: AlertColor;
  message: string;
}

const Notification: React.FC = () => {
  const { notification } = useAppSelector((s) => s.gateways);
  const [severity, setSeverity] = useState<AlertColor>();
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notification) {
      setSeverity(notification.severity);
      setMessage(notification.message);
    }
  }, [notification]);

  const onClose = () => {
    dispatch(clearNotification());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={Boolean(notification)}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
