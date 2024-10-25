import { FormEvent, useState } from 'react'
import { Link } from "react-router-dom"
import { useField } from '../../util/hooks/useField';
import { loginUser } from '../../util/auth';
import clsx from 'clsx';

const Login = () => {
    const [failLogin, setfailLogin] = useState(false)
    const userCredential = useField('email')
    const password = useField('password')

    const classError = clsx('cont-error', {
        'show': failLogin
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        handleLogin()
    }

    const handleLogin = async () => {
        const failLogin = ! await loginUser({
            credential: userCredential.value,
            password: password.value
        })

        setfailLogin(failLogin)
    }

    return (
        <section className='form-container'>
            <div className='cont'>
                <h1>Iniciar Sesión</h1>

                <div className={classError}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                    </svg>
                    <span>Credenciales incorrectas.</span>
                </div>

                <form onSubmit={handleSubmit} className='cont-form'>
                    <div className='cont-form-field'>
                        <label htmlFor='email'>Email o nombre de usuario</label>
                        <input
                            {...Credential}
                            name='email'
                            id='email'
                            required
                        />
                    </div>

                    <div className='cont-form-field'>
                        <label htmlFor='password'>Contraseña</label>
                        <input
                            {...password}
                            name='password'
                            id='password'
                            required
                            minLength={5}
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