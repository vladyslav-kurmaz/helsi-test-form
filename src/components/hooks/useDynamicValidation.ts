import {
  regexValidator,
  required as requiredValidator,
  composeValidators,
  ValidatorFn,
  minLength
} from '../../utils/validation'
import { regex } from '../../utils/validation'
import { documentTypes } from '../../constants'
import { optionalValidator } from '../../helpers/formatters'

interface UseDynamicValidationProps {
  name: string
  isRequired: boolean
  validate?: ValidatorFn<string>
  documentType?: keyof typeof regex
  additionalHelperText?: string
}

export const useDynamicValidation = ({
  name,
  isRequired,
  validate,
  documentType,
  additionalHelperText
}: UseDynamicValidationProps): (() => ValidatorFn<string>) => {
  return () => {
    const validators: ValidatorFn<string>[] = []

    if (isRequired) {
      validators.push(requiredValidator('Це поле обовʼязкове'))

      if (name === 'secretWord') {
        validators.push(minLength(6, 'Мінімум 6 символів'))
      } else if (!['phone', 'email', 'registryNumber', 'unzr'].includes(name)) {
        validators.push(minLength(3, 'Мінімум 3 символи'))
      }
    }

    if (name === 'documentSeriesNumber' && documentType) {
      const pattern = regex[documentType]
      if (pattern) {
        const documentExample = documentTypes.find(
          (d) => d.value === documentType
        )?.example
        const validator = regexValidator(
          pattern,
          `Невірний формат номера документа. Приклад: ${documentExample}`
        )
        validators.push(isRequired ? validator : optionalValidator(validator))
      }
    } else if (name in regex) {
      const validator = regexValidator(
        regex[name as keyof typeof regex],
        additionalHelperText
      )
      validators.push(isRequired ? validator : optionalValidator(validator))
    }

    if (validate) {
      validators.push(validate)
    }

    return composeValidators(...validators)
  }
}
