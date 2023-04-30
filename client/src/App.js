import axios from 'axios';
import './styles.css';
import Card from './components/Card';
import AvailablePokemons from './components/AvailablePokemons';
import FavoritePokemons from './components/FavoritePokemons';
import React, { Component, useState, useEffect } from 'react';
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favoritePokemons: [],
			availablePokemons: [],
		};
		this.fetchFavoritePokemons = this.fetchFavoritePokemons.bind(this);
		this.fetchAvailablePokemons = this.fetchAvailablePokemons.bind(this);
	}

	componentDidMount() {
		this.fetchFavoritePokemons();
		this.fetchAvailablePokemons();
	}

	fetchFavoritePokemons() {
		axios
			// .get('/pokemon')
			.get('http://localhost:3000/pokemon')
			.then((response) => {
				this.setState({ favoritePokemons: response.data });
			})
			.catch((error) => {
				console.error('Failed to fetch favorite Pokemons:', error);
			});
	}

	fetchAvailablePokemons() {
		const limit = 20;
		const offset = 0;

		axios
			.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
			.then(async (res) => {
				const availablePokemons = res.data.results;
				const pokemonData = [];
				for (const pokemon of availablePokemons) {
					const response = await fetch(pokemon.url);
					const data = await response.json();
					pokemonData.push(data);
				}
				this.setState({ availablePokemons: pokemonData });
			})
			.catch((err) => {
				console.log(err, 'this is the error');
			});
	}

	render() {
		const { favoritePokemons, availablePokemons } = this.state;

		return (
			<div>
				<h1 className='heading__one'>
					Continue Adding to Your Favorite List of Pokemons!!!
				</h1>
				<div className='container'>
					<FavoritePokemons
						favoritePokemons={favoritePokemons}
						fetchFavoritePokemons={this.fetchFavoritePokemons}
					/>
					<AvailablePokemons
						availablePokemons={availablePokemons}
						fetchFavoritePokemons={this.fetchFavoritePokemons}
					/>
				</div>
			</div>
		);
	}
}

export default App;
