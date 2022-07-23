const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getPokemons = require('./getPokemonRoute');
const getPokemonTypes = require('./tiposRoute')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', getPokemons);
router.use('/types', getPokemonTypes);


module.exports = router;
