import axios from "axios";
import { MARVEL_BASE_URL, MARVEL_PUBLIC_KEY, TS, HASH } from "@/app/lib/env";

const fetchComicById = async (comicId: string) => {
  try {
    const response = await axios.get(
      `${MARVEL_BASE_URL.trim()}/comics/${comicId}?apikey=${MARVEL_PUBLIC_KEY.trim()}&hash=${HASH.trim()}&ts=${TS.trim()}`
    );
    const comic = response.data.data.results[0];
    return { comic };
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
};

export default fetchComicById;
