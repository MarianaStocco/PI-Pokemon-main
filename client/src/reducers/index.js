
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
            console.log(state.allPokemons);
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
            }
        case 'FILTER_BY_TYPE':
            const allPokes = state.allPokemons;
            const typeFiltered = action.payload === "todos" ? allPokes :
            allPokes.filter( pt => pt.types.map( pt => pt.name ).includes( action.payload ))
            console.log(typeFiltered, 'soy el filter_by_type');
            return{
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
                console.log('CREADOS EN BD', createdInDb.length);
            return {
                ...state,
                pokemons: action.payload === 'todos' ? pokemonAll : createdInDb
                   
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
            }
        case 'ORDER_FIVE' :
            const orderFive = 
            state.allPokemons.sort( (a, b) =>{
                if(a.name < b.name){
                    return -1
                }
                if(b.name < a.name){
                    return 1
                }
                return 0
            })
            return{
                ...state,
                pokemons: orderFive
            }    

        default:
            return state;
    }
};

export default rootReducer;