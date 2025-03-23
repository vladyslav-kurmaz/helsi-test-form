import { FormValues } from './types/types'

export const documentTypes = [
  {
    value: 'additionalSave',
    label: 'Посвідчення особи, яка потребує додаткового захисту',
    example: 'АБВ12345'
  },
  {
    value: 'passportId',
    label: 'Паспорт (ID-картка)',
    example: '123456789'
  },
  {
    value: 'passportBook',
    label: 'Паспорт (книжечка)',
    example: 'КН123456'
  },
  {
    value: 'permanentResidence',
    label: 'Посвідка на постійне проживання в Україні',
    example: 'ПРЛ9876543'
  },
  {
    value: 'refugeePermit',
    label: 'Посвідка біженця',
    example: 'ІД1234567'
  },
  {
    value: 'residencePermit',
    label: 'Посвідка про проживання',
    example: 'AB1234567'
  },
  {
    value: 'temporaryPassport',
    label: 'Тимчасове посвідчення громадянина України',
    example: 'ТСТ9876543'
  }
]

export const contactMethods = [
  { value: 'phone', label: 'Телефон' },
  { value: 'email', label: 'Email' }
]

export const genderOptions = [
  { value: 'male', label: 'Чоловіча' },
  { value: 'female', label: 'Жіноча' }
]

export const initialValues: FormValues = {
  lastName: '',
  firstName: '',
  middleName: '',
  rnokpp: '',
  birthDate: '',
  gender: '',
  birthCountry: '',
  birthPlace: '',
  contactMethod: '',
  secretWord: '',
  email: '',
  phone: '',
  documentType: '',
  documentSeriesNumber: '',
  issueDate: '',
  expiryDate: '',
  issuedBy: '',
  registryNumber: ''
}
