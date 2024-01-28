import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const fetchComicById = async (comicId: number) => {
  const marvelBaseUrl = process.env.NEXT_PUBLIC_MARVEL_BASE_URL;
  const marvelPublicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
  const hash = process.env.NEXT_PUBLIC_HASH;
  const ts = process.env.NEXT_PUBLIC_TS;
  try {
    const response = await axios.get(
      // @ts-ignore
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
