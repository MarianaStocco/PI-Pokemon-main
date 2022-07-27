import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
    createPokemon,
    getPokemonTypes
} from "../../actions";

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name must be completed';
    }
    return errors;
}

export default function PokemonCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const tipos = useSelector((state) => state.types)
    const [errors, setErrors] = useState({});
console.log(tipos);
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
        <div>
            <h1>Create your pokemon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <p>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </p>
                <p>
                    <label>Hp: </label>
                    <input
                        type="number"
                        value={input.hp}
                        name="hp"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </p>
                <p>
                    <label>Attack: </label>
                    <input
                        type="number"
                        value={input.attack}
                        name="attack"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </p>
                <p>
                    <label>Defense: </label>
                    <input
                        type="number"
                        value={input.defense}
                        name="defense"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </p>
                <p>
                    <label>Speed: </label>
                    <input
                        type="number"
                        value={input.speed}
                        name="speed"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </p>
                <p>
                    <label>Height: </label>
                    <input
                        type="number"
                        value={input.height}
                        name="height"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </p>
                <p>
                    <label>Weight: </label>
                    <input
                        type="number"
                        value={input.weight}
                        name="weight"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </p>
                <p>
                    <label>Sprite: </label>
                    <input
                        type="url"
                        value={input.sprite}
                        name="sprite"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </p>
                <div>
                    <label>Types: </label>
                    <select
                        onChange={(e) => handleSelect(e)}
                        name='types'
                        required>
                        {tipos.map((e) => (
                            <option value={e}>{e}</option>
                        ))}
                    </select>
                    <ul>
                        <p>{input.types.map(e => e + ", ")}</p>
                    </ul>
                    <button type='submit'>Create</button>
                    <Link to='/pokemons'><button className='return'>Return</button></Link>
                </div>
            </form>
            {input.types.map(e =>
                <div>
                    <p>{e}</p>
                    <button
                        onClick={() => handleDelete(e)}
                        value='x'>x</button>
                </div>
            )}
        </div>
    )
}
