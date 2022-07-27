const { Pokemon, Tipos } = require('../../db');
const axios = require('axios')


const getPokemonApi = async () => {
  const firtsPage = await axios.get("https://pokeapi.co/api/v2/pokemon") // los primeros 20 pokemon de la api
  const nextPage = await axios.get(firtsPage.data.next) // siguientes 20
  const pokemonTotal = firtsPage.data.results.concat(nextPage.data.results) // concatenado de las dos páginas(40) en una variable.

  try {
      const apiInfo = pokemonTotal.map(pokemon => axios.get(pokemon.url)) // en la prop "url" es donde se encuentran los datos que necesito
      let infoPokemons = Promise.all(apiInfo) // Promise.all para la respuesta de cada url(info).
          .then(poke => {
              let pokemon = poke.map(element => element.data) 
              let info = [] // creo un arreglo de objetos con la info que necesito de cada pokemon.
              pokemon.map(e => {
                  info.push({
                      id: e.id,
                      name: e.name.charAt(0).toUpperCase() + e.name.slice(1),
                      hp: e.stats[0].base_stat,
                      attack: e.stats[1].base_stat,
                      defense: e.stats[2].base_stat,
                      speed: e.stats[5].base_stat,
                      height: e.height,
                      weight: e.weight,
                      sprite: e.sprites.other["official-artwork"].front_default,
                      types: e.types.length < 2 ? [{name: e.types[0].type.name.charAt(0).toUpperCase() + e.types[0].type.name.slice(1)}] : [{name: e.types[0].type.name.charAt(0).toUpperCase() + e.types[0].type.name.slice(1) + ', '}, {name: e.types[1].type.name.charAt(0).toUpperCase() + e.types[0].type.name.slice(1)}]
                  })
              })
              return info;
          })
          return infoPokemons;
  } catch (error) {
      console.log(error)
  }
}

// pokemon de la db.
const getPokemonDb = async () => {
  try {
      return await Pokemon.findAll({
      
     /* Incluido el modelo Tipos y solo devolviendo el atributo de nombre. */
          include: {
              model: Tipos,
              attributes: ['name'],
             
              through: {
                  attributes: []
              }
          }
      })
  } catch (error) {
      console.log(error);
  }
}

//concateno los datos de los pokemon de la api con los de la db.
const getAllPokemon = async () => {
  const apiInfo = await getPokemonApi();
  const dbInfo = await getPokemonDb();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
}

module.exports = {
  getPokemonApi,
  getPokemonDb,
  getAllPokemon
}