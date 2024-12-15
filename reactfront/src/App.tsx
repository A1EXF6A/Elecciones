import { Routes, Route, useNavigate } from 'react-router-dom'
import { NavBar } from './components/navbar/NavBar'
import { CandidatosPage } from './pages/PageCandidatos'
import { Login } from './pages/auth/PageLogin'
import { Register } from './pages/auth/PageRegister'
import { UserPage } from './pages/PageUser'
import { useEffect, useState } from 'react'
import { SugerenciaForm } from './pages/SugerenciasPage'
import CompShowPropuestas from './pages/propuestas/Propuestas'
import { Home } from './pages/HomePage'


import './styles/app.css'
import { NewsPage } from './pages/NewsPage'


function App() {
    const [userId, setUserId] = useState<string>('')
    const navigateTo = useNavigate()

    const onLogin = (userId: string, vote: string) => {
        setUserId(userId)
        localStorage.setItem('userId', userId)
        localStorage.setItem('vote', vote)
        navigateTo(`/admin/HomeAdmin`)
    }

    const onLogout = () => {
        setUserId('')
        localStorage.removeItem('userId')
        localStorage.removeItem('vote')
        navigateTo('/login/new')
    }

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            setUserId(userId)
        }
    }, [])

    return (
        <>
            <NavBar userId={userId} />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/candidatos' element={<CandidatosPage />} />
                    <Route path='/login/:state' element={<Login handleOnLogin={onLogin} />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/user/' element={<UserPage handleOnLogout={onLogout} />} />
                    <Route path='/propuestas' element={<CompShowPropuestas />} />
                    <Route path='/sugerencias' element={<SugerenciaForm />} />
                    <Route path='/eventos/' element={<NewsPage />} />
                </Routes>
            </main>
        </>
    )
}

export default App
