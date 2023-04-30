require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT = 3000, DB_URI } = process.env;

mongoose
	.connect(DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to database'))
	.catch((error) => console.error('Failed to connect to database:', error));

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

app.use(cors());
app.use(express.json());
app.get('/', (_, res) => res.sendFile(path.join(__dirname, '../dist')));

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

app.get('/pokemon', async (req, res) => {
	try {
		const favoritePokemons = await Pokemon.find().sort({ stars: -1 });
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(favoritePokemons);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

app.post('/pokemon', async (req, res) => {
	const body = req.body; // console.log(body, 'howdyyyy');
	try {
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
	const updatedPokemon = req.body;
	console.log(updatedPokemon, 'this is updated');
	console.log(pokemonId, 'pokeonID');
	try {
		const pokemon = await Pokemon.findByIdAndUpdate(pokemonId, updatedPokemon);
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(pokemon);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
});

app.delete('/pokemon/:name', async (req, res) => {
	try {
		const { name } = req.params;
		const pokemon = await Pokemon.findOneAndDelete(name);
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

app.use(express.static('client'));

app.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log(`Server listening on :${PORT}`);
});

module.exports = Pokemon;
