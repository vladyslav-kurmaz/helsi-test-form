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
