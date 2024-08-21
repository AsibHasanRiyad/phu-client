import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  onValueChange?: (value: string) => void; // Updated type
  options:
    | {
        value: string;
        label: string;
        disabled?: boolean;
      }[]
    | undefined;
};

const PHSelect = ({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange,
}: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Select
            mode={mode}
            size="middle"
            {...field}
            style={{ width: "100%" }}
            options={options}
            disabled={disabled}
            onChange={(value) => {
              field.onChange(value);
              if (onValueChange) {
                onValueChange(value);
              }
            }}
            onBlur={field.onBlur}
            value={field.value}
          />
        </Form.Item>
      )}
      defaultValue=""
    />
  );
};

export default PHSelect;
