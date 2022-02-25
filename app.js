const express = require("express");
const data = require("./data");
const { v4: uuidv4 } = require("uuid");

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

app.get("/search", (req, res) => {
    const {name, types} = req.query; 
    const searchPokemon = allPokemon.filter(
        name ?
        (currentElement) => currentElement.name === name.toLowerCase()
        :
        (currentElement) => currentElement.types.includes(types.toLowerCase())    
    );

    return res.status(200).json(searchPokemon);
})

// suggested solution

// router.get("/search", (req, res) => {
//     if (Object.keys(req.query)[0] === "name") {
//       const foundedPokemon = allPokemon.filter((currentPokemon) => {
//         return currentPokemon.name.includes(req.query.name);
//       });
//       return res.status(200).json(foundedPokemon);
//     } else if (Object.keys(req.query)[0] === "types") {
//       const foundedPokemon = allPokemon.filter((currentPokemon) => {
//         return currentPokemon.types.includes(req.query.types);
//       });
  
//       return res.status(200).json(foundedPokemon);
//     }
  
//     return res.status(400).json({ msg: "Mande a query direito!" });
// });

app.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    const deletePokemon = allPokemon.find(
        (currentElement) => currentElement.id.toString() === id);

    allPokemon.splice(allPokemon.indexOf(deletePokemon), 1);

    return res.status(200).json(deletePokemon);
});

app.post("/create", (req, res) => {
    const newPokemon = {
        ...req.body,
        id: uuidv4(),
    };
    allPokemon.push(newPokemon);

    return res.status(201).json(newPokemon);
});

app.put("/edit/:id", (req, res) => {
    const {id} = req.params;
    const editPokemon = allPokemon.find(
        (currentElement) => currentElement.id.toString() === id
    );

    allPokemon[allPokemon.indexOf(editPokemon)] = {
        ...editPokemon,
        ...req.body,
    };

    return res.status(200).json(editPokemon);
});

// -- Define your route listeners here! --

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
