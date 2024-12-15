import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useField } from '../../util/hooks/useField';
import { loginAdmin } from '../../util/auth';

import clsx from 'clsx';

// interface OnLogin {
//     handleOnLogin: (userId: string, vote: string) => void
// }

interface OnLoginAdmin {
    handleOnLoginAdmin: (id: string) => void
}

// const Login = ({ handleOnLogin }: OnLoginAdmin) => {
const Login = ({ handleOnLoginAdmin }: OnLoginAdmin) => {
    const { state } = useParams()
    const newRegister = state === 'success'

    const [failLogin, setfailLogin] = useState(false)

    const userCredential = useField('text')
    const password = useField('password')

    const navigateTo = useNavigate()

    const classError = clsx('cont-message', {
        'show': failLogin || newRegister,
        'cont-message-error': failLogin
    })

    useEffect(() => {
        const userId = localStorage.getItem('adminId')
        if (userId) navigateTo(`/admin/`)
    }, [navigateTo])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        // handleLogin()
        handleLoginAdmin()
    }

    // const handleLogin = async () => {
    //     const { success, data } = await loginUser({
    //         credential: userCredential.value,
    //         password: password.value
    //     })

    //     setfailLogin(!success)

    //     if (success) {
    //         const userId = String(data?.id_use)
    //         const voteId = String(data?.vot_use)
    //         handleOnLogin(userId, voteId)
    //     }
    // }

    const handleLoginAdmin = async () => {
        const { success, data } = await loginAdmin({
            userName: userCredential.value,
            password: password.value
        })

        setfailLogin(!success)

        if (success) {
            const userId = String(data?.id)
            handleOnLoginAdmin(userId!)
        }
    }

    return (
        <section className='form-container'>
            <div className='cont'>
                <h1>Iniciar Sesión</h1>

                <div className={classError}>
                    <svg className="bi" width="16" height="16" fill="currentColor">
                        <use href="/assets/icons.svg#warning"></use>
                    </svg>
                    <span>{
                        failLogin ? "Credenciales incorrectas." : newRegister && "Registrado correctamente. Inicia sesión"
                    }</span>
                </div>

                <form onSubmit={handleSubmit} className='cont-form'>
                    <div className='cont-form-field'>
                        <label htmlFor='credential'>Email o nombre de usuario</label>
                        <input
                            {...userCredential}
                            name='credential'
                            id='credential'
                        />
                    </div>

                    <div className='cont-form-field'>
                        <label htmlFor='password'>Contraseña</label>
                        <input
                            {...password}
                            name='password'
                            id='password'
                        />
                    </div>

                    <input className='cont-form-submit' type="submit" value="Iniciar sesión" />
                </form>
                <div className="cont-link">
                    <span>¿No tienes cuenta?</span> <Link to={'/register'}>Regístrate</Link>
                </div>
            </div>

        </section>
    )
}

export { Login }