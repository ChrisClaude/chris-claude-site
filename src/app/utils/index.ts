import { ArticleContent } from "@/AppTypes"

export const sortByDate = (a: ArticleContent, b: ArticleContent) => {
  return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
}
