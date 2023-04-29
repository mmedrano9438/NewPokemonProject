import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
// import StarRating from './StarRating';

const FavoritePokemons = () => {
	const [favoritePokemons, setFavoritePokemons] = useState([]);

	const getFavoritePokemonsDatabase = async () =>
		await axios
			.get('http://localhost:3000/pokemon')
			.then((response) => {
				setFavoritePokemons(response.data);
			})
			.catch((error) => {
				console.error('Failed to fetch favorite Pokemons:', error);
			});

	//anything in bracket in line 22 will update automatically
	useEffect(() => {
		getFavoritePokemonsDatabase();
	}, []);

	const removeFromFavorites = (pokemon) => {
		axios
			.get('http://localhost:3000/pokemon')
			.then((response) => {
				const favoritePokemons = response.data;
				if (
					favoritePokemons &&
					favoritePokemons.some((fav) => fav.name === pokemon.name)
				) {
					return axios.delete(`http://localhost:3000/pokemon/${pokemon.name}`);
				}
			})
			.then((response) => {
				console.log('Pokemon deleted:', response.data);
			})
			.catch((error) => {
				console.error('Failed to delete Pokemon from favorites:', error);
			});
	};

	const addStar = (pokemon) => {
		const updatedPokemon = {
			...pokemon,
			stars: pokemon.stars + 1,
		};
		console.log(updatedPokemon, 'UpdatedPokemon on client side');
		axios
			.put(`http://localhost:3000/pokemon/${pokemon._id}`, updatedPokemon)
			.then((response) => {
				console.log('Star added:', response.data);
				getFavoritePokemonsDatabase();
			})
			.catch((error) => {
				console.error('Failed to add star:', error);
			});
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
				</div>
			))}
		</div>
	);
};

export default FavoritePokemons;
