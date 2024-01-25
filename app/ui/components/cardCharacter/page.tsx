import React from "react";
import Image from "next/image";
import { ICharacter } from "@/app/interfaces";

export const CardCharacter = async () => {
  const res = await fetch(
    "https://gateway.marvel.com/v1/public/characters?apikey=89819eb019b102a4d034d7b6261de194&hash=c1694ba4805af43d3c2362001b73eac5&ts=1&limit=10"
  );
  const json = await res.json();
  const data = json.data;
  const characters = data.results;
  console.log({ characters });

  return (
    <div>
      {characters.map((character: ICharacter, index: number) => (
        <div key={index}>
          <p>ID: {character.id}</p>
          <p>Name: {character.name}</p>
          <Image
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            width={120}
            height={120}
          />
        </div>
      ))}
    </div>
  );
};
