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

export type bookmarkState = {
  bookmarkList: {
    [key: string]: CardData[];
  };
};
