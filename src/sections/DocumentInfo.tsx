import TextField from '../components/FormFields/TextField/TextField'
import SelectField from '../components/FormFields/SelectField/SelectField'
import DatePickerField from '../components/FormFields/DatePickerField/DatePickerField'
import { Flex, Typography } from 'antd'
import { documentTypes } from '../constants/selectOptions'

const DocumentInfo = () => {
  return (
    <>
      <Typography.Title level={3} style={{ fontSize: 16, fontWeight: 600 }}>
        Документ, що посвідчує особу
      </Typography.Title>

      <Flex gap={15} style={{ width: '100%' }} align='flex-end'>
        <Flex vertical gap={15} style={{ width: '50%' }}>
          <SelectField
            name='documentType'
            label='Тип документу*'
            options={documentTypes}
            variant='underlined'
          />
          <DatePickerField
            name='issuedDate'
            label='Коли видано*'
            variant='underlined'
          />
          <TextField name='issuedBy' label='Ким видано*' variant='underlined' />
        </Flex>

        <Flex vertical gap={15} style={{ width: '50%' }}>
          <TextField
            name='documentSeriesNumber'
            label=''
            variant='underlined'
            placeholder='Серія (за наявності), номер*'
            additionalHelperText='Номер введено некоректно, поле повинно містити 9 цифр'
          />
          <DatePickerField
            name='expiryDate'
            label='Діє до*'
            variant='underlined'
          />
          <TextField
            name='registryNumber'
            label='Запис № (УНЗР)*'
            variant='underlined'
            placeholder='РРРРММДД-ХХХХХ'
            additionalHelperText='Номер введено некоректно. Приклад: РРРРММДД-ХХХХХ'
          />
        </Flex>
      </Flex>
    </>
  )
}

export default DocumentInfo
