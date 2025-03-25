import { Field } from 'react-final-form'
import { Form, DatePicker } from 'antd'
import { CalendarOutlined, InfoCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

interface DatePickerFieldProps {
  name: string
  label: string
  placeholder?: string
  additionalHelperText?: string
  switchElem?: boolean
  variant?: 'underlined' | 'outlined' | 'borderless' | 'filled'
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  label,
  placeholder = '31.12.1971',
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
            <DatePicker
              {...input}
              value={input.value ? dayjs(input.value) : undefined}
              onChange={(date) => input.onChange(date)}
              format='DD.MM.YYYY'
              placeholder={placeholder}
              variant={variant}
              style={{ width: '100%' }}
              suffixIcon={
                showError ? (
                  <InfoCircleOutlined
                    style={{ color: '#e74c3c', fontSize: 18 }}
                  />
                ) : (
                  <CalendarOutlined style={{ fontSize: 18 }} />
                )
              }
            />
          </Form.Item>
        )
      }}
    </Field>
  )
}

export default DatePickerField
