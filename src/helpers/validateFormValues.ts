import * as yup from 'yup'
import { FormValues } from '../types/types'

export const validateFormValues = (
  values: FormValues,
  validationSchema: yup.ObjectSchema<FormValues>
) => {
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
