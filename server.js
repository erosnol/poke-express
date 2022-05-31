const express = require('express')

const pokemon = require("./models/pokemon")

const app = express()
const PORT = 3000;

//home
app.get('/', (req, res) => {
    res.render("home.ejs", {pageTitle: "Poke Express Home"})
})

//display list of pokemon name 
app.get('/pokemon', (req, res) => {
    res.render("Index.ejs", {data: pokemon, pageTitle: "Pokemon"});
});

// Pokemon:id
app.get('/pokemon/:index', (req, res) => {
    res.render("Show.ejs",
        {pokemon: pokemon[req.params.index]
});
});

// App Listener
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });