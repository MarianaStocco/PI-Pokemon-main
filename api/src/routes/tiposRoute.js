const { Router } = require('express');
const axios = require('axios');
const { Types } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    const typeNormal = await Types.findOne({where: {name:'normal'}});
  
    if(!typeNormal) {
        try {
            const types = await axios.get("https://pokeapi.co/api/v2/type");
            const typesTotal = types.data.results.map(e => e.name);
            const typesCreate = typesTotal.map(async e => await Types.create({ name: e }));
            res.status(200).send(typesCreate);
        } catch (error) {
            res.status(404).send('error');
        };
    } else {
        const types = await Types.findAll();
        const typesTotal = types.map(e => e.name);
        return res.status(200).send(typesTotal);
    };
})


module.exports = router;