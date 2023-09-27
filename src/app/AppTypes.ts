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
  }
}