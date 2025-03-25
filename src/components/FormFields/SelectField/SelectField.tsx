import { Field } from 'react-final-form'
import { Form, Select } from 'antd'
import { CaretDownOutlined, InfoCircleOutlined } from '@ant-design/icons'

const { Option } = Select

interface SelectFieldProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
  additionalHelperText?: string
  switchElem?: boolean
  variant?: 'underlined' | 'outlined' | 'borderless' | 'filled'
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  placeholder = '',
  additionalHelperText,
  switchElem = false,
  variant = 'underlined'
}) => {
  return (
    <Field name={name}>
      {({ input, meta }) => {
        const hasError = meta.error && (input.value || meta.submitFailed)
        const showError = switchElem ? meta.touched && hasError : hasError

        return (
          <Form.Item
            label={
              <span
                style={{
                  color: showError ? '#e74c3c' : undefined
                }}
              >
                {label}
              </span>
            }
            validateStatus={showError ? 'error' : ''}
            help={showError ? meta.error : additionalHelperText || null}
          >
            <Select
              {...input}
              value={input.value}
              placeholder={placeholder}
              variant={variant}
              suffixIcon={
                showError ? (
                  <InfoCircleOutlined
                    style={{ color: '#e74c3c', fontSize: 18 }}
                  />
                ) : (
                  <CaretDownOutlined style={{ fontSize: 18 }} />
                )
              }
            >
              <Option key='empty' value=''>
                --Вибрати--
              </Option>
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )
      }}
    </Field>
  )
}

export default SelectField
