import { Field, useFormState } from 'react-final-form'
import { Form, DatePicker } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import {
  required,
  composeValidators,
  ValidatorFn
} from '../../../utils/validation'
import { CalendarOutlined, InfoCircleOutlined } from '@ant-design/icons'

interface DatePickerFieldProps {
  name: string
  label: string
  validate?: ValidatorFn<Dayjs | undefined>
  variant?: 'underlined' | 'outlined' | 'borderless' | 'filled'
  additionalHelperText?: string
  required?: boolean
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  label,
  validate,
  variant = 'underlined',
  additionalHelperText,
  required: isRequired = false
}) => {
  const { submitFailed } = useFormState()
  const dateFormat = 'DD.MM.YYYY'

  const validators: ValidatorFn<Dayjs | undefined>[] = []

  if (isRequired) {
    validators.push(required<Dayjs | undefined>('Будь ласка, виберіть дату'))
  }

  if (validate) {
    validators.push(validate)
  }

  const finalValidator = composeValidators(...validators)

  return (
    <Field name={name} validate={finalValidator}>
      {({ input, meta }) => {
        const showError = meta.error && (meta.touched || submitFailed)
        const helpText = showError
          ? meta.error
          : !isRequired && additionalHelperText
          ? additionalHelperText
          : null

        return (
          <Form.Item
            label={label}
            validateStatus={showError ? 'error' : ''}
            help={helpText}
          >
            <DatePicker
              {...input}
              value={input.value ? dayjs(input.value) : undefined}
              onChange={(date) => input.onChange(date)}
              format={dateFormat}
              style={{ width: '100%' }}
              placeholder='31.12.1971'
              variant={variant}
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
