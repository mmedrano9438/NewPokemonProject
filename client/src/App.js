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
				console.log(response, 'response in client side');
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

// import React, { Component } from 'react';
// import axios from 'axios';
// import { fetchPokemons } from './api';
// import './styles.css';
// import Card from './components/Card';
// import AvailablePokemons from './components/AvailablePokemons';
// // import FavoritePokemonPage from './components/FavoritePokemonPage';

// class App extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			favoritePokemons: [],
// 			availablePokemons: [],
// 			redirectToFavoritePage: false,
// 		};
// 	}

// 	componentDidMount() {
// 		this.fetchAvailablePokemons();
// 	}

// 	fetchAvailablePokemons() {
// 		const limit = 50;
// 		const offset = 0;

// 		axios
// 			.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
// 			.then(async (res) => {
// 				const availablePokemons = res.data.results;
// 				const pokemonData = [];
// 				for (const pokemon of availablePokemons) {
// 					const response = await fetch(pokemon.url);
// 					const data = await response.json();
// 					pokemonData.push(data);
// 				}
// 				this.setState({ availablePokemons: pokemonData });
// 			})
// 			.catch((err) => {
// 				console.log(err, 'this is the error');
// 			});
// 	}

// 	handleAddPokemonToFavorites = (pokemon) => {
// 		this.setState((prevState) => ({
// 			favoritePokemons: [...prevState.favoritePokemons, pokemon],
// 			redirectToFavoritePage: true,
// 		}));
// 	};

// 	render() {
// 		const { favoritePokemons, availablePokemons, redirectToFavoritePage } =
// 			this.state;

// 		if (redirectToFavoritePage) {
// 			return <FavoritePokemonPage favoritePokemons={favoritePokemons} />;
// 		}

// 		return (
// 			<div>
// 				<h1 className='heading__one'>
// 					Continue Adding to Your Favorite List of Pokemons!!!
// 				</h1>
// 				<div className='container'>
// 					<AvailablePokemons
// 						availablePokemons={availablePokemons}
// 						onAddPokemonToFavorites={this.handleAddPokemonToFavorites}
// 					/>
// 				</div>
// 			</div>
// 		);
// 	}
// }

////original class component
// class App extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			favoritePokemons: [],
// 			availablePokemons: [],
// 		};
// 	}

// 	componentDidMount() {
// 		this.fetchFavoritePokemons();
// 		this.fetchAvailablePokemons();
// 	}

// 	fetchFavoritePokemons() {
// 		// get favorite Pokemon data from API or database ?
// 		// need to set the favoritePokemons state ?
// 		axios
// 			.get('http://localhost:3000/pokemon')
// 			.then((response) => {
// 				// handle success response
// 				const favoritePokemons = response.data;
// 				this.setState({ favoritePokemons });
// 			})
// 			.catch((error) => {
// 				// handle error response
// 				console.error('Failed to fetch favorite Pokemons:', error);
// 			});
// 	}

// 	fetchAvailablePokemons() {
// 		// get all available Pokemon data from API or database ?
// 		// set the availablePokemons state ?
// 		const limit = 50;
// 		const offset = 0;

// 		axios
// 			.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
// 			.then(async (res) => {
// 				const availablePokemons = res.data.results;
// 				const pokemonData = [];
// 				for (const pokemon of availablePokemons) {
// 					const response = await fetch(pokemon.url);
// 					const data = await response.json();
// 					pokemonData.push(data);
// 				}
// 				console.log(pokemonData, 'pokemonData');
// 				this.setState({ availablePokemons: pokemonData });
// 			})
// 			.catch((err) => {
// 				console.log(err, 'this is the error');
// 			});
// 	}
// 	//issue: when i invoke addPokemonToFavorites I'm also saving pokemon to....
// 	addPokemonToFavorites = (pokemon) => {
// 		const pokemon = pokemon;
// 		console.log(pokemon, 'this is pokemnnnnn');

// 		//TODO?!: control option l
// 		// add the selected Pokemon to the favoritePokemons state
// 		axios
// 			.post('http://localhost:3000/pokemon', pokemon)
// 			.then((response) => {
// 				console.log('🚀 ~ response:', response);
// 				console.log(response, 'RESPONSE');
// 				// let the user know pokemon has been successfully added
// 				console.log('Pokemon added to favorites:', response.data);
// 			})
// 			.catch((error) => {
// 				// show error response
// 				console.error('Failed to add Pokemon:', error);
// 			});
// 	};

// 	render() {
// 		const { favoritePokemons, availablePokemons } = this.state;

