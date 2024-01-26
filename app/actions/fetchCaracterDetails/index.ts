import axios from "axios";
import { MARVEL_BASE_URL, MARVEL_PUBLIC_KEY, TS, HASH } from "@/app/lib/env";
import { ICharacterDetail } from "../../interfaces/index";
import { IComicDetail } from "@/app/interfaces/CharacterDetail";

const fetchCharacterDetails = async (
  characterId: string
): Promise<ICharacterDetail> => {
  try {
    const characterResponse = await axios.get(
      `${MARVEL_BASE_URL}/characters/${characterId}?apikey=${MARVEL_PUBLIC_KEY}&hash=${HASH}&ts=${TS}`
    );

    const character = characterResponse.data.data.results[0];

    if (character) {
      const comicsResponse = await axios.get(
        `${MARVEL_BASE_URL}/characters/${characterId}/comics?apikey=${MARVEL_PUBLIC_KEY}&hash=${HASH}&ts=${TS}`
      );

      const comicsDetails = comicsResponse.data.data.results.map(
        (comic: IComicDetail) => ({
          id: comic.id,
          title: comic.title,
          description: comic.description,
          thumbnail: comic.thumbnail,
          resourceURI: comic.resourceURI,
        })
      );

      return { ...character, comicsDetails };
    } else {
      throw new Error("Character details not found");
    }
  } catch (error) {
    console.error("Error fetching character details:", error);
    throw error;
  }
};

export default fetchCharacterDetails;
