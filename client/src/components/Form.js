import React, { Component, useState, useEffect } from 'react';
// import axios from 'axios';

const MyForm = () => {
	const [user, setUser] = useState({
		Name: '',
		Location: '',
		Age: '',
	});
	const [isSubmitted, setIsSubmitted] = useState(false);

	const changeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUser((prevUser) => ({
			...prevUser,
			[name]: value,
		}));
	};

	const onCreateUser = () => {
		// console.log(user);
		setIsSubmitted(true);
	};

	// useEffect(() => {
	// 	// useEffect logic here
	// 	document.title = `User: ${user.Name} - ${user.Location} (${user.Age} years old)`;
	// }, [user.Name, user.Location, user.Age]);

	return (
		<div>
			<form>
				<p>
					<label>
						User Name :{' '}
						<input
							type='text'
							name='Name'
							value={user.Name}
							onChange={changeHandler}
						/>
					</label>
				</p>
				<p>
					<label>
						User Location :{' '}
						<input
							type='text'
							name='Location'
							value={user.Location}
							onChange={changeHandler}
						/>
					</label>
				</p>
				<p>
					<label>
						User Age :{' '}
						<input
							type='text'
							name='Age'
							value={user.Age}
							onChange={changeHandler}
						/>
					</label>
				</p>
				<button type='button' onClick={onCreateUser}>
					Create
				</button>
			</form>
			{isSubmitted && (
				<div>
					<h2>Submitted User Information:</h2>
					<p>Name: {user.Name}</p>
					<p>Location: {user.Location}</p>
					<p>Age: {user.Age}</p>
				</div>
			)}
		</div>
	);
};

export default MyForm;

// class MyForm extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			user: {
// 				Name: '',
// 				Location: '',
// 				Age: '',
// 			},
// 		};
// 	}

// 	changeHandler = (e) => {
// 		const name = e.target.name;
// 		const value = e.target.value;
// 		this.setState({
// 			user: {
// 				...this.state.user,
// 				[name]: value,
// 			},
// 		});
// 	};

// 	onCreateUser = () => {
// 		console.log(this.state.user);
// 	};

// 	onChangeValueHandler = (val) => {
// 		this.setState({ value: val.target.value });
// 	};

// 	render() {
// 		return (
// 			<div>
// 				<form>
// 					<p>
// 						<label>
// 							User Name :{' '}
// 							<input
// 								type='text'
// 								name='Name'
// 								value={this.state.user.Name}
// 								onChange={this.changeHandler}></input>
// 						</label>
// 					</p>
// 					<p>
// 						<label>
// 							User Location :{' '}
// 							<input
// 								type='text'
// 								name='Location'
// 								value={this.state.user.Location}
// 								onChange={this.changeHandler}></input>
// 						</label>
// 					</p>
// 					<p>
// 						<label>
// 							User Age :{' '}
// 							<input
// 								type='text'
// 								name='Age'
// 								value={this.state.user.Age}
// 								onChange={this.changeHandler}></input>
// 						</label>
// 					</p>
// 					<button onClick={this.onCreateUser}>Create</button>
// 				</form>
// 			</div>
// 		);
// 	}
// }
// export default MyForm;
