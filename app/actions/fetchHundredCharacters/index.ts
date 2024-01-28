import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const fetchHundredCharacters = async () => {
  const marvelBaseUrl = process.env.NEXT_PUBLIC_MARVEL_BASE_URL;
  const marvelPublicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
  const hash = process.env.NEXT_PUBLIC_HASH;
  const ts = process.env.NEXT_PUBLIC_TS;
  try {
    const response = await axios.get(
      // @ts-ignore
      `${marvelBaseUrl.trim()}/characters?apikey=${marvelPublicKey.trim()}&hash=${hash.trim()}&ts=${ts.trim()}&limit=100`
    );
    const characters = response.data.data.results;
    return { characters };
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
};

export default fetchHundredCharacters;
