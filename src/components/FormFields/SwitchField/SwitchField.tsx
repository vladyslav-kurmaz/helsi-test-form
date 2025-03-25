import { Field } from 'react-final-form'
import { Form, Switch } from 'antd'
import React, { useState, useEffect } from 'react'
import './SwitchField.css'

interface SwitchFieldProps {
  name: string
  label: string
  onChange: (value: boolean) => void
  style?: React.CSSProperties
  isEnabled?: boolean
}

interface SwitchContentProps {
  input: { value: boolean; onChange: (value: boolean) => void }
  label: string
  style?: React.CSSProperties
  localEnabled: boolean
  handleChange: (value: boolean) => void
}

const SwitchContent: React.FC<SwitchContentProps> = ({
  input,
  label,
  style,
  localEnabled,
  handleChange
}) => {
  useEffect(() => {
    if (input.value !== localEnabled) {
      handleChange(input.value)
    }
  }, [input.value, localEnabled, handleChange])

  const handleSwitchChange = (value: boolean) => {
    handleChange(value)
    input.onChange(value)
  }

  return (
    <Form.Item label={label} style={style}>
      <Switch
        {...input}
        checked={localEnabled}
        onChange={handleSwitchChange}
        checkedChildren={null}
        unCheckedChildren={null}
        style={{
          width: '50px',
          height: '10px',
          backgroundColor: localEnabled ? '#ffffff' : '#bfbfbf',
          borderRadius: '15px',
          border: '1px solidrgb(220, 219, 219)',
          padding: 0,
          position: 'relative'
        }}
        className={
          localEnabled ? 'custom-switch-unchecked' : 'custom-switch-checked'
        }
      />
    </Form.Item>
  )
}

const SwitchField: React.FC<SwitchFieldProps> = ({
  name,
  label,
  onChange,
  isEnabled = false,
  style
}) => {
  const [localEnabled, setLocalEnabled] = useState<boolean>(isEnabled)

  useEffect(() => {
    setLocalEnabled(isEnabled)
  }, [isEnabled])

  const handleChange = (value: boolean) => {
    setLocalEnabled(value)
    onChange(value)
  }

  return (
    <Field<boolean> name={name} type='checkbox' initialValue={isEnabled}>
      {({ input }) => (
        <SwitchContent
          input={{ value: input.checked || false, onChange: input.onChange }}
          label={label}
          style={style}
          localEnabled={localEnabled}
          handleChange={handleChange}
        />
      )}
    </Field>
  )
}

export default SwitchField
