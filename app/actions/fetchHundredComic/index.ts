import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const fetchHundredComics = async () => {
  const marvelBaseUrl = process.env.NEXT_PUBLIC_MARVEL_BASE_URL;
  const marvelPublicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
  const hash = process.env.NEXT_PUBLIC_HASH;
  const ts = process.env.NEXT_PUBLIC_TS;
  try {
    const response = await axios.get(
      // @ts-ignore
      `${marvelBaseUrl.trim()}/comics?apikey=${marvelPublicKey.trim()}&hash=${hash.trim()}&ts=${ts.trim()}&limit=100`
    );
    const comics = response.data.data.results;
    return { comics };
  } catch (error) {
    return { error: "Failed to fetch comics" };
  }
};

export default fetchHundredComics;
