export interface IComicDetail {
  id: string;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
}

export interface ICharacterDetail {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
  comicsDetails?: IComicDetail[];
  modified: string;
  series: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
  stories: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
      type: string;
    }>;
    returned: number;
  };
}
