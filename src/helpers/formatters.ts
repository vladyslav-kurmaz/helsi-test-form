import { ValidatorFn } from '../utils/validation'

export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  let result = '+38'

  if (digits.length > 2) result += '(' + digits.slice(2, 5)
  if (digits.length >= 5) result += ')'
  if (digits.length > 5) result += digits.slice(5, 8)
  if (digits.length >= 8) result += '-'
  if (digits.length > 8) result += digits.slice(8, 10)
  if (digits.length >= 10) result += '-'
  if (digits.length > 10) result += digits.slice(10, 12)

  return result
}

export const formatUnzr = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 13)
  if (digits.length <= 8) return digits
  return `${digits.slice(0, 8)}-${digits.slice(8)}`
}

export const normalizePhoneInput = (prev: string, next: string): string => {
  if (prev.length > next.length) {
    const removedChar = prev[next.length]
    if (/[-)(]/.test(removedChar)) {
      return formatPhone(next.slice(0, -1))
    }
  }
  return formatPhone(next)
}

export const optionalValidator =
  (validator: ValidatorFn<string>): ValidatorFn<string> =>
  (value) =>
    !value ? undefined : validator(value)
