import axios from "axios";


export const fetchCharactersArray = ( page = 1) => {
    let url = `${import.meta.env.VITE_API_URL}/character/?page=${page}`;
        return axios.get(url);
}


export const fetchEpisodesArray = () => {
    let url = `${import.meta.env.VITE_API_URL}/episod`;
        return axios.get(url);
}


export default { fetchCharactersArray, fetchEpisodesArray };