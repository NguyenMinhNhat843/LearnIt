import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AuthContextProvider from './contexts/AuthContext';
import './App.css'
import Auth from './views/Auth';
import Landing from './components/layout/landing';
import DashBoard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './views/About';
import CourseContextProvider from './contexts/CourseContext';

function App() {
    return (
        <AuthContextProvider>
            <CourseContextProvider>
                <Router>
                    <Routes>
                        <Route exact path='/' element={<Landing />}/>
                        <Route exact path='/register' element={<Auth authRoute='register'/>} />
                        <Route exact path='/login' element={<Auth authRoute='login'/>} />
                        <Route 
                            path='/dashboard/*'
                            element={<ProtectedRoute element={<DashBoard />} />}
                        />
                        <Route 
                            path='/about/*'
                            element={<ProtectedRoute element={<About />} />}
                        />
                    </Routes>
                </Router>
            </CourseContextProvider>
        </AuthContextProvider>
    )
}

export default App;