import './App.css'
import { LoginForm } from './component/loginForm'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { RegisterForm } from './component/registerForm'
import { Home } from './component/home'
import React, { createContext, useState } from 'react'
import { ProtectedRoutes } from './component/protectedRoutes'
import { EditPage } from './component/editPage'
import { NewPage } from './component/newPage'

export interface UserProviderProps{
  children: JSX.Element
}

export interface UserContextType {
  user: string,
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: UserContextType = {
  user: "",
  setUser: ()=>{}
}
export const UserContext = createContext<UserContextType>(initialState);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) =>{
  const [user, setUser] = useState("")
  return(
    <UserContext.Provider value = {{user,setUser}}>
      {children}
    </UserContext.Provider>
  )
}

function App() {

  return (
    <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path='/register' element={<RegisterForm/>}/>          
        <Route path='/login' element={<LoginForm/>}/>        
        <Route path='/' element={
          <ProtectedRoutes>
            <Home/>
          </ProtectedRoutes>
        }/>
        <Route path='/edit/:id' element={
          <ProtectedRoutes>
            <EditPage/>
          </ProtectedRoutes>
        }/>
        <Route path='/new' element={
          <ProtectedRoutes>
            <NewPage/>
          </ProtectedRoutes>
        }/>
        
      </Routes>
      </UserProvider>
 
    </BrowserRouter>
  )
}

export default App
