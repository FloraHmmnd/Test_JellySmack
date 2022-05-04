import axios from "axios";
import router from './router'

export const fetchCharactersArray = async( page = 1, filters) => {
    let url = `${import.meta.env.VITE_API_URL}/character/?page=${page}`;
    if (filters?.status) {
        url += `&status=${filters.status}`;
    }
    if (filters?.name) {
        url += `&name=${filters.name}`;
    }      
    let response = await axios.get(url);
    let resultats = { 
        characters : response.data.results,               
        infos : response.data.info,
        totalPages : response.data.info.pages }
    router.push({
        name: "Home",
        query: { page, status: filters?.status, name: filters?.name },
    });                  
return resultats
}

export const fetchCharacter = async (id) => {
    let url = `${import.meta.env.VITE_API_URL}/character/${id}`
    let response = await axios.get(url)
    let characterSelected = response.data
return characterSelected
}

export default { fetchCharactersArray, fetchCharacter };

