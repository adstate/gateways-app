import { TextField, TextFieldProps } from "@mui/material";
import { OutlinedTextFieldProps } from "@mui/material/TextField";
import {
  useController,
  useForm,
  ControllerProps,
  Control,
} from "react-hook-form";

export interface Props
  extends Omit<TextFieldProps, "name">,
    Pick<ControllerProps, "control" | "name"> {}

const FormIpAddressField: React.FC<Props> = ({
  control,
  name,
  label,
  ...rest
}) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty, error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const ipAddress = value.replace(/[^0-9\.]/g, "");

    field.onChange(ipAddress);
  };

  return (
    <TextField
      inputRef={field.ref}
      InputLabelProps={{ shrink: true }}
      name={field.name}
      label={label}
      value={field.value}
      error={invalid}
      onChange={changeHandler}
      onBlur={field.onBlur}
      helperText={error?.message}
      {...rest}
    />
  );
};

export default FormIpAddressField;
