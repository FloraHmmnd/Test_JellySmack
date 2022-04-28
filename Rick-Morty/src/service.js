import axios from "axios";


export const fetchCharactersArray = async( page = 1) => {
    let url = `${import.meta.env.VITE_API_URL}/character/?page=${page}`;
    let response = await axios.get(url);
    let resultats = { characters : response.data.results}
    console.log(resultats)
return resultats
}


export default { fetchCharactersArray };