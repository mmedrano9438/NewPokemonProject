import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

const FavoritePokemons = ({ fetchFavoritePokemons, favoritePokemons }) => {
	useEffect(() => {
		fetchFavoritePokemons();
	}, []);

	const removeFromFavorites = (pokemon) => {
		axios
			.get(`/pokemon`)
			.then((response) => {
				const favoritePokemons = response.data;
				if (
					favoritePokemons &&
					favoritePokemons.some((fav) => fav.name === pokemon.name)
				) {
					return axios.delete(`/pokemon/${pokemon.name}`);
				}
			})
			.then((response) => {
				console.log('Pokemon deleted:', response.data);
				fetchFavoritePokemons();
			})
			.catch((error) => {
				console.error('Failed to delete Pokemon from favorites:', error);
			});
	};

	//
	const updateStar = (pokemon, incrementOrDecrement) => {
		const updatedPokemon = {
			...pokemon,
			stars: pokemon.stars + incrementOrDecrement,
		};
		console.log(updatedPokemon, 'UpdatedPokemon on client side');
		axios
			.put(`/pokemon/${pokemon._id}`, updatedPokemon)
			.then((response) => {
				console.log('Star updated:', response.data);
				fetchFavoritePokemons();
			})
			.catch((error) => {
				console.error('Failed to update star:', error);
			});
	};

	const addStar = (pokemon) => {
		updateStar(pokemon, 1);
	};

	const deleteStar = (pokemon) => {
		updateStar(pokemon, -1);
	};

	return (
		<div>
			<h2>Favorite Pokemons</h2>
			{favoritePokemons.map((pokemon) => (
				<div key={pokemon._id}>
					<img src={pokemon.image} alt={pokemon.name} />
					<div>Name: {pokemon.name}</div>
					<div>Base experience: {pokemon.base_experience}</div>
					<div>Type: {pokemon.type}</div>
					<div>
						<span>&#9733;</span> {pokemon.stars}
					</div>
					<button onClick={() => removeFromFavorites(pokemon)}>
						Remove From Favorites
					</button>
					<button onClick={() => addStar(pokemon)}>Add Star</button>
					<button onClick={() => deleteStar(pokemon)}>Delete Star</button>
				</div>
			))}
		</div>
	);
};

export default FavoritePokemons;
