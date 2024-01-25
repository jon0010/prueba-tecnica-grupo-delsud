import axios from "axios";

export const fetchTenCharacters = async () => {
  try {
    const response = await axios.get(
      "https://gateway.marvel.com/v1/public/characters?apikey=89819eb019b102a4d034d7b6261de194&hash=c1694ba4805af43d3c2362001b73eac5&ts=1&limit=10"
    );

    const characters = response.data.data.results;

    return { characters };
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
};
