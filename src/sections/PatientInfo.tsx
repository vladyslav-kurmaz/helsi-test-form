import TextField from '../components/FormFields/TextField/TextField'
import SelectField from '../components/FormFields/SelectField/SelectField'
import DatePickerField from '../components/FormFields/DatePickerField/DatePickerField'
import { Flex } from 'antd'
import { genderOptions } from '../constants'

const PatientInfo = () => {
  return (
    <Flex gap={15} wrap justify='space-between' style={{ marginBottom: 15 }}>
      <div style={{ flex: '1 1 30%' }}>
        <TextField
          name='lastName'
          label='Прізвище*'
          variant='underlined'
          placeholder='Дія'
        />
      </div>
      <div style={{ flex: '1 1 30%' }}>
        <TextField
          name='firstName'
          label='Ім’я*'
          variant='underlined'
          placeholder='Надія'
        />
      </div>
      <div style={{ flex: '1 1 30%' }}>
        <TextField
          name='middleName'
          label='По батькові'
          variant='underlined'
          additionalHelperText='Немає по батькові згідно документів'
          placeholder='Володимирівна'
          switchElem={true}
        />
      </div>

      <div style={{ flex: '1 1 30%' }}>
        <TextField
          name='rnokpp'
          label='РНОКПП (ІПН)'
          additionalHelperText='Немає ІПН за віком чи має відмітку у паспорті'
          variant='underlined'
          switchElem={true}
        />
      </div>
      <div style={{ flex: '1 1 30%' }}>
        <DatePickerField
          name='birthDate'
          label='Дата народження*'
          variant='underlined'
        />
      </div>
      <div style={{ flex: '1 1 30%' }}>
        <SelectField
          name='gender'
          label='Стать*'
          options={genderOptions}
          variant='underlined'
        />
      </div>
    </Flex>
  )
}

export default PatientInfo
