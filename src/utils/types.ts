export type CardData = {
  grammar: string;
  meaning: string | string[];
  english: string | string[];
  structure: string | string[];
  level: string;
  notes: string[];
  sentences: string[];
  other: string[];
  link: string;
};

export type BookmarkState = {
  bookmarkList: {
    [key: string]: CardData[];
  };
};

export type BookmarkCollection = {
  [key:string] : CardData[]
}