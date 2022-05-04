import axios from "axios";


export const fetchCharactersArray = async( page = 1) => {
    let url = `${import.meta.env.VITE_API_URL}/character/?page=${page}`;
    let response = await axios.get(url);
    let resultats = { characters : response.data.results,               
                    infos : response.data.info,
                    totalPages : response.data.info.pages }
return resultats
}

export const fetchCharacter = async (id) => {
    let url = `${import.meta.env.VITE_API_URL}/character/${id}`
    let response = await axios.get(url)
    let characterSelected = response.data
return characterSelected
}

export default { fetchCharactersArray, fetchCharacter };