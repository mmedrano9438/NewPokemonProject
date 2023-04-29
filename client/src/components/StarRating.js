import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StarRating = ({ pokemonId }) => {
	console.log(pokemonId, 'pokemonId as parameter');

	return (
		<div className='star-rating'>
			{[...Array(5)].map((star, index) => {
				index += 1;
				return (
					<button
						type='button'
						key={index}
						className={index <= rating ? 'on' : 'off'}
						onClick={() => handleRatingClick(index)}
						// onMouseEnter={() => setHover(index)}
						// onMouseLeave={() => setHover(0)}
					>
						<span className='star'>{index <= rating ? '★' : '☆'}</span>
					</button>
				);
			})}
		</div>
	);
};

export default StarRating;

// import axios from 'axios';
// import React, { useState } from 'react';

// const StarRating = () => {
// 	const [rating, setRating] = useState(0);
// 	const [hover, setHover] = useState(0);

// 	return (
// 		<div className='star-rating'>
// 			{[...Array(5)].map((star, index) => {
// 				index += 1;
// 				return (
// 					<button
// 						type='button'
// 						key={index}
// 						className={index <= rating ? 'on' : 'off'}
// 						onClick={() => setRating(index)}>
// 						<span className='star'>&#9733;</span>
// 					</button>
// 				);
// 			})}
// 		</div>
// 	);
// };
// export default StarRating;
