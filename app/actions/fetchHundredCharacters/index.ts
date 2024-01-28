import axios from "axios";
import { MARVEL_BASE_URL, MARVEL_PUBLIC_KEY, TS, HASH } from "@/env";

const fetchHundredCharacters = async () => {
  try {
    const response = await axios.get(
      `${MARVEL_BASE_URL.trim()}/characters?apikey=${MARVEL_PUBLIC_KEY.trim()}&hash=${HASH.trim()}&ts=${TS.trim()}&limit=100`
    );
    const characters = response.data.data.results;
    return { characters };
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
};

export default fetchHundredCharacters;
