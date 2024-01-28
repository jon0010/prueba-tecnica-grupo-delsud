import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const fetchHundredComics = async () => {
  const marvelBaseUrl = process.env.MARVEL_BASE_URL;
  const marvelPublicKey = process.env.MARVEL_PUBLIC_KEY;
  const hash = process.env.HASH;
  const ts = process.env.TS;
  try {
    const response = await axios.get(
      `${marvelBaseUrl.trim()}/comics?apikey=${marvelPublicKey.trim()}&hash=${hash.trim()}&ts=${ts.trim()}&limit=100`
    );
    const comics = response.data.data.results;
    return { comics };
  } catch (error) {
    return { error: "Failed to fetch comics" };
  }
};

export default fetchHundredComics;
