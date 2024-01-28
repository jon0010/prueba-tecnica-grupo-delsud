import axios from "axios";
import { MARVEL_BASE_URL, MARVEL_PUBLIC_KEY, TS, HASH } from "../../../env";

const fetchHundredComics = async () => {
  try {
    const response = await axios.get(
      `${MARVEL_BASE_URL.trim()}/comics?apikey=${MARVEL_PUBLIC_KEY.trim()}&hash=${HASH.trim()}&ts=${TS.trim()}&limit=100`
    );
    const comics = response.data.data.results;
    return { comics };
  } catch (error) {
    return { error: "Failed to fetch comics" };
  }
};

export default fetchHundredComics;
