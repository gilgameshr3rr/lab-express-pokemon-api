const express = require("express");

const PORT = 4000;

const app = express();

app.use(express.json());

// Importing all the pokemon for our data file
const allPokemon = require("./data");

app.get("/pokemon", (req, res) => {
    return res.status(200).json(allPokemon);
});

app.get("/pokemon/:id", (req, res) => {
    const {id} = req.params;
    const findPokemonId = allPokemon.find(
        (currentElement) => currentElement.id.toString() === id);

    return res.status(200).json(findPokemonId);

});

// app.get("/search", (req, res) => {
//     const {name} = req.query; 
//     const searchPokemon = allPokemon.filter(
//         (currentElement) => currentElement.name.toLowerCase().includes(name.toLowerCase())
//     );

//     return res.status(200).json(searchPokemon);
// })

app.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    const deletePokemon = allPokemon.find(
        (currentElement) => currentElement.id.toString() === id);

    allPokemon.splice(allPokemon.indexOf(deletePokemon), 1);

    return res.status(200).json(deletePokemon);
})
// -- Define your route listeners here! --

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
