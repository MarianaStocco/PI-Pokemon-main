import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon, filterPokemonsByType, filterCreatedDB, filterAttack, filterAlphabetical } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../card/Card';
import Paging from '../paging/Paging';



export default function Home() {
    const dispatch = useDispatch();
    const allPokemon = useSelector((state) => state.pokemons); // trae del reducer el estado de todos los pokemon
    console.log(allPokemon);
    const [order, setOrder] = useState('');
    const [attack, setAttack] = useState('');
    const [currentPage, setCurrentPage] = useState(1);// guardar en estado local la página actual
    const [pokemonPerPage, setPokemonPerPage] = useState(12);// setear el 12 la cantidad de pokemon por página.
    const indexLastPokemon = currentPage * pokemonPerPage;
    const indexFirstPokemon = indexLastPokemon - pokemonPerPage;
    const currentPokemon = allPokemon.slice(indexFirstPokemon, indexLastPokemon);


    //ayuda al renderizado del componente
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
    }

    function handleFilterCreatedInDb(e) {
        // e.preventDefault();
        dispatch(filterCreatedDB(e.target.value))
    }

    function handleFilterAttack(e) {
        e.preventDefault();
        dispatch(filterAttack(e.target.value));
        setCurrentPage(1);
        setAttack(`Ordenado ${e.target.value}`);

    }

    function handleFilterAlphabetical(e) {
        e.preventDefault();
        dispatch(filterAlphabetical(e.target.value))
        setCurrentPage(1);
        /* Establecer el estado de la variable order. */
        setOrder(`Ordenado ${e.target.value}`);
    }

    return (
        <div>
            <Link to='/pokemon'>Crear Pokemon</Link>
            <h1>POKEMON</h1>
            <button onClick={e => { handleClick(e) }}>
                Recargar
            </button>
            <div>
                <select onChange={e => { handleFilterAlphabetical(e) }}>
                    <option value='a-z'>A-Z</option>
                    <option value='z-a'>Z-A</option>
                </select>
                <>
                    {/* <select onChange={e => { handleTypes(e) }}>
                        // 
                    {pokemonTypes && pokemonTypes.map(type => {
                        return (
                            <option>{type}</option>
                        )
                    })}
                </select> */}
                </>

                <select onChange={e => { handleTypes(e) }}>
                    <option value='todos'>Todos</option>
                    <option value='normal'>Normal</option>
                    <option value='fighting'>Lucha</option>
                    <option value='flying'>Volador</option>
                    <option value='poison'>Veneno</option>
                    <option value='ground'>Tierra</option>
                    <option value='rock'>Roca</option>
                    <option value='bug'>Bicho</option>
                    <option value='ghost'>Fantasma</option>
                    <option value='steel'>Acero</option>
                    <option value='fire'>Fuego</option>
                    <option value='water'>Agua</option>
                    <option value='grass'>Planta</option>
                    <option value='electric'>Eléctrico</option>
                    <option value='psychic'>Psíquico</option>
                    <option value='ice'>Hielo</option>
                    <option value='dragon'>Dragón</option>
                    <option value='dark'>Siniestro</option>
                    <option value='fairy'>Hada</option>
                    <option value='shadow'>Oscuro</option>
                    <option value='unknown'>Desconocido</option>
                </select>

                <select onChange={e => { handleFilterAttack(e) }}>
                    <option value='mayor'>Mayor ataque</option>
                    <option value='menor'>Menor ataque</option>
                </select>

                <select onChange={e => { handleFilterCreatedInDb(e) }}>
                    <option value='todos'>Todos</option>
                    <option value='creados'>Creados</option>
                    <option value='existentes'>Existentes</option>
                </select>
                <Paging
                    pokemonPerPage={pokemonPerPage}
                    allPokemon={allPokemon.length}
                    paging={paging}
                />
                <div>
                    {currentPokemon ? currentPokemon.map((e) => {
                        return (
                            <div className='cards'>
                                <Link to={'/pokemons/' + e.id}>
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
                        <div>
                            <Link to={'/pokemons/' + allPokemon.id}>
                                <Card
                                    name={allPokemon.name}
                                    types={allPokemon.types.map(el => el.name + (' '))}
                                    sprite={allPokemon.sprite}
                                    key={allPokemon.id}>
                                </Card>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

