import { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Card.module.css'
import { Partido } from '../../util/models/PartidoModel';
import { VotoContext } from '../../pages/PageCandidatos';

interface CardProps {
    isLocked?: boolean
    handleLock: () => void,
    partido: Partido,
    idPartido: number
}

const Card = ({
    isLocked = false, 
    handleLock,
    partido,
    idPartido
}: CardProps) => {
    const [chosen, setChosen] = useState<boolean>(false)
    const { openModal, idPartido: partidoId } = useContext(VotoContext)

    const buttonText: string = chosen
        ? "Elegido"
        : "Votar"

    const buttonClass: string = clsx(styles.cardButton, {
        [styles.isChoose]: chosen,
        [styles.isLocked]: isLocked
    })

    const handleVote = () => {
        if (isLocked || chosen) return

        setChosen(!chosen)
        handleLock()
        openModal(idPartido)
    }

    useEffect(() => {
        if (partidoId === idPartido) {
            setChosen(true)
        }
    } , [partidoId, idPartido])

    return (
        <section className={styles.card} style={{
            backgroundImage: 'url("/assets/bg2.svg")'
        }} >
            <header className={styles.cardHeader}>
                {partido.candidatos.map((candidato, index) => (
                    <div className={styles.cardDelegadoCard} key={index}>
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
                <p>{partido.eslogan}</p>
            </div>
            <button className={buttonClass} onClick={handleVote}>
                {isLocked && !chosen
                    ? 
                    <svg className='bi' width='32' height='32' fill='currentColor'>
                        <use href='/assets/icons.svg#lock'></use>
                    </svg>:
                    <span className={styles.cardButtonText}>{buttonText}</span>
                }
            </button>
        </section >
    )
}

export default Card