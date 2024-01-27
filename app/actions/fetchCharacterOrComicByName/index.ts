import axios from "axios";
import { MARVEL_BASE_URL, MARVEL_PUBLIC_KEY, TS, HASH } from "@/app/lib/env";

export interface IMarvelCharacter {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface ISearchResult {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const fetchCharacterOrComicByName = async (
  searchTerm: string
): Promise<{ characters: ISearchResult[] } | { error: string }> => {
  try {
    const response = await axios.get(
      `${MARVEL_BASE_URL.trim()}/characters?apikey=${MARVEL_PUBLIC_KEY.trim()}&hash=${HASH.trim()}&ts=${TS.trim()}&limit=100`
    );

    const characters: IMarvelCharacter[] = response.data.data.results;

    const filteredCharacters: ISearchResult[] = characters
      .filter((character: IMarvelCharacter) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((character: IMarvelCharacter) => ({
        id: character.id,
        name: character.name,
        thumbnail: character.thumbnail,
      }));

    return { characters: filteredCharacters };
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
};

export default fetchCharacterOrComicByName;
