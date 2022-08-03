import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    createPokemon,
    getPokemonTypes
} from "../../actions";
import styles from "./styles.module.css"


export default function PokemonCreate() {
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
    // console.log(input);
    function isNumber(n) {
        if (/^\d+$/.test(n)) {
            return true;
        }
        return false;
    }

    function isString(n) {
        if (/^\D+$/.test(n)) {
            return true;
        }
        return false;
    }

    function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = 'Debes completar el nombre';
            console.log(errors);
        } else if (!isString(input.name)) errors.name = 'Solo letras!';
        else if (!input.hp) errors.hp = 'Falta completar';
        else if (!isNumber(input.hp)) errors.hp = 'Solo números!';
        else if (!input.attack) errors.attack = 'Falta completar';
        else if (!isNumber(input.attack)) errors.attack = 'Solo números!';
        else if (!input.defense) errors.defense = 'Falta completar';
        else if (!isNumber(input.defense)) errors.defense = 'Solo números!';
        else if (!input.speed) errors.speed = 'Falta completar';
        else if (!isNumber(input.speed)) errors.speed = 'Solo números!';
        else if (!input.height) errors.height = 'Falta completar';
        else if (!isNumber(input.height)) errors.height = 'Solo números!';
        else if (!input.weight) errors.weight = 'Falta completar';
        else if (!isNumber(input.weight)) errors.weight = 'Solo números!';
        return errors;
    }

    function handleChange(e) {
        e.preventDefault()
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
        e.preventDefault()
        input.types.length < 2 && !input.types.includes(e.target.value) ? setInput({
            ...input,
            types: [...input.types, e.target.value]
        }) : alert('Maximo dos tipos!')
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(Object.values(errors).length){
            let message = {};
            let err = Object.values(errors);
            return alert (message = err.map(e => e + '\n'));
        } else {
           const { name, hp, attack, defense, speed, height, weight, sprite, types } = input;
           if (name && hp && attack && defense && speed && height && weight && sprite
             && types.length !== 0) {
            dispatch(createPokemon(input));
                alert("Pokemon creado con exito!");
            } else {
                alert("Te falta completar un campo!");
                history.push('/pokemon')
            }
            setInput({
                name: "",
                hp: "",
                attack: "",
                defense: "",
                speed: "",
                height: "",
                weight: "",
                sprite: "",
                types: [],
            });
            history.push("/pokemons");
        }
             // console.log('HOLAA');
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
            <h1 className={styles.h1}>Crea tu Pokemon</h1>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.inputCont}>
                    <label htmlFor="name">Nombre: </label>
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
                    {errors.hp && (
                        <p>{errors.hp}</p>
                    )}
                </div>
                <div className={styles.inputCont}>
                    <label htmlFor="attack">Ataque: </label>
                    <input
                        className={styles.input}
                        type="number"
                        value={input.attack}
                        name="attack"
                        id="attack"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errors.attack && (
                        <p>{errors.attack}</p>
                    )}
                </div>
                <div className={styles.inputCont}>

                    <label htmlFor="defense">Defensa: </label>
                    <input
                        className={styles.input}
                        type="number"
                        value={input.defense}
                        name="defense"
                        id="defense"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errors.defense && (
                        <p>{errors.defense}</p>
                    )}
                </div>
                <div className={styles.inputCont}>

                    <label>Velocidad: </label>
                    <input
                        className={styles.input}
                        type="number"
                        value={input.speed}
                        name="speed"
                        id="speed"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errors.speed && (
                        <p>{errors.speed}</p>
                    )}
                </div>
                <div className={styles.inputCont}>

                    <label>Altura: </label>
                    <input
                        className={styles.input}
                        type="number"
                        value={input.height}
                        name="height"
                        id="height"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errors.height && (
                        <p>{errors.height}</p>
                    )}
                </div>
                <div className={styles.inputCont}>

                    <label>Peso: </label>
                    <input
                        className={styles.input}
                        type="number"
                        value={input.weight}
                        name="weight"
                        id="weight"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errors.weight && (
                        <p>{errors.weight}</p>
                    )}
                </div>
                <div className={styles.inputCont}>

                    <label>Imagen (url): </label>
                    <input
                        className={styles.input}
                        type="url"
                        value={input.sprite}
                        name="sprite"
                        id="sprite"
                        onChange={(e) => handleChange(e)}
                        placeholder={("https://...")}
                        required
                    />
                </div>
                <div className={styles.inputCont}>
                    <label>Tipo: </label>
                    <select
                        onChange={(e) => handleSelect(e)}
                        className={styles.input}
                        name='types'
                        id="types"
                        required
                        >
                        {
                            tipos?.map((e, index) => {
                                return (
                                <option value={e.name} key={e.id}>{e}</option>)
                            })
                        }
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

                <div className={styles.footer}>
                    <button className={styles.btn} onClick={() => history.push("/pokemons")}>Volver</button>
                    <button className={styles.btn} type='submit'> Crear</button>
                </div>
            </form>

        </div>
    )
}