// 		return (
// 			<div>
// 				<h1 className='heading__one'>Favorite Pokemons!!!</h1>
// 				<div className='container'>
// 					{/* <FavoritePokemons favoritePokemons={favoritePokemons} /> */}
// 					<AvailablePokemons
// 						availablePokemons={availablePokemons}
// 						onAddPokemonToFavorites={this.addPokemonToFavorites}
// 					/>
// 				</div>
// 				<button>Find Pokemon</button>
// 			</div>
// 		);
// 	}
// }
//======================
////Functional component
// const App = () => {
// 	const [favoritePokemon, setFavoritePokemon] = useState([]);

// 	// Fetch favorite Pokémon on component mount
// 	useEffect(() => {
// 		fetchFavoritePokemon();
// 	}, []);

// 	// Fetch favorite Pokémon from the server
// 	const fetchFavoritePokemon = () => {
// 		axios
// 			.get('http://localhost:3000/pokemon')
// 			// .get('http://localhost:3000/pokemon?limit=50&offset=0')
// 			.then((response) => {
// 				console.log(response, 'hey im the response');
// 				const favoritePokemonData = response.data;
// 				setFavoritePokemon(favoritePokemonData);
// 			})
// 			.catch((error) => {
// 				console.error(error);
// 			});
// 	};

// 	// Add a Pokémon to favorites
// 	const addToFavorites = (newPokemonData) => {
// 		axios
// 			.post('/pokemon', newPokemonData)
// 			.then((response) => {
// 				// Refresh the list of favorite Pokémon
// 				fetchFavoritePokemon();
// 			})
// 			.catch((error) => {
// 				console.error(error);
// 			});
// 	};

// 	// Update the star rank of a Pokémon
// 	const updateStarRank = (pokemonId, updatedPokemonData) => {
// 		axios
// 			.put(`/pokemon/${pokemonId}/stars`, updatedPokemonData)
// 			.then((response) => {
// 				// Refresh the list of favorite Pokémon
// 				fetchFavoritePokemon();
// 			})
// 			.catch((error) => {
// 				console.error(error);
// 			});
// 	};

// 	// Remove a Pokémon from favorites
// 	const removeFromFavorites = (pokemonId) => {
// 		axios
// 			.delete(`/pokemon/${pokemonId}`)
// 			.then((response) => {
// 				// Refresh the list of favorite Pokémon
// 				fetchFavoritePokemon();
// 			})
// 			.catch((error) => {
// 				console.error(error);
// 			});
// 	};

// 	return (
// 		<div className='App'>
// 			<h1>Favorite Pokémon</h1>
// 			{favoritePokemon.map((pokemon) => (
// 				<div key={pokemon.id}>
// 					<h2>{pokemon.name}</h2>
// 					<img src={pokemon.image} alt={pokemon.name} />
// 					<p>Stars: {pokemon.stars}</p>
// 					{/* Render buttons or other components related to each Pokémon */}
// 				</div>
// 			))}
// 		</div>
// 	);
// };

//==================

//===========
//need to create a search container for the input field: find pokemon
// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             favoritePokemons: [],
//             allAvailablePokemon: []
//         };
//         // this.getPokemons = this.getPokemons.bind(this)
//         this.getNewPokemons = this.getNewPokemons.bind(this);
//     }

//     componentDidMount() {
//         // this.getPokemons();
//         this.getNewPokemons();
//     }

//     // getPokemons() {
//     //     //this might have to be the api call to the third party api
//     //     // 'http://localhost:3000/pokemon'
//     //     // axios.get('https://pokeapi.co/api/v2/pokemon')
//     //     axios.get('http://localhost:3000/pokemon')
//     //         .then(res => {
//     //             console.log(res, 'res$$$$$')
//     //             const favoritePokemons = res.data;
//     //             // const favoritePokemons = res.data.results;
//     //             console.log(favoritePokemons, 'favssssss')
//     //             this.setState({ favoritePokemons });
//     //         })
//     //         .catch(err => {
//     //             console.log(err, 'this is the error');
//     //         });
//     // }
//     //get on console array of urls or pokemons
//     getNewPokemons() {
//         axios.get('https://pokeapi.co/api/v2/pokemon')
//             .then(async res => {
//                 const allAvailablePokemon = res.data.results;
//                 const pokemonData = [];
//                 for (const pokemon of allAvailablePokemon) {
//                     const response = await fetch(pokemon.url);
//                     const data = await response.json();
//                     pokemonData.push(data);
//                 }
//                 this.setState({ allAvailablePokemon: pokemonData });
//             })
//             .catch(err => {
//                 console.log(err, 'this is the error');
//             });
//     }

