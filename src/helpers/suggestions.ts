import { regex } from '../utils/validation'
import { documentTypes } from '../constants'
import { TDocumentType } from '../types/types'

export const getSuggestedDocumentType = (
  value: string,
  currentType?: TDocumentType
): string | null => {
  if (!value) return null

  const currentPattern = currentType && regex[currentType]
  if (currentPattern instanceof RegExp && currentPattern.test(value))
    return null

  for (const { value: typeValue, label } of documentTypes) {
    if (
      typeValue !== currentType &&
      regex[typeValue as TDocumentType]?.test(value)
    ) {
      return `Можливо, ви мали на увазі: ${label}`
    }
  }

  return null
}
