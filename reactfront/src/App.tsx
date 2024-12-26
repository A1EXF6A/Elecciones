import { Routes, Route, useNavigate } from 'react-router-dom'
import { NavBar } from './components/navbar/NavBar'
import { CandidatosPage } from './pages/PageCandidatos'
import { Login } from './pages/auth/PageLogin'
import { UserPage } from './pages/PageUser'
import { useEffect, useState } from 'react'
import { SugerenciaForm } from './pages/SugerenciasPage'
import CompShowPropuestas from './pages/propuestas/Propuestas'
import { Home } from './pages/HomePage'

import './styles/app.css'
import { NewsPage } from './pages/NewsPage'
import HomeAdmin from './admin/HomeAdmin'


function App() {
    const [isLoggued, setIsLogged] = useState<boolean>(false)
    const navigateTo = useNavigate()

    const onLoginAdmin = () => {
        localStorage.setItem('loggued', 'true')
        navigateTo('/admin/')
        setIsLogged(true)
    }

    const onLogout = () => {
        setIsLogged(false)
        localStorage.removeItem('loggued')
        navigateTo('/login/new')
    }

    useEffect(() => {
        const loggued = localStorage.getItem('loggued')
        setIsLogged(!!loggued)


        const tipo = localStorage.getItem('config')
        if (!tipo) {
            console.log('configuracion creada')
            const configObject = {
                tipo_eleccion: 2
            }


            localStorage.setItem('config', JSON.stringify(configObject));
        }
    }, [])

    return (
        <>
            <NavBar logged={isLoggued} />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/candidatos' element={<CandidatosPage />} />
                    <Route path='/login/:state' element={<Login handleOnLoginAdmin={onLoginAdmin} />} />
                    <Route path='/user/' element={<UserPage handleOnLogout={onLogout} />} />
                    <Route path='/propuestas' element={<CompShowPropuestas />} />
                    <Route path='/sugerencias' element={<SugerenciaForm />} />
                    <Route path='/eventos/' element={<NewsPage />} />
                    <Route path='/admin/' element={<HomeAdmin />} />
                </Routes>
            </main>
        </>
    )
}

export default App
