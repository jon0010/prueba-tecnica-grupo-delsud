import axios from "axios";
import { ICharacter, ISearchResult } from "@/app/interfaces/index";
import { IComicResult } from "@/app/interfaces/Comic";
import * as dotenv from "dotenv";
dotenv.config();

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
    const marvelBaseUrl = process.env.NEXT_PUBLIC_MARVEL_BASE_URL;
    const marvelPublicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
    const hash = process.env.NEXT_PUBLIC_HASH;
    const ts = process.env.NEXT_PUBLIC_TS;
    let results;

    if (showingHeroes) {
      const charactersResponse = await axios.get(
        // @ts-ignore
        `${marvelBaseUrl.trim()}/characters?apikey=${marvelPublicKey.trim()}&hash=${hash.trim()}&ts=${ts.trim()}&limit=100`
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
        // @ts-ignore
        `${marvelBaseUrl.trim()}/comics?apikey=${marvelPublicKey.trim()}&hash=${hash.trim()}&ts=${ts.trim()}&limit=100`
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
