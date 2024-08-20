import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  onValueChange?: string;
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
        <Form.Item label={label}>
          <Select
            mode={mode}
            size="middle"
            {...field}
            style={{ width: "100%" }}
            options={options}
            disabled={disabled}
            onChange={onValueChange}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
