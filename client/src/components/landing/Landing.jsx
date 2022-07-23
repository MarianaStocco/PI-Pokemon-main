import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage () {
    return (
        <div>
            <h1>¡Atrápalos a todos!</h1>
            <Link to = '/pokemons'>
                <button>Entrar</button>
            </Link>
        </div>
    )
};