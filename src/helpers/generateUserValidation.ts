import * as yup from 'yup'
import { regex } from '../constants/regex'
import {
  FIELD_IS_REQUIRED,
  TO_SHORT,
  RNOKPP_ERROR,
  NUMBER_ERROR,
  EMAIL_ERROR,
  OTHER_DOCS_ERROR,
  REGISTRY_NUMBER_ERROR
} from '../constants/validationMessages'
import { FormValues } from '../types/types'
import { documentTypes } from '../constants/selectOptions'

export const generateUserValidation = () => {
  const validationSchema = yup.object({
    lastName: yup
      .string()
      .defined()
      .required(FIELD_IS_REQUIRED)
      .min(3, TO_SHORT(3)),
    firstName: yup
      .string()
      .defined()
      .required(FIELD_IS_REQUIRED)
      .min(3, TO_SHORT(3)),
    middleName: yup
      .string()
      .defined()
      .nullable()
      .when('middleNameIsActive', ([middleNameIsActive], schema) => {
        if (middleNameIsActive) {
          return schema.required(FIELD_IS_REQUIRED).min(3, TO_SHORT(3))
        }
        return schema.notRequired()
      }),
    rnokpp: yup
      .string()
      .defined()
      .nullable()
      .when('rnokppIsActive', ([rnokppIsActive], schema) =>
        rnokppIsActive
          ? schema.required(FIELD_IS_REQUIRED).min(10, RNOKPP_ERROR)
          : schema.notRequired()
      ),
    birthDate: yup.string().required(FIELD_IS_REQUIRED),
    gender: yup.string().required(FIELD_IS_REQUIRED),
    birthCountry: yup.string().required(FIELD_IS_REQUIRED).min(4, TO_SHORT(4)),
    birthPlace: yup
      .string()
      .nullable()
      .required(FIELD_IS_REQUIRED)
      .min(4, TO_SHORT(4)),
    contactMethod: yup.string().notRequired(),
    secretWord: yup.string().required(FIELD_IS_REQUIRED).min(6, TO_SHORT(6)),
    phone: yup
      .string()
      .transform((value) => (value === '' ? undefined : value))
      .optional()
      .nullable()
      .test('phone-format', NUMBER_ERROR, (value) => {
        if (!value) return true
        return regex.phone.test(value)
      }),
    email: yup.string().email(EMAIL_ERROR),
    documentType: yup.string().required(FIELD_IS_REQUIRED),
    documentSeriesNumber: yup
      .string()
      .required(FIELD_IS_REQUIRED)
      .when('documentType', ([documentType], schema) => {
        if (documentType === documentTypes[0].value) {
          return schema.matches(
            regex.passportBook,
            OTHER_DOCS_ERROR(documentTypes[0].example)
          )
        }
        if (documentType === documentTypes[1].value) {
          return schema.matches(
            regex.passportId,
            OTHER_DOCS_ERROR(documentTypes[1].example)
          )
        }
        if (documentType === documentTypes[2].value) {
          return schema.matches(
            regex.refugeePermit,
            OTHER_DOCS_ERROR(documentTypes[2].example)
          )
        }
        if (documentType === documentTypes[3].value) {
          return schema.matches(
            regex.residencePermit,
            OTHER_DOCS_ERROR(documentTypes[3].example)
          )
        }
        if (documentType === documentTypes[4].value) {
          return schema.matches(
            regex.additionalSave,
            OTHER_DOCS_ERROR(documentTypes[4].example)
          )
        }
        if (documentType === documentTypes[5].value) {
          return schema.matches(
            regex.permanentResidence,
            OTHER_DOCS_ERROR(documentTypes[5].example)
          )
        }
        if (documentType === documentTypes[6].value) {
          return schema.matches(
            regex.temporaryPassport,
            OTHER_DOCS_ERROR(documentTypes[6].example)
          )
        }
        return schema.matches(
          regex.passportId,
          OTHER_DOCS_ERROR(documentTypes[1].example)
        )
      }),
    issuedBy: yup.string().required(FIELD_IS_REQUIRED).min(10, TO_SHORT(10)),
    registryNumber: yup
      .string()
      .required(FIELD_IS_REQUIRED)
      .matches(regex.unzr, REGISTRY_NUMBER_ERROR),
    expiryDate: yup.string().required(FIELD_IS_REQUIRED),
    issuedDate: yup.string().required(FIELD_IS_REQUIRED)
  })

  const validateFormValues = (values: FormValues) => {
    const errors: Record<string, string> = {}
    try {
      validationSchema.validateSync(values, { abortEarly: false })
    } catch (err) {
      const validationError = err as yup.ValidationError
      validationError.inner.forEach((error) => {
        if (error.path) {
          errors[error.path] = error.message
        }
      })
    }
    return errors
  }

  return validateFormValues
}
