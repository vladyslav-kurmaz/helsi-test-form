import { useState, ChangeEvent, FocusEvent } from 'react'
import { Field, useFormState, useForm } from 'react-final-form'
import { Form, Input } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import SwitchField from '../SwitchField/SwitchField'

import { formatUnzr, normalizePhoneInput } from '../../../helpers/formatters'

interface TextFieldProps {
  name: string
  label: string
  variant?: 'underlined' | 'outlined' | 'borderless' | 'filled'
  placeholder?: string
  additionalHelperText?: string
  switchElem?: boolean
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  variant = 'underlined',
  placeholder = '',
  additionalHelperText,
  switchElem = false
}) => {
  const form = useForm()
  const { submitFailed } = useFormState()

  const [isRequired, setIsRequired] = useState<boolean>(!switchElem)

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (name === 'phone' && !e.target.value.startsWith('+38')) {
      const updated = '+38'
      form.change(name, updated)
      requestAnimationFrame(() => {
        e.target.setSelectionRange(updated.length, updated.length)
      })
    }
  }

  return (
    <Field name={name}>
      {({ input, meta }) => {
        const hasError = meta.error && (input.value || submitFailed)
        const showError = switchElem ? isRequired && hasError : hasError

        const labelStyle = {
          color: showError ? '#e74c3c' : '#000'
        }

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          const prev = input.value
          let val = e.target.value

          if (name === 'phone') {
            val = normalizePhoneInput(prev, val)
          } else if (name === 'registryNumber' || name === 'unzr') {
            val = formatUnzr(val)
          }

          form.change(name, val)
          form.mutators?.setFieldTouched?.(name, true)

          requestAnimationFrame(() => {
            e.target.setSelectionRange(val.length, val.length)
          })
        }

        return (
          <Form.Item
            label={<div style={labelStyle}>{label}</div>}
            validateStatus={showError ? 'error' : ''}
            help={showError ? meta.error : undefined}
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
                      opacity: showError && !switchElem ? 1 : 0,
                      transition: 'opacity 0.2s ease-in-out'
                    }}
                  />
                }
              />
              {switchElem && (
                <SwitchField
                  label=''
                  name={`${name}IsActive`}
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
              {!isRequired && (
                <div
                  style={{
                    color: '#bfbfbf',
                    position: 'absolute',
                    bottom: '-30px',
                    transform: 'translateY(-50%)',
                    left: '0',
                    zIndex: 1000
                  }}
                >
                  {additionalHelperText}
                </div>
              )}
            </div>
          </Form.Item>
        )
      }}
    </Field>
  )
}

export default TextField
