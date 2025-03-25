import { useState } from 'react'
import { Form } from 'react-final-form'
import { Button, Form as AntForm, Flex } from 'antd'
import PatientInfo from '../sections/PatientInfo'
import ContactInfo from '../sections/ContactInfo'
import DocumentInfo from '../sections/DocumentInfo'
import { FormValues } from '../types/types'
import { initialValues } from '../constants'
import { FormApi } from 'final-form'
import { useUserValidation } from '../components/hooks/useUserValidation'

const CreatePersonForm: React.FC<{
  setFormData: (values: FormValues | null) => void
}> = ({ setFormData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = useUserValidation()

  const resetFormState = (form: FormApi<FormValues>) => {
    form.reset()
    form.initialize(initialValues)

    setTimeout(() => {
      const registeredFields = form.getRegisteredFields()
      registeredFields.forEach((field) => {
        form.resetFieldState(field as keyof FormValues)
      })
    }, 0)
  }

  const handleSubmitForm = async (
    values: FormValues,
    form: FormApi<FormValues>
  ) => {
    setIsSubmitting(true)

    const cleanedValues = Object.fromEntries(
      Object.entries(values).filter(
        ([key, v]) =>
          v !== '' &&
          v !== undefined &&
          key !== 'middleNameIsActive' &&
          key !== 'rnokppIsActive'
      )
    )

    await new Promise((res) => setTimeout(res, 2000))
    setFormData(cleanedValues as FormValues)

    resetFormState(form)

    setIsSubmitting(false)
  }

  const handleClearForm = (form: FormApi<FormValues>) => {
    form.reset()
    setFormData(null)
  }

  return (
    <Form<FormValues>
      onSubmit={(values, form) => handleSubmitForm(values, form)}
      initialValues={initialValues}
      validate={validate}
    >
      {({ handleSubmit, form }) => (
        <AntForm layout='vertical' onFinish={handleSubmit}>
          <Flex gap={10} vertical justify='space-between'>
            <PatientInfo />
            <ContactInfo />
            <DocumentInfo />
          </Flex>

          <Flex gap={10} style={{ marginTop: '30px', marginBottom: '15px' }}>
            <Button
              type='primary'
              htmlType='submit'
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Створити пацієнта
            </Button>
            <Button
              htmlType='button'
              onClick={() => handleClearForm(form)}
              disabled={isSubmitting}
            >
              Очистити форму
            </Button>
          </Flex>
        </AntForm>
      )}
    </Form>
  )
}

export default CreatePersonForm
