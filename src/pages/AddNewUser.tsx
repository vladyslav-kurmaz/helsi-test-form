import { Flex, Layout, Typography } from 'antd'
import CreatePersonForm from '../form/CreatePersonForm'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { FormValues } from '../types/types'
import { Footer } from 'antd/es/layout/layout'

const AddNewUser = () => {
  const { Title } = Typography
  const { Header, Content } = Layout
  const [formData, setFormData] = useState<FormValues | null>(null)
  return (
    <Flex
      vertical
      style={{ maxWidth: '1400px', margin: '0 auto', marginTop: '20px' }}
    >
      <Header
        style={{
          background: '#4A9CD3',
          color: '#fff',
          fontSize: '24px',
          fontWeight: 'bold',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <ArrowLeftOutlined style={{ fontSize: '16px' }} />
        Створення персони
      </Header>
      <Content
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          padding: '0 20px',
          boxSizing: 'border-box',
          border: '1px solid #ededee'
        }}
      >
        <Title level={2}>Дані пацієнта</Title>
        <CreatePersonForm setFormData={setFormData} />
      </Content>
      <Footer style={{ background: 'transparent', color: '#000' }}>
        {formData !== null && <pre>{JSON.stringify(formData, null, 2)}</pre>}
      </Footer>
    </Flex>
  )
}

export default AddNewUser
