export const FIELD_IS_REQUIRED = 'Поле не може бути пустим!'
export const NUMBER_TO_SHORT = 'Поле закоротке'
export const RNOKPP_ERROR =
  'Номер введено некоректно, поле повинно містити 10 цифр'
export const NUMBER_ERROR =
  'Некоректинй номер телефона. Наприклад +380(123)456-78-90'
export const EMAIL_ERROR =
  'Некоректна електронна адреса. Наприклад helsi@gmail.com'
export const REGISTRY_NUMBER_ERROR =
  'Некоректний номер реєстрації. Наприклад РРРРММДД-ХХХХХ'
export const OTHER_DOCS_ERROR = (documentExample: string) =>
  `Некоректна формат документу. Наприклад ${documentExample}`
export const TO_SHORT = (min: number) =>
  `Поле повинно складатися мінімум з ${min} символів`
