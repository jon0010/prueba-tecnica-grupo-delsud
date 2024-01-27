import axios from "axios";
import { MARVEL_BASE_URL, MARVEL_PUBLIC_KEY, TS, HASH } from "@/app/lib/env";
import { ICharacter } from "@/app/interfaces";
import { IComicResult } from "@/app/interfaces/Comic";

export interface ISearchResult<T> {
  id: number;
  name?: string;
  title?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const fetchCharacterOrComicByName = async (
  searchTerm: string,
  showingHeroes: boolean
): Promise<
  | {
      characters?: ISearchResult<ICharacter>[];
      comics?: ISearchResult<IComicResult>[];
    }
  | { error: string }
> => {
  try {
    let results;

    if (showingHeroes) {
      const charactersResponse = await axios.get(
        `${MARVEL_BASE_URL.trim()}/characters?apikey=${MARVEL_PUBLIC_KEY.trim()}&hash=${HASH.trim()}&ts=${TS.trim()}&limit=100`
      );

      const characters: ICharacter[] = charactersResponse.data.data.results;

      results = characters
        .filter((character: ICharacter) =>
          character.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((character: ICharacter) => ({
          id: character.id,
          name: character.name,
          thumbnail: character.thumbnail,
        }));
    } else {
      const comicsResponse = await axios.get(
        `${MARVEL_BASE_URL.trim()}/comics?apikey=${MARVEL_PUBLIC_KEY.trim()}&hash=${HASH.trim()}&ts=${TS.trim()}&limit=100`
      );

      const comics: IComicResult[] = comicsResponse.data.data.results;

      results = comics
        .filter((comic: IComicResult) =>
          comic.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((comic: IComicResult) => ({
          id: comic.id,
          title: comic.title,
          thumbnail: comic.thumbnail,
        }));
    }

    return { [showingHeroes ? "characters" : "comics"]: results };
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
};

export default fetchCharacterOrComicByName;
