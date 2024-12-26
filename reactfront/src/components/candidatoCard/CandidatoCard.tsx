import { useEffect, useState } from 'react'
import { Mary, Sara } from '../../util/data';
import clsx from 'clsx';
import styles from './Card.module.css'

interface CardProps {
    isLocked?: boolean
    handleLock: () => void
}

const Card = ({
    isLocked = false, handleLock
}: CardProps) => {
    const [chosen, setChosen] = useState<boolean>(false)
    const algo = true

    const bgImage: string = algo
        ? 'url("/assets/bg1.svg")'
        : 'url("/assets/bg2.svg")'

    const buttonText: string = chosen
        ? "Elegido"
        : "Votar"

    const buttonClass: string = clsx(styles.cardButton, {
        [styles.isChoose]: chosen,
        [styles.isLocked]: isLocked
    })

    const handleVote = () => {
        if (isLocked) return

        setChosen(!chosen)
        handleLock()
    }

    useEffect(() => {
    }, [])

    const candidato = algo ? Sara : Mary

    return (
        <section className={styles.card} style={{
            backgroundImage: bgImage
        }} >
            <header className={styles.cardHeader}>
                {candidato.candidatos.map((candidato) => (
                    <div className={styles.cardDelegadoCard} key={candidato.id}>
                        <img src={candidato.img} className={styles.cardImg} alt='Imagen del candidato' />
                        <div className={styles.cardInfo}>
                            <h2 className={styles.cardInfoH2}>{candidato.name}</h2>
                            <div className={styles.cardDelegadoCargo}>
                                <p><strong>{candidato.cargo}</strong></p>
                            </div>
                        </div>
                    </div>
                ))}
            </header>
            <div className={styles.eslogan}>
                <p>{candidato.eslogan}</p>
            </div>
            <button className={buttonClass} onClick={handleVote}>
                {isLocked
                    ? <svg className='bi' width='32' height='32' fill='currentColor'>
                        <use href='/assets/icons.svg#lock'></use>
                    </svg>
                    : <span className={styles.cardButtonText}>{buttonText}</span>
                }
                <span className={styles.cardButtonChangeVote}>
                    Cambiar voto
                </span>
            </button>
        </section >
    )
}

export default Card