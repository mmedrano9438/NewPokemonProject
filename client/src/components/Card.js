// import React from 'react';
import React, { useState } from 'react';

// const Card = ({pokemon}) => {
//     console.log(pokemon, 'hello AGAINNNNNNNNN')
//     return(
//     <div className="card">
//         <ul>
//             <img src={pokemon.image}/>
//             <li>{pokemon.name}</li>
//             <li>{pokemon.type}</li>
//         </ul>
//     </div>
// )};

const Card = ({ pokemon, onStarClick, onAddPokemon }) => {
	// console.log(pokemon, 'hello AGAINNNNNNNNN');
	// console.log('🚀 ~ onStarClick:', onStarClick);

	const [stars, setStars] = useState(0);

	const handleStarClick = () => {
		// setStars(stars + 1);
		// setStars((prevState) => {prevState++});
	};
	const handleAddToFavorite = () => {
		onAddPokemon(pokemon);
	};
	return (
		<div className='card'>
			<ul>
				<img src={pokemon.sprites.front_default} alt={pokemon.name} />
				<li>{pokemon.name}</li>
				<li>Base experience: {pokemon.base_experience}</li>
				<li>Type: {pokemon.types[0].type.name}</li>
				<li>Stars: {stars}</li>
			</ul>
			<button onClick={handleStarClick}>Add Star</button>
			<button onClick={handleAddToFavorite}>Add to Favorites</button>
		</div>
	);
};

export default Card;
