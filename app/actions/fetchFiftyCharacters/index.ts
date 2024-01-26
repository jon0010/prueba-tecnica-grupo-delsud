import axios from "axios";
import { MARVEL_BASE_URL, MARVEL_PUBLIC_KEY, TS, HASH } from "@/app/lib/env";

const fetchFiftyCharacters = async () => {
  try {
    const response = await axios.get(
      `${MARVEL_BASE_URL.trim()}/characters?apikey=${MARVEL_PUBLIC_KEY.trim()}&hash=${HASH.trim()}&ts=${TS.trim()}&limit=50`
    );
    const characters = response.data.data.results;
    return { characters };
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
};

export default fetchFiftyCharacters;
