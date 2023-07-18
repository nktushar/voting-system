import React from 'react'
import ReactDOM from 'react-dom/client'
import Signup from './SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path='/login' element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    )
    }

    export default App;