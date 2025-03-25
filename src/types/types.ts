export interface FormValues {
  lastName?: string
  firstName?: string
  middleName?: string | null
  middleNameIsActive: boolean
  rnokpp?: string | null
  rnokppIsActive: boolean
  birthDate?: string
  gender?: string
  birthCountry?: string
  birthPlace?: string
  secretWord?: string
  email?: string
  phone?: string
  contactMethod?: string
  documentType?: string
  documentSeriesNumber?: string
  issuedBy?: string
  issuedDate?: string
  expiryDate?: string
  registryNumber?: string
}

export type TDocumentType =
  | 'phone'
  | 'email'
  | 'registryNumber'
  | 'unzr'
  | 'passportBook'
  | 'passportId'
  | 'refugeePermit'
  | 'residencePermit'
  | 'additionalSave'
  | 'permanentResidence'
  | 'temporaryPassport'

export interface OptionType {
  value: string
  label: string
}
