import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemon } from "../../actions";
import SearchBar from "../searchBar/SearchBar";
import styles from "./styles.module.css"

const NavBar = ({ search, typesFilter, attackFilter, orderFilter, createdFilter }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemon());
    }, [dispatch])

    return (

        <div className={styles.contNav} >
            <div className={""}>
                <span >POKE</span>
                <span >App</span>
            </div>

            <div className={styles.items}>

                <div className={""}>
                    <select className={styles.filter} onChange={e => { orderFilter(e) }}>Orden alfabético
                        <option type='checkbox' value='a-z'>A-Z</option>
                        <option type='checkbox' value='z-a'>Z-A</option>
                    </select>

                    {/* <select onChange={e => { handleTypes(e) }}>
                       
                                {types && types.map(type => {
                                    return (
                                        <option>{type}</option>
                                    )
                                })}
                            </select> */}

                </div>

                <div className={styles.navContainer}>
                    <div className={styles.filterContainer}>

                        <select className={styles.filter} onChange={e => { typesFilter(e) }} >
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
                    </div>
                    <div className={styles.filterContainer}>
                        <select className={styles.filter} onChange={e => { attackFilter(e) }}>
                            <option value='mayor'>Mayor ataque</option>
                            <option value='menor'>Menor ataque</option>
                        </select>
                    </div>
                    <div className={styles.filterContainer}>
                        <select className={styles.filter} onChange={e => { createdFilter(e) }}>
                            <option value='todos'>Todos</option>
                            <option value='creados'>Creados</option>
                            <option value='existentes'>Existentes</option>
                        </select>
                    </div>
                </div>
                <div onChange={(e) => search(e)} className={""}>
                    <SearchBar />
                </div>
            </div>

        </div>
    )
}
export default NavBar;