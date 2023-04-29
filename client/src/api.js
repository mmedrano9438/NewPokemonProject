// import { fetchPokemons } from "./api";
import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export function fetchPokemons() {
    return axios
        .get(API_URL)
        .then((response) => {
            return response.data.results;
        })
        .catch((error) => {
            console.log(error);
        });
}