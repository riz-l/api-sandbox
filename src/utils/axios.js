// Import: Dependencies
import axios from "axios";

// GET: pokemon/gengar
export const apiUrl = axios.create({
  baseURL: `https://pokeapi.co/api/v2/pokemon/gengar`,
});
