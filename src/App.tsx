import './App.css'
import { LoginForm } from './component/loginForm'
import { Routes, Route } from 'react-router-dom'
import { RegisterForm } from './component/registerForm'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<LoginForm/>}/>
      <Route path='/register' element={<RegisterForm/>}/>
    </Routes>
 
    </>
  )
}

export default App
