import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonName } from "../../actions";
import styles from "./styles.module.css"

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('')

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        // console.log(name);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name) {
            dispatch(getPokemonName(name));
            console.log(name);
        }
        setName('')
    }


    return (
        <div className={styles.cont}>
            <input
                className={styles.input}
                type='text'
                placeholder='Buscar'
                value={name}
                onChange={(e) => { handleInputChange(e) }}
            />
            <button
                className={styles.btn}
                type='submit'
                value={name}
                onClick={(e) => { handleSubmit(e) }}
            >Buscar
            </button>
        </div>
    )
}
