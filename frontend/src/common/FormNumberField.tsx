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

const FormNumberField: React.FC<Props> = ({
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
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    field.onChange(value.replace(/[^0-9]/g, ""));
  };

  return (
    <TextField
      inputRef={field.ref}
      InputLabelProps={{ shrink: true }}
      name={field.name}
      label={label}
      value={field.value}
      onChange={changeHandler}
      onBlur={field.onBlur}
      error={invalid}
      helperText={error?.message}
      {...rest}
    />
  );
};

export default FormNumberField;
