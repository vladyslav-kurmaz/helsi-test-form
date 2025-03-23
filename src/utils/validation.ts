import { TDocumentType } from '../types/types'

export const regex: Record<TDocumentType, RegExp> = {
  phone: /^\+38\(\d{3}\)\d{3}-\d{2}-\d{2}$/,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  registryNumber: /^\d{8}-\d{5}$/,
  unzr: /^\d{8}-\d{5}$/,
  passportBook: /^[А-Яа-яЇїІіЄєҐґ]{2}\d{6}$/,
  passportId: /^\d{9}$/,
  refugeePermit: /^[А-ЯІЇЄҐ]{2}\d{7}$/,
  residencePermit: /^[A-Z]{2}\d{7}$/i,
  additionalSave: /^[А-Яа-яЇїІіЄєҐґ]{3}\d{5,9}$/,
  permanentResidence: /^[А-Яа-яЇїІіЄєҐґ]{3}\d{5,9}$/,
  temporaryPassport: /^[А-Яа-яЇїІіЄєҐґ]{3}\d{5,9}$/
}

export type ValidatorFn<T> = (value: T) => string | undefined

export const required = <T>(
  message = 'Це поле обов’язкове'
): ValidatorFn<T> => {
  return (value: T) => {
    if (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return message
    }
    return undefined
  }
}

export const regexValidator = (
  pattern: RegExp,
  message = 'Невірний формат'
): ValidatorFn<string> => {
  return (value: string) =>
    value && !pattern.test(value) ? message : undefined
}

export const composeValidators = <T>(
  ...validators: Array<ValidatorFn<T> | undefined>
): ValidatorFn<T> => {
  return (value: T) => {
    for (const validator of validators) {
      if (typeof validator === 'function') {
        const error = validator(value)
        if (error) return error
      }
    }
    return undefined
  }
}

export const requiredSelect = (
  message = 'Це поле обов’язкове'
): ValidatorFn<string> => {
  return (value: string) => {
    if (!value || value.trim() === '') {
      return message
    }
    return undefined
  }
}

export const minLength = (
  length: number,
  message?: string
): ValidatorFn<string> => {
  return (value: string) =>
    value && value.length < length
      ? message || `Мінімум ${length} символів`
      : undefined
}
