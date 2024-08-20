import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
  options:
    | {
        value: string;
        label: string;
        disabled?: boolean;
      }[]
    | undefined;
};

const PHSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange,
}: TPHSelectProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });
  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue, onValueChange]);
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
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelectWithWatch;
