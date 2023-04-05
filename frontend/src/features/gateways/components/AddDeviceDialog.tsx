import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormTextField from "common/FormTextField";
import { MenuItem, Stack } from "@mui/material";
import { CreateDeviceDto } from "../models";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import FormNumberField from "common/FormNumberField";
import FormSelectField from "common/FormSelectField";

interface Props {
  open: boolean;
  onCreate: (data: CreateDeviceDto) => void;
  onClose: () => void;
}

const deviceSchema = yup.object({
  uid: yup.string().default("").required("Field is required"),
  vendor: yup.string().default("").required("Field is required"),
  status: yup.string().default("").required("Field is required"),
});

const defaultValues = {
  uid: "",
  vendor: "",
  status: "",
};

const AddDeviceDialog: React.FC<Props> = ({ open, onClose, onCreate }) => {
  const { control, handleSubmit, reset } = useForm<any>({
    resolver: yupResolver(deviceSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (createDeviceDto: CreateDeviceDto) => {
    onCreate(createDeviceDto);
  };

  useEffect(() => {
    reset();
  }, [open]);

  return (
    <Dialog
      PaperProps={{ sx: { p: 2, minWidth: "600px" } }}
      open={open}
      onBackdropClick={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add device</DialogTitle>
        <DialogContent>
          <Stack sx={{ pt: 1 }} spacing={2}>
            <FormNumberField name="uid" label="UID" control={control} />
            <FormTextField name="vendor" label="Vendor" control={control} />
            <FormSelectField name="status" label="Status" control={control}>
              <MenuItem value="online">Online</MenuItem>
              <MenuItem value="offline">Offline</MenuItem>
            </FormSelectField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddDeviceDialog;
