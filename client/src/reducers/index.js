
const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: []

}

// let filter = (pokemons, payload) => {
//     return pokemons.filter(e => e.types.map(e => e.name)[0] === payload || e.types.map(e => e.name)[1] === payload)
// }
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMON':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case 'FILTER_BY_TYPE':
                const typeFiltered = action.payload === 'todos'
                ? state.allPokemons 
                : state.allPokemons.filter(
                    ((e) => 
                     e.types.filter((e)=> e.name === action.payload).length))
                    //  e.types.map(e => e.name)[0] === action.payload || e.types.map(e => e.name)[1] === action.payload))
            // console.log(typeFiltered.filter(e => console.log(e.types)))
            return {
                ...state,
                pokemons: typeFiltered
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'CREATED_DB':
            const pokemonAll = state.allPokemons
            const createdInDb = action.payload === 'creados' ?
                pokemonAll.filter(pokemon => pokemon.createdInDb) :
                pokemonAll.filter(pokemon => !pokemon.createdInDb)
            return {
                ...state,
                pokemons: action.payload === 'todos' ?
                    state.allPokemons :
                    createdInDb
            }
        case 'FILTER_ATTACK':
            let pokemonByAttack = action.payload === 'mayor' ?
                state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return -1;
                    }
                    if (b.attack > a.attack) {
                        return 1;
                    }
                    return 0;
                }) :
                state.pokemons.sort(function (a, b) {

                    if (a.attack > b.attack) {
                        return 1;
                    }
                    if (b.attack > a.attack) {
                        return -1;
                    }
                    return 0;
                })
            return {
                ...state,
                pokemons: pokemonByAttack
            }
        case 'FILTER_ALPHABETICAL':
            let orderByName = action.payload === 'a-z' ?
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1
                    }
                    return 0
                }) :
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                pokemons: orderByName
            }
        case 'GET_POKEMON_DETAIL':
            return {
                ...state,
                detail: action.payload
            }
        case 'RESET_DETAIL':
            return {
                ...state,
                detail: []
            }
        case 'GET_POKEMON_NAME':
            return {
                ...state,
                pokemons: action.payload
            }
        case 'CREATE_POKEMON':
            return {
                ...state,
                pokemons: action.payload,
            }

        default:
            return state;
    }
};

export default rootReducer;