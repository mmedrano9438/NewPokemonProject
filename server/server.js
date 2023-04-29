const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// const axios = require('axios');
const {
	getPokemonByName,
	getAllPokemons,
	getPokemonById,
} = require('./helpers/pokemon');

mongoose
	.connect('mongodb://localhost/mypokemon', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to database'))
	.catch((error) => console.error('Failed to connect to database:', error));

const { PORT = 3000 } = process.env;

const pokemonSchema = new mongoose.Schema({
	id: { type: Number, required: false },
	name: { type: String, required: false },
	type: { type: String, required: false },
	base_experience: { type: Number, required: false },
	image: { type: String, required: false },
	stars: { type: Number, default: 0 },
	createdAt: { type: Date, default: Date.now },
});
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.get('/', (_, res) => res.sendFile(path.join(__dirname, '../dist')));

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

//localhost:3000/pokemon : has the 2 Luna objects
//accessing pokemon from my personal db
app.get('/pokemon', async (req, res) => {
	try {
		const favoritePokemons = await Pokemon.find().sort({ stars: -1 });
		// console.log(favoritePokemons, 'favoritePokemon from Get');
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
	// console.log(body, 'howdyyyy');
	try {
		//if pokemon exists then give me pokemon, basically same as if statement
		const pokemon = await Pokemon.findOne(body);
		if (pokemon) {
			res.status(201).send('Cannot add Pokemon twice!');
		} else {
			const poke = new Pokemon(body);
			await poke.save();
			console.log('Success this is your new Pokemon saved to database', poke);
			res.setHeader('Content-Type', 'application/json');
			res.status(201).send(JSON.stringify(poke));
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
});

app.put('/pokemon/:id', async (req, res) => {
	const pokemonId = req.params.id;
	// const pokemonId = new mongoose.ObjectId(req.params.id);
	const updatedPokemon = req.body;
	console.log(updatedPokemon, 'this is updated');
	console.log(pokemonId, 'pokeonID');
	try {
		console.log('🚀 ~ req:', req);
		const pokemon = await Pokemon.findByIdAndUpdate(pokemonId, updatedPokemon);
		console.log(pokemon, 'pokemonnn im here');
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(pokemon);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
});

//trying to delete the currrent data by name property
app.delete('/pokemon/:name', async (req, res) => {
	// console.log(req.params.name, 'this is the name'); // logs the name to be deleted
	try {
		const { name } = req.params;
		// console.log(name, 'name of pokemon you want to delete');
		const pokemon = await Pokemon.findOneAndDelete(name);
		// console.log(pokemon, 'howdyyyyy');
		if (!pokemon) {
			return res.status(404).send('Pokemon not found');
		}
		console.log('Pokemon deleted:', pokemon);
		res.status(201).send();
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
});

//need to look up why this was necessarry
app.use(express.static('client'));

app.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log(`Server listening on :${PORT}`);
});

module.exports = Pokemon;

//update pokemon by adding to its rank number, add by one
//client is going to make a put request to the server,
//and the server is going to make a get request to the db
