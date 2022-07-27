import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../landing/landing.module.css'

export default function LandingPage () {
    return (
        <div className={styles.img}>
            <div className={styles.container}>
            <h1>¡Atrápalos a todos!</h1>
            <Link to = '/pokemons'>
                <button className={styles.btn}>Entrar</button>
            </Link>
            </div>
        </div>
    )
};