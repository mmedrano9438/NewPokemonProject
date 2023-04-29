const axios = require('axios');

const getAllPokemons = () => {
	const options = {
		method: 'get',
		url: `https://pokeapi.co/api/v2/pokemon`,
	};

	return axios(options)
		.then(function (response) {
			return response.data;
		})
		.catch((error) => {
			console.log(error);
		});
};

const getPokemonByName = (query) => {
	const options = {
		method: 'get',
		url: `https://pokeapi.co/api/v2/pokemon/${query}`,
	};

	return axios(options)
		.then(function (response) {
			return response.data;
		})
		.catch((error) => {
			console.log(error);
		});
};

const getPokemonById = (id) => {
	const options = {
		method: 'get',
		url: `https://pokeapi.co/api/v2/pokemon/${id}`,
	};

	return axios(options)
		.then(function (response) {
			return response.data;
		})
		.catch((error) => {
			console.log(error);
		});
};

module.exports = {
	getPokemonByName,
	getAllPokemons,
	getPokemonById,
};
