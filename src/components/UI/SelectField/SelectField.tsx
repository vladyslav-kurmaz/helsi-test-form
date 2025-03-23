import { Field, useFormState } from 'react-final-form'
import { Form, Select } from 'antd'
import { CaretDownOutlined, InfoCircleOutlined } from '@ant-design/icons'
import {
  requiredSelect,
  composeValidators,
  ValidatorFn
} from '../../../utils/validation'
import { OptionType } from '../../../types/types'

const { Option } = Select

interface SelectFieldProps {
  name: string
  label: string
  options: OptionType[]
  validate?: ValidatorFn<string>
  variant?: 'underlined' | 'outlined' | 'borderless' | 'filled'
  additionalHelperText?: string
  required?: boolean
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  validate,
  variant = 'underlined',
  additionalHelperText,
  required: isRequired = false
}) => {
  const { submitFailed } = useFormState()

  const validators: ValidatorFn<string>[] = []

  if (isRequired) {
    validators.push(requiredSelect('Будь ласка, виберіть значення'))
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
            <Select
              {...input}
              onChange={input.onChange}
              value={input.value}
              suffixIcon={
                showError ? (
                  <InfoCircleOutlined
                    style={{ color: '#e74c3c', fontSize: 18 }}
                  />
                ) : (
                  <CaretDownOutlined style={{ fontSize: 18 }} />
                )
              }
              variant={variant}
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
