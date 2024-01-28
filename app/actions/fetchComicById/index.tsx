import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const fetchComicById = async (comicId: number) => {
  const marvelBaseUrl = process.env.MARVEL_BASE_URL;
  const marvelPublicKey = process.env.MARVEL_PUBLIC_KEY;
  const hash = process.env.HASH;
  const ts = process.env.TS;
  try {
    const response = await axios.get(
      `${marvelBaseUrl.trim()}/comics/${comicId}?apikey=${marvelPublicKey.trim()}&hash=${hash.trim()}&ts=${ts.trim()}`
    );
    const comic = response.data.data.results[0];

    if (comic) {
      return { comic };
    } else {
      return { error: "Comic not found" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { error: "Failed to fetch data" };
  }
};

export default fetchComicById;
