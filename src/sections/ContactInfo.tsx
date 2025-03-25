import TextField from '../components/FormFields/TextField/TextField'
import SelectField from '../components/FormFields/SelectField/SelectField'
import { contactMethods } from '../constants/selectOptions'
import { Flex } from 'antd'

const ContactInfo = () => {
  return (
    <Flex gap={15} vertical style={{ width: '100%' }}>
      <Flex gap={15} justify='space-between' style={{ width: '100%' }}>
        <div style={{ width: '50%' }}>
          <TextField
            name='birthCountry'
            label=''
            variant='underlined'
            placeholder='Країна народження*'
          />
        </div>
        <div style={{ width: '50%' }}>
          <TextField
            name='birthPlace'
            label=''
            variant='underlined'
            placeholder='Місце народження*'
          />
        </div>
      </Flex>
      <Flex gap={15} align='flex-end'>
        <div style={{ width: '50%' }}>
          <SelectField
            name='contactMethod'
            label='Бажаний спосіб зв’язку із пацієнтом'
            options={contactMethods}
            variant='underlined'
          />
        </div>
        <div style={{ width: '50%' }}>
          <TextField
            name='secretWord'
            label=''
            variant='underlined'
            placeholder='Секретне слово (не менше 6 символів)*'
          />
        </div>
      </Flex>

      <Flex gap={15}>
        <div style={{ width: '50%' }}>
          <TextField
            name='phone'
            label='Контактний номер телефону'
            variant='underlined'
            placeholder='+38(___)___-__-__'
            additionalHelperText='Некоректний номер телефона. Приклад: +38(099)123-45-67'
          />
        </div>
        <div style={{ width: '50%' }}>
          <TextField
            name='email'
            label='Адреса електронної пошти'
            variant='underlined'
            placeholder='example@example.com'
            additionalHelperText='Некоректна електронна пошта. Приклад: example@example.com'
          />
        </div>
      </Flex>
    </Flex>
  )
}

export default ContactInfo
