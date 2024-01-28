import axios from "axios";
import { MARVEL_BASE_URL, MARVEL_PUBLIC_KEY, TS, HASH } from "@/env";

const fetchComicById = async (comicId: number) => {
  try {
    const response = await axios.get(
      `${MARVEL_BASE_URL.trim()}/comics/${comicId}?apikey=${MARVEL_PUBLIC_KEY.trim()}&hash=${HASH.trim()}&ts=${TS.trim()}`
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
