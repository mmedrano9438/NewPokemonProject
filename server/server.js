const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// const axios = require('axios');
const { getPokemonByName, getAllPokemons, getPokemonById } = require('./helpers/pokemon');

mongoose.connect('mongodb://localhost/mypokemon', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(error => console.error('Failed to connect to database:', error));


const { PORT = 3000 } = process.env;

const pokemonSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  name: { type: String, required: false },
  type: { type: String, required: false },
  description: { type: String, required: false },
  image: { type: String, required: false },
  stars: { type: Number, default: 77 },
  createdAt: { type: Date, default: Date.now }
});

// console.log(pokemonSchema)
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.get('/', (_, res) => res.sendFile(path.join(__dirname, '../dist')));

const Pokemon = mongoose.model('Pokemon', {pokemonSchema});

// console.log(Pokemon) // Model { Pokemon }

//accessing pokemon from my personal db
app.get('/pokemon', async (req, res) => {
  try {
    const favoritePokemons = await Pokemon.find();
    // console.log(favoritePokemons, 'favoritePOkemon')
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(favoritePokemons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//save pokemon to my database
app.post('/pokemon', async (req, res) => {
  const body = req.body;
  console.log(body, 'howdyyyy')
  try {
    const pokemon = await Pokemon.findOne(body);
    if (pokemon) {
    return console.log('Pokemon already exists. Would you like to add a star?')
    } else {
      const poke = new Pokemon(pokemon);
      await poke.save();
      // await poke.save();
      console.log('Success this is your new Pokemon saved to database', poke)
      res.setHeader('Content-Type', 'application/json');
      return res.status(201).send(JSON.stringify(poke));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//update pokemon by adding to its rank number, add by one
//client is going to make a put request to the server, 
//and the server is going to make a get request to the db
app.put('/pokemon/id/stars', (req, res) => {
  const pokemonId = req.params.id;
  const updatedPokemon = req.body;

  Pokemon.findOneAndUpdate(pokemonId, updatedPokemon)
    .exec()
    .then(pokemon => {
      // console.log(pokemon, 'hello world')
      res.status(200).json(pokemon);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

//remove star from pokemon
app.delete('/pokemon/id/stars', async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    pokemon.stars--;
    await pokemon.save();
    res.status(200).json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
//trying to delete the currrent data by id property
app.delete('/pokemon/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
    if (!pokemon) {
      return res.status(404).send('Pokemon not found');
    }
    console.log('Pokemon deleted:', pokemon);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.use(express.static('client'))

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server listening on :${PORT}`);
});


module.exports = Pokemon;

