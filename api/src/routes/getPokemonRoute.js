const Router = require('express');
const { Pokemon, Types } = require('../db')
const { getAllPokemon } = require('./controllers/getPokemon')
const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    const pokemonsTotal = await getAllPokemon();
    try {
        if (name) {
            let pokemonName = pokemonsTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            pokemonName.length ?
                res.status(200).json(pokemonName) :
                res.status(404).send('Pokemon not found')
        } else {
            res.status(200).json(pokemonsTotal);
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allPokemons = await getAllPokemon();
    try {
        if (id) {
            const pokemonId = allPokemons.filter(e => e.id == id);
            pokemonId.length ?
                res.status(200).json(pokemonId) :
                res.status(404).send('Pokemon not found')
        }
    } catch (error) {
        console.log(error);
    }
})
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const allPokemons = await getAllPokemon();
    try {
        if (id) {
            const deletePoke = allPokemons.filter(poke => poke.id == id);
            deletePoke.length ?
                res.status(200).send('Pokemon eliminado') :
                res.status(400).send('Error')
        }
    } catch (error) {
        console.log(error);
    }
})
router.post('/', async (req, res) => {
    const { name, hp, attack, defense, speed, height, weight, sprite, createdInDb, types } = req.body;
    if (!name || !hp || !attack || !defense || !speed || !height || !weight) {
        console.log(name);
        return res.status(400).json({ info: `Falta ingresar un dato` });
    }

    let arrType = [];
    req.body.types.map(e => arrType.push({ name: e }));
    if (!arrType.length) {
        return res.status(400).json({ info: `Debes elegir al menos un tipo` });
    }
    console.log(arrType, 'HOLAAA ARRAY DE MI CORAZON');

    const exist = await Pokemon.findOne({ where: { name: req.body.name } });
    console.log('NO QUIERO QUE SE PIERDA ESTE EXIST', exist);

    if (exist) {
        console.log('CUALQUIER COSA', exist );
        return res.status(400).json({ info: "Ya existe un pokemon con ese nombre" });  
    } 

    try {

        const createdPokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            sprite,
            createdInDb
        });
        const createdDb = await Types.findAll({
            where: { name: types }
        });
        createdPokemon.addType(createdDb);
        return res.status(200).send('Pokemon creado!')

    } catch (error) {
        console.log(error);
    }
})


module.exports = router;