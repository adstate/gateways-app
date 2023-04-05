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

const FormTextField: React.FC<Props> = ({ control, name, label, ...rest }) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty, error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <TextField
      inputRef={field.ref}
      InputLabelProps={{ shrink: true }}
      name={field.name}
      label={label}
      value={field.value}
      error={invalid}
      helperText={error?.message}
      onChange={field.onChange}
      onBlur={field.onBlur}
      {...rest}
    />
  );
};

export default FormTextField;
