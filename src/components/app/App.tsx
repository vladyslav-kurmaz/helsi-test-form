import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddNewUser from '../../pages/AddNewUser'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AddNewUser />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
