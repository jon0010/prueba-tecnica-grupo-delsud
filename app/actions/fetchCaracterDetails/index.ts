import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();
import { ICharacterDetail } from "../../interfaces/index";
import { IComicDetail } from "@/app/interfaces/CharacterDetail";

const fetchCharacterDetails = async (
  characterId: string
): Promise<ICharacterDetail> => {
  const marvelBaseUrl = process.env.MARVEL_BASE_URL;
  const marvelPublicKey = process.env.MARVEL_PUBLIC_KEY;
  const hash = process.env.HASH;
  const ts = process.env.TS;
  try {
    const characterResponse = await axios.get(
      `${marvelBaseUrl}/characters/${characterId}?apikey=${marvelPublicKey}&hash=${hash}&ts=${ts}`
    );

    const character = characterResponse.data.data.results[0];

    if (character) {
      const comicsResponse = await axios.get(
        `${marvelBaseUrl}/characters/${characterId}/comics?apikey=${marvelPublicKey}&hash=${hash}&ts=${ts}`
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
