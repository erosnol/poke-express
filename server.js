const express = require('express')
const pokemon = require("./models/pokemon")
require('dotenv').config()
const mongoose = require('mongoose');
const PokemonModel = require('./Models/PokemonModel')


//* ======= set up
const app = express()
const PORT = 3000;
app.set('view engine', 'ejs')
app.set('views', './Views')

//* ======== middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

//* ========== routes 
// home
app.get('/', (req, res) => {
    res.render("home.ejs", {
        pageTitle: "Poke Express Home"
    })
})

//display list of pokemon name 
app.get("/pokemon", async (req, res) => {

    try {
        // fetch data from the db
        const pokemons = await PokemonModel.find();

        res.render("Index", {
            pageTitle: "Pokemon",
            pageHeader: "See All The Pokemon!",
            pokemon: pokemons,
        });
    } catch (error) {
        console.log(error);
    }
});

// form 
app.get('/pokemon/new', (req, res) => {
    res.render("New.ejs", {
        pageTitle: "Add a Pokemon",
    })
})

//* POST REQUEST HANDLER
app.post('/pokemon', async (req, res) => {
    const newPokemon = req.body // create a newPokemon variable
    // add a img property to the object
    newPokemon.img = `http://img.pokemondb.net/artwork/${req.body.name.toLowerCase()}`

    console.log(newPokemon);

    //* Save the new pokemon to the db
    await PokemonModel.create(newPokemon, (error, result) => {
        if (error) {
            console.log(error)
        }
        res.redirect('/pokemon')
        console.log(result);
    })
})

// Pokemon:id
app.get('/pokemon/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const pokemon1 = await PokemonModel.findById(req.params.id)
        console.log('POKEMON FOUND!', pokemon1);

        res.render("Show.ejs", {
            pageHeader: "Gotta Cath 'Em All",
            name: pokemon[req.params.name],
            pokemon: pokemon1,
        });
    } catch (error) {
        console.log(error);
    }
});


//* ====== listener 
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    mongoose.connect(process.env.MONGODB_URI) // connects to MONGO DB
    console.log('MongDB Connected!');
});