//     handleAddPokemon = (pokemon) => {
//         this.setState((prevState) => ({
//             favoritePokemons: [...prevState.favoritePokemons, pokemon],
//         }));
//     };

//     render() {
//         return (
//             <div>
//                 <h1 className="heading__one">Add Pokemons To Your Favorites List!!!</h1>
//                 <div className="container">
//                     {/* {console.log(this.state.allAvailablePokemon, 'theseare the pokiesss')} */}
//                     {/* {this.state.favoritePokemons.map((pokemon) => (
//                         <Card key={pokemon._id} pokemon={pokemon} />
//                     ))} */}
//                     {this.state.allAvailablePokemon.map((pokemon, index) => (
//                         <Card key={index} pokemon={pokemon} onAddPokemon={this.handleAddPokemon} />
//                     ))}
//                 </div>
//                 <button> Find Pokemon </button>
//             </div>
//         );
//     }
// }
//=======
// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             favoritePokemons: [],
//             allAvailablePokemon: [],
//         };
//         this.getNewPokemons = this.getNewPokemons.bind(this);
//     }

//     componentDidMount() {
//         this.getNewPokemons();
//     }

//     getNewPokemons() {
//         axios
//             .get('https://pokeapi.co/api/v2/pokemon')
//             .then(async (res) => {
//                 const favoritePokemons = res.data.results;
//                 const pokemonData = [];
//                 for (const pokemon of favoritePokemons) {
//                     const response = await fetch(pokemon.url);
//                     const data = await response.json();
//                     pokemonData.push(data);
//                 }
//                 this.setState({ favoritePokemons: pokemonData });
//             })
//             .catch((err) => {
//                 console.log(err, 'this is the error');
//             });
//     }

//     handleAddPokemon = (selectedPokemon) => {
//         this.setState((prevState) => ({
//             favoritePokemons: [...prevState.favoritePokemons, selectedPokemon],
//         }));
//     };

//     render() {
//         return (
//             <div>
//                 <h1 className="heading__one">Favorite Pokemons!!!</h1>
//                 <div className="container">
//                     {this.state.favoritePokemons.map((pokemon) => (
//                         <Card
//                             key={pokemon._id}
//                             pokemon={pokemon}
//                             handleAddPokemon={this.handleAddPokemon}
//                         />
//                     ))}
//                 </div>
//                 <button> Find Pokemon </button>
//             </div>
//         );
//     }
// }

//=============
// getNewPokemons() {
//     //this might have to be the api call to the third party api
//     // 'http://localhost:3000/pokemon'
//    axios.get('https://pokeapi.co/api/v2/pokemon')
//     // axios.get('http://localhost:3000/pokemon')
//         .then(res => {
//             // console.log(res, 'res$$$$$')
//             // const favoritePokemons = res.data;
//             const allAvailablePokemon = res.data.results;
//             // console.log(allAvailablePokemon, 'favssssss')
//             // this.setState({ allAvailablePokemon });
//             // return allAvailablePokemon
//             allAvailablePokemon.map( async (pokemon) => {
//                 console.log(pokemon.url, 'pomkkjkkj')
//                 await fetch(pokemon.url)
//                    .then(res => res.json())
//                      .then((allAvailablePokemon) => {
//                          console.log(allAvailablePokemon, 'this is the new response')
//                          this.setState({ allAvailablePokemon });
//                         //  console.log(this.setState({ allAvailablePokemon }), 'hello babebe')
//                   })
//             })
//         })
//         .catch(err => {
//             console.log(err, 'this is the error');
//         });
//     // console.log(pokemonData, 'poko')
// }
//================
//need to figure out how to mak an api to the url, will need two apis,
//one for the pokemon and then one for the pokemons data

// deletePokemon() {
//     axios
//         .delete(`http://localhost:3000/pokemon/${id}`)
//         .then((res) => {
//             console.log(res, 'helllllooooo')
//             this.getPokemons();
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }

// render() {
//     return (
//         <div>
//             <h1 className='heading__one'>Favorite Pokemons!!!</h1>
//             <ul>
//                 {/* {console.log(this.state.favoritePokemons,"!!!!!!!!")} */}
//                 {this.state.favoritePokemons.map(pokemon => {
//                     console.log(pokemon, 'pokemon')
//                   return(  <li key={pokemon._id}>{pokemon.name}</li>
//                 )})}
//             </ul>
//             <div className="container">
//                 <Card />
//             </div>
//             <button>Click Me </button>
//         </div>
//     );
// }
export default App;
