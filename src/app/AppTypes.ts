import { Dispatch, SetStateAction } from "react";

export type Article = {
  id: string,
  src: string,
  alt: string,
  description: string
}

export type AppState = {
  isMobileNavOpen: boolean;
  isResumePage: boolean;
};

export type UIContextType = {
  setUIState: Dispatch<SetStateAction<AppState>> | undefined;
  uiState: AppState
};

export type ArticleContent = {
  slug: string;
  frontmatter: {
    [key: string]: string;
  },
  content: string | undefined
}

export type PaginatedArticles = {
  articles: ArticleContent[];
  numPages: number;
  currentPage: number;
  categories: string[];
};

export type ListBucketObject = {
  Key: string,
  LastModified: Date,
  ETag: string,
  Size: number,
  StorageClass: string
}
