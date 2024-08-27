import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";
import moment from "moment";

type TDatePickerProps = {
  name: string;
  label?: string;
};

const PHTimePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field: { onChange, value } }) => (
          <Form.Item label={label}>
            <TimePicker
              size="middle"
              style={{ width: "100%" }}
              format="HH:mm"
              value={value ? moment(value, "HH:mm") : null} // Handle empty state correctly
              onChange={(time) => onChange(time ? time.format("HH:mm") : "")} // Correctly update the state with a formatted string
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHTimePicker;
