export interface IComic {
  id: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  creators: {
    available: number;
    collectionURI: string;
    items: {
      name: string;
      resourceURI: string;
      role: string;
    }[];
    returned: number;
  };
  dates: {
    date: string;
    type: string;
  }[];
  prices: {
    type: string;
    price: number;
  }[];
  textObjects: {
    type: string;
    language: string;
    text: string;
  }[];
}

export interface IComicResult {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
