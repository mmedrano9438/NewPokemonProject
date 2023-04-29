// const axios = require('axios');
import axios from 'axios';
import React, { Component } from 'react';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritePokemons: []
        };
        this.getPokemons = this.getPokemons.bind(this)
    }

    componentDidMount() {
        this.getPokemons();
    }

    getPokemons() {
        axios.get('http://localhost:3000/pokemon')
            .then(res => {
                const favoritePokemons = res.data;
                console.log(favoritePokemons, 'favssssss')
                this.setState({ favoritePokemons });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <h1 className='heading__one'>React application!!!</h1>
                <ul>
                    {this.state.favoritePokemons.map(pokemon => {
                        console.log(pokemon, 'pokemon')
                      return(  <li key={pokemon._id}>{pokemon.stars}</li>
                    )})}
                </ul>
            </div>
        );
    }
}
// class App extends React.Component {
//     render() {
//         return (
//             <div>
//                 hello cookie buns
//             </div>
//         );
//     }
// }

export default App;
