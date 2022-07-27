import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPokemonDetail, resetDetail } from '../../actions';


export default function Details() {
    
    const dispatch = useDispatch();
    const {id} = useParams();


    useEffect(() => {
        dispatch(getPokemonDetail(id));
        dispatch(resetDetail());
    }, [dispatch, id]);


const pokeDetail = useSelector((state) => state.detail)
console.log(pokeDetail);

return (
    <div>
        <div>
            <button>
                <Link to='/pokemon'>
                    Crear Pokemon
                </Link>
            </button>
            <button>
                <Link to= '/pokemons'>
                    Volver
                </Link>
            </button>
        </div>

       <div>
        {Object.keys(pokeDetail).length > 0 ?
            <div>
                <h1>{pokeDetail[0].name}</h1>
                <img src={pokeDetail[0].sprite} alt='' width='250px' height='250px' />
                <h3>Types: {pokeDetail[0].types.map(e => e.name + (' '))}</h3>
                <h4>Id: {pokeDetail[0].id}</h4>
                <h4>Hp: {pokeDetail[0].hp}</h4>
                <h4>Attack: {pokeDetail[0].attack}</h4>
                <h4>Defense: {pokeDetail[0].defense}</h4>
                <h4>Speed: {pokeDetail[0].speed}</h4>
                <h4>Height: {pokeDetail[0].height}</h4>
                <h4>Weight: {pokeDetail[0].weight}</h4>
            </div> : <p>Loading...</p>
        }
      
        </div>
    </div>
)
}