import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPokemon,
    filterPokemonsByType,
    filterCreatedDB,
    filterAttack,
    filterAlphabetical,
} from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../card/Card';
import Paging from '../paging/Paging';
import styles from './home.module.css'
import NavBar from '../NavBar';

export default function Home() {
    const dispatch = useDispatch();
    const allPokemon = useSelector(state => state.pokemons);
    // const types = useSelector((state)=> state.types) 
    // console.log(allPokemon);

    // eslint-disable-next-line
    const [order, setOrder] = useState('');
    // eslint-disable-next-line
    const [attack, setAttack] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line
    const [pokemonPerPage, setPokemonPerPage] = useState(8);
    const indexLastPokemon = currentPage * pokemonPerPage;
    const indexFirstPokemon = indexLastPokemon - pokemonPerPage;
    const currentPokemon = allPokemon.slice(indexFirstPokemon, indexLastPokemon);
    // console.log('hello', currentPokemon);

    const paging = (pageNumber) => {
        setCurrentPage(pageNumber)
    };


    useEffect(() => {
        dispatch(getPokemon());
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemon());
    }


    function handleTypes(e) {
        e.preventDefault();
        dispatch(filterPokemonsByType(e.target.value));
        setCurrentPage(1)
        console.log(e.target.value, 'HANDLE TYPES');
    }

    function handleFilterCreatedInDb(e) {
        e.preventDefault();
        dispatch(filterCreatedDB(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterAttack(e) {
        e.preventDefault();
        dispatch(filterAttack(e.target.value));
        setCurrentPage(1);
        setAttack(`Ordenado ${e.target.value}`);

    }

    //  const handleFilter = (e, funcion) => { 
    //     dispatch(funcion)
    //     setOrder()
    //     setPaging()
    //    }


    function handleFilterAlphabetical(e) {
        e.preventDefault();
        dispatch(filterAlphabetical(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }
    function search() {
        setCurrentPage(1)
    }

    return (
        <div className={styles.body}>
            <NavBar
                search={search}
                typesFilter={handleTypes}
                attackFilter={handleFilterAttack}
                orderFilter={handleFilterAlphabetical}
                createdFilter={handleFilterCreatedInDb}
            />
            <div className={styles.navContainer}>
                <button onClick={e => { handleClick(e) }} className={styles.btn}>
                    Recargar
                </button>
                <Link to='/pokemon'>
                    <button className={styles.btn}>
                        Crear
                    </button>
                </Link>
            </div>
            <div className={styles.cardContainer}>
                {currentPokemon.length ? currentPokemon?.map((e, index) => {
                    return (
                        <div key={index} className={styles.pokemon}>
                            <Link className={styles.link} to={'/details/' + e.id}>
                                <Card
                                    name={e.name}
                                    types={e.types.map(el => el.name + (' '))}
                                    sprite={e.sprite}
                                    key={e.id}>
                                </Card>
                            </Link>
                        </div>
                    );
                }) :
                    <p>Loading...</p>
                }
            </div>
            <div>
                <Paging
                    pokemonPerPage={pokemonPerPage}
                    allPokemon={allPokemon.length}
                    paging={paging}
                />
            </div>
        </div>
    )
}

