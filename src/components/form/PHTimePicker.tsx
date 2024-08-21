import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
};

const PHTimePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <TimePicker size="middle" style={{ width: "100%" }} {...field} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHTimePicker;
