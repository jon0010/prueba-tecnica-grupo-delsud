import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const fetchTenCharacters = async () => {
  try {
    const response = await axios.get(
      `${process.env.MARVEL_BASE_URL}/v1/public/characters?apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${process.env.HASH}&ts=${process.env.TS}&limit=10`
    );

    const characters = response.data.data.results;

    return { characters };
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
};
