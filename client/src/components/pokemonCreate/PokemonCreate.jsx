import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
    createPokemon,
    getPokemonTypes
} from "../../actions";
import styles from "./styles.module.css"

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name must be completed';
    }
    return errors;
}

export default function PokemonCreate() {
    const navigate = useHistory()
    const dispatch = useDispatch()
    const history = useHistory()
    const tipos = useSelector((state) => state.types)
    const [errors, setErrors] = useState({});
    // console.log(tipos);
    const [input, setInput] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        sprite: "",
        types: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e) {
        input.types.length < 2 && !input.types.includes(e.target.value) ? setInput({
            ...input,
            types: [...input.types, e.target.value]
        }) : alert('Maximum two types')
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createPokemon(input))
        console.log(input)
        setInput({
            name: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            sprite: "",
            types: []
        })
        history.push('/pokemons')
        alert("Pokemon created")
    }

    function handleDelete(e) {
        setInput({
            ...input,
            types: input.types.filter(el => el !== e)
        })
    }

    useEffect(() => {
        dispatch(getPokemonTypes());
    }, [dispatch]);

    return (
        <div className={styles.cont}>
            <h1 className={styles.h1}>Create your pokemon</h1>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.inputCont}>
                    <label htmlFor="name">Name: </label>
                    <input
                        className={styles.input}
                        type="text"
                        value={input.name}
                        name="name"
                        id="name"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div className={styles.inputCont}>
                    <label htmlFor="hp">Hp: </label>
                    <input
                        className={styles.input}

                        type="number"
                        value={input.hp}
                        name="hp"
                        id="hp"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className={styles.inputCont}>
                    <label htmlFor="attack">Attack: </label>
                    <input
                        className={styles.input}
                        type="number"
                        value={input.attack}
                        name="attack"
                        id="attack"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className={styles.inputCont}>

                    <label htmlFor="defense">Defense: </label>
                    <input
                        className={styles.input}
                        type="number"
                        value={input.defense}
                        name="defense"
                        id="defense"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className={styles.inputCont}>

                    <label>Speed: </label>
                    <input
                        className={styles.input}
                        type="number"
                        value={input.speed}
                        name="speed"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className={styles.inputCont}>

                    <label>Height: </label>
                    <input
                        className={styles.input}
                        type="number"
                        value={input.height}
                        name="height"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className={styles.inputCont}>

                    <label>Weight: </label>
                    <input
                        className={styles.input}
                        type="number"
                        value={input.weight}
                        name="weight"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className={styles.inputCont}>

                    <label>Sprite: </label>
                    <input
                        className={styles.input}
                        type="url"
                        value={input.sprite}
                        name="sprite"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className={styles.inputCont}>
                    <label>Types: </label>
                    <select
                        onChange={(e) => handleSelect(e)}
                        className={styles.input}
                        name='types'
                        required>
                        {tipos.map((e) => (
                            <option value={e}>{e}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.deleteType}>
                    {input.types.map(e =>
                        <div className={styles.type}>
                            <p className={styles.Ptype}>{e}</p>
                            <button
                                className={styles.btn}
                                onClick={() => handleDelete(e)}
                                value='x'>x</button>
                        </div>
                    )}
                </div>

            </form>
            <div className={styles.footer}>
                <button className={styles.btn} onClick={() => { navigate.push("./pokemons") }}>Volver</button>
                <button className={styles.btn} type='submit'>Crear</button>
            </div>

        </div>
    )
}
