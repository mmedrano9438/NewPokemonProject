import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

const AvailablePokemons = ({ availablePokemons, fetchFavoritePokemons }) => {
	const handleAddToFavorites = (pokemon) => {
		const pokemonToAdd = {
			name: pokemon.name,
			base_experience: pokemon.base_experience,
			image: pokemon.sprites.front_default,
			type: pokemon.types[0].type.name,
		};
		axios
			.get('http://localhost:3000/pokemon', pokemonToAdd)
			.then((response) => {
				const favorites = response.data;
				if (favorites && favorites.some((fav) => fav.name === pokemon.name)) {
					console.log('Pokemon already exists in favorites:', pokemon.name);
					return;
				}
				return axios.post('http://localhost:3000/pokemon', pokemonToAdd);
			})
			.then(() => fetchFavoritePokemons())
			.catch((error) => {
				console.error('Failed to add Pokemon to favorites:', error);
			});
	};

	return (
		<div>
			<h2>Available Pokemons</h2>
			{availablePokemons.map((pokemon) => (
				<div key={pokemon.id}>
					<img src={pokemon.sprites.front_default} alt={pokemon.name} />
					<div>Name: {pokemon.name}</div>
					<div>Base experience: {pokemon.base_experience}</div>
					<div>Type: {pokemon.types[0].type.name}</div>
					<button onClick={() => handleAddToFavorites(pokemon)}>
						Add to Favorites
					</button>
				</div>
			))}
		</div>
	);
};

export default AvailablePokemons;
