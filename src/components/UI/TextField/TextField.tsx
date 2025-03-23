import { useState, useEffect, FocusEvent, ChangeEvent } from 'react'
import { Field, useFormState, useForm } from 'react-final-form'
import { Form, Input } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import SwitchField from '../SwitchField/SwitchField'

import { regex, ValidatorFn } from '../../../utils/validation'

import { formatUnzr, normalizePhoneInput } from '../../../helpers/formatters'
import { getSuggestedDocumentType } from '../../../helpers/suggestions'
import { useDynamicValidation } from '../../hooks/useDynamicValidation'

interface TextFieldProps {
  name: string
  label: string
  validate?: ValidatorFn<string>
  variant?: 'underlined' | 'outlined' | 'borderless' | 'filled'
  required?: boolean
  placeholder?: string
  additionalHelperText?: string
  switchElem?: boolean
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  validate,
  variant = 'underlined',
  required = false,
  placeholder = '',
  additionalHelperText,
  switchElem = false
}) => {
  const form = useForm()
  const { submitFailed, values } = useFormState()
  const [isRequired, setIsRequired] = useState<boolean>(
    switchElem ? false : required
  )
  const documentType = values?.documentType as keyof typeof regex | undefined

  const getValidation = useDynamicValidation({
    name,
    isRequired,
    validate,
    documentType,
    additionalHelperText
  })

  useEffect(() => {
    const fieldState = form.getFieldState(name)
    const wasTouched = fieldState?.touched

    if (isRequired) {
      form.resetFieldState(name)
    } else {
      const value = fieldState?.value ?? ''
      form.change(name, value)
      if (submitFailed || wasTouched) {
        form.mutators?.setFieldTouched?.(name, true, false)
      }
    }
  }, [isRequired, form, name, submitFailed])

  return (
    <Field
      name={name}
      validate={getValidation()}
      subscription={{
        value: true,
        touched: true,
        error: true,
        submitFailed: true
      }}
    >
      {({ input, meta }) => {
        const hasError = Boolean(meta.error && (input.value || submitFailed))
        const showError = switchElem ? isRequired && hasError : hasError

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          const prev = input.value
          let val = e.target.value

          if (name === 'phone') {
            val = normalizePhoneInput(prev, val)
          } else if (name === 'registryNumber' || name === 'unzr') {
            val = formatUnzr(val)
          }

          input.onChange(val)

          form.mutators?.setFieldTouched?.(name, true)

          requestAnimationFrame(() => {
            const el = e.target
            el.setSelectionRange(val.length, val.length)
          })
        }

        const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
          if (name === 'phone' && !input.value.startsWith('+38')) {
            const updated = '+38'
            input.onChange(updated)
            requestAnimationFrame(() => {
              e.target.setSelectionRange(updated.length, updated.length)
            })
          }
        }

        const suggestedDocumentType =
          name === 'documentSeriesNumber'
            ? getSuggestedDocumentType(input.value, documentType)
            : null

        const helpText = showError
          ? meta.error
          : switchElem && !isRequired
          ? additionalHelperText || null
          : null

        const labelElem = (
          <div style={{ color: showError ? '#e74c3c' : '#000' }}>
            {label}
            {switchElem && isRequired ? ' *' : ''}
          </div>
        )

        return (
          <Form.Item
            label={labelElem}
            validateStatus={showError ? 'error' : ''}
            help={
              helpText ? (
                <>
                  {helpText}
                  {suggestedDocumentType && (
                    <div style={{ marginTop: 4, color: '#faad14' }}>
                      {suggestedDocumentType}
                    </div>
                  )}
                </>
              ) : suggestedDocumentType ? (
                <div style={{ color: '#faad14' }}>{suggestedDocumentType}</div>
              ) : null
            }
          >
            <div style={{ position: 'relative', width: '100%' }}>
              <Input
                {...input}
                onChange={handleChange}
                onFocus={handleFocus}
                disabled={switchElem && !isRequired}
                placeholder={placeholder}
                style={{ paddingLeft: '0' }}
                variant={variant}
                suffix={
                  <InfoCircleOutlined
                    style={{
                      color: '#e74c3c',
                      fontSize: 18,
                      visibility:
                        !switchElem && showError ? 'visible' : 'hidden'
                    }}
                  />
                }
              />
              {switchElem && (
                <SwitchField
                  label=''
                  name={`${name}Switch`}
                  isEnabled={isRequired}
                  onChange={setIsRequired}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    right: '0',
                    zIndex: 1000
                  }}
                />
              )}
            </div>
          </Form.Item>
        )
      }}
    </Field>
  )
}

export default TextField
