import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPokemonTypes,
    filterCreatedDB,
    filterAttack,
    filterAlphabetical,
} from '../../actions';

export default function Filters() {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types)
   
    const [order, setOrder] = useState('')

    useEffect(() => {
        dispatch(getPokemonTypes())
    }, [dispatch])

    function handleTypes(e) {
        e.preventDefault();
        dispatch(getPokemonTypes(e.target.value))
        setOrder(e.target.value)
    }

    function handleAttack(e) {
        e.preventDefault();
        dispatch(filterAttack(e.target.value))
        setOrder(e.target.value)
    }

    function handleOrder(e) {
        e.preventDefault()
        dispatch(filterAlphabetical(e.target.value))
        setOrder(e.target.value)
    }

    function handleCreated(e) {
        e.preventDefault();
        dispatch(filterCreatedDB(e.target.value))
        setOrder(e.target.value)
    }


    return (
        <div>
            <div >
                <select onChange={e => { handleOrder(e) }}>Orden alfabético
                    <option type='checkbox' value='a-z'>A-Z</option>
                    <option type='checkbox' value='z-a'>Z-A</option>
                </select>

                <select onChange={e => { handleTypes(e) }}>
   
            {types && types.map(type => {
                return (
                    <option>{type}</option>
                )
            })}
        </select>

            </div>
            {/* <div className={styles.navContainer}>
                <SearchBar />
            </div> */}
            <div >
                <div >

                    {/* <select className={styles.filter} onChange={e => { handleTypes(e) }} >
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
                    </select> */}
                </div>
                <div >
                    <select  onChange={e => { handleAttack(e) }}>
                        <option value='mayor'>Mayor ataque</option>
                        <option value='menor'>Menor ataque</option>
                    </select>
                </div>
                <div >
                    <select onChange={e => { handleCreated(e) }}>
                        <option value='todos'>Todos</option>
                        <option value='creados'>Creados</option>
                        <option value='existentes'>Existentes</option>
                    </select>
                </div>
            </div>
        </div>
    )

}