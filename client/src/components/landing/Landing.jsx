import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../landing/landing.module.css'
import pokebola from '../../assets/pokebola.png'
export default function LandingPage() {
    return (
        <div  className={styles.container}>
            <div className={styles.img}>
                <div className={styles.btnCont}>
                    <Link className={styles.btn} to='/pokemons'>
                        <img src={pokebola} className={styles.btn} />
                    </Link>
                </div>
            </div>
        </div>
    )
};