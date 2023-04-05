import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { ControllerProps, useController } from "react-hook-form";

export interface Props
  extends Omit<SelectProps, "name">,
    Pick<ControllerProps, "control" | "name"> {}

const FormSelectField: React.FC<Props> = ({
  control,
  name,
  label,
  children,
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

  return (
    <FormControl error={invalid} fullWidth>
      <InputLabel sx={{ backgroundColor: "#fff", padding: "0 2px" }} shrink>
        {label}
      </InputLabel>
      <Select
        name={field.name}
        value={field.value}
        label={label}
        onChange={field.onChange}
        {...rest}
      >
        {children}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default FormSelectField;
