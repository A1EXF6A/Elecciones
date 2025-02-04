import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './NewsCard.module.css';

interface News {
    title: string;
    date: string;
    content: string;
    img: string;
}

interface NewsCardProps {
    newsItem: News;
    isRead?: boolean;
    handleMarkAsRead: (title: string) => void;
}

const NewsCard = ({
    newsItem,
    isRead = false,
    handleMarkAsRead,
}: NewsCardProps) => {
    const [markedRead, setMarkedRead] = useState(isRead);

    const buttonClass = clsx(styles.cardButton, {
        [styles.isRead]: markedRead,
    });

    const handleRead = () => {
        setMarkedRead(!markedRead);
        handleMarkAsRead(newsItem.title);
    };

    useEffect(() => {
        const readStatus = localStorage.getItem(newsItem.title);
        if (readStatus === 'true') {
            setMarkedRead(true);
        }
    }, [newsItem.title]);

    return (
        <section className={styles.card}>
            <header className={styles.cardHeader}>
                <img src={newsItem.img} className={styles.cardImg} alt="Imagen de la noticia" />
            </header>
            <div className={styles.cardInfo}>
                <h2>{newsItem.title}</h2>
                <p>{newsItem.date}</p>
                <button className={buttonClass} onClick={handleRead}>
                    {markedRead ? 'Leído' : 'Marcar como leído'}
                </button>
            </div>
            <div className={styles.cardContent}>
                <p>{newsItem.content}</p>
            </div>
        </section>
    );
};

export default NewsCard;
