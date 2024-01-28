export interface ICharacter {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface IHero {
  id: number;
  name?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
