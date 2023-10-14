import { Dispatch, SetStateAction } from "react";

export type Article = {
  id: string,
  src: string,
  alt: string,
  description: string
}

export type UIContextType = {
  setUIState: Dispatch<SetStateAction<{
      isMobileNavOpen: boolean;
  }>> | undefined;
  uiState: {isMobileNavOpen: boolean;}
};

export type ArticleContent = {
  slug: string;
  frontmatter: {
    [key: string]: any;
  },
  content: string | undefined
}

export type PaginatedArticles = {
  articles: ArticleContent[];
  numPages: number;
  currentPage: number;
  categories: any[];
};

export type ListBucketObject = {
  Key: string,
  LastModified: Date,
  ETag: string,
  Size: number,
  StorageClass: string
}
