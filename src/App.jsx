import { Route, Routes } from "react-router-dom"
import LoginForm from "./Components/Login/Login"
import Profile from "./Components/Profile/Profile"



function App() {

  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginForm/>} />
    <Route path="user-profile" element={<Profile/>} />
    
    </Routes>

    </>
  )
}

export default App
