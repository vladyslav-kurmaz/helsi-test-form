import { Field } from 'react-final-form'
import { Form, Switch } from 'antd'
import './SwitchField.css'
interface SwitchFieldProps {
  name: string
  label: string
  isEnabled: boolean
  onChange: (value: boolean) => void
  style?: React.CSSProperties
}

const SwitchField: React.FC<SwitchFieldProps> = ({
  name,
  label,
  isEnabled,
  onChange,
  style
}) => {
  const handleChange = (value: boolean) => {
    onChange(value)
  }

  return (
    <Field<boolean> name={name} type='checkbox'>
      {({ input }) => (
        <Form.Item label={label} style={style}>
          <Switch
            {...input}
            checked={isEnabled}
            onChange={handleChange}
            checkedChildren={null}
            unCheckedChildren={null}
            style={{
              width: '50px',
              height: '10px',
              backgroundColor: isEnabled ? '#ffffff' : '#bfbfbf',
              borderRadius: '15px',
              border: '1px solidrgb(220, 219, 219)',
              padding: 0,
              position: 'relative'
            }}
            className={
              isEnabled ? 'custom-switch-unchecked' : 'custom-switch-checked'
            }
          />
        </Form.Item>
      )}
    </Field>
  )
}

export default SwitchField